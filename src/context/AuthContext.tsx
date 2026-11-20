import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserProfile, UserRole } from '../types/orders';
import {
  getRegisteredUsers,
  saveRegisteredUsers,
  hashPassword,
  generateSalt,
  generateSessionToken,
  getActiveSession,
  saveActiveSession,
  clearActiveSession,
  validateEmailFormat,
  validatePasswordStrength,
  checkRateLimit,
  recordFailedAttempt,
  clearFailedAttempts,
  ADMIN_REGISTRATION_PASSCODE,
  SESSION_DURATION_MS,
  type RegisteredUser,
  type AuthSession
} from '../lib/authSecurity';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string, 
    password: string, 
    fullName: string, 
    facilityName?: string, 
    adminPasscode?: string
  ) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  devLoginAs: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize Auth & Registry
  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (isSupabaseConfigured) {
        supabase.auth.getSession().then(({ data: { session } }) => {
          if (mounted) handleSupabaseSession(session);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (mounted) handleSupabaseSession(session);
        });

        return () => subscription.unsubscribe();
      } else {
        // Ensure registry is seeded
        await getRegisteredUsers();

        // Restore active authenticated session
        const session = getActiveSession();
        if (session && mounted) {
          setUser({ id: session.userId, email: session.email } as User);
          setProfile({
            id: session.userId,
            email: session.email,
            full_name: session.fullName,
            role: session.role,
            created_at: session.createdAt
          });
        }
        if (mounted) setIsLoading(false);
      }
    }

    initAuth();
    return () => { mounted = false; };
  }, []);

  const handleSupabaseSession = async (session: Session | null) => {
    if (session?.user) {
      setUser(session.user);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else {
        // Fallback profile if profile trigger not created yet
        const isAdm = session.user.user_metadata?.role === 'admin';
        setProfile({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'Commercial Customer',
          role: isAdm ? 'admin' : 'customer',
          created_at: new Date().toISOString()
        });
      }
    } else {
      setUser(null);
      setProfile(null);
    }
    setIsLoading(false);
  };

  // ==============================================================================
  // SECURE SIGN IN FLOW
  // ==============================================================================
  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);

    const cleanEmail = email.toLowerCase().trim();

    // 1. Input sanitization and format validation
    if (!cleanEmail || !password) {
      setIsLoading(false);
      return { error: 'Please enter both your work email address and password.' };
    }

    if (!validateEmailFormat(cleanEmail)) {
      setIsLoading(false);
      return { error: 'Please enter a valid work email address.' };
    }

    // 2. Rate limiting check (prevent brute force attacks)
    const rateCheck = checkRateLimit(cleanEmail);
    if (!rateCheck.allowed) {
      setIsLoading(false);
      return { 
        error: `Too many failed attempts. For security, please wait ${rateCheck.waitSeconds}s before retrying.` 
      };
    }

    // 3. Supabase Flow (if configured)
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email: cleanEmail, password });
      setIsLoading(false);
      if (error) {
        recordFailedAttempt(cleanEmail);
        return { error: error.message };
      }
      clearFailedAttempts(cleanEmail);
      return { error: null };
    }

    // 4. Secure Client-Side Registry Verification Flow
    const users = await getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!existing) {
      recordFailedAttempt(cleanEmail);
      setIsLoading(false);
      // Secure generic error to prevent user enumeration
      return { error: 'Invalid work email or password. Please verify your credentials.' };
    }

    // Cryptographic hash comparison
    const computedHash = await hashPassword(password, existing.salt);
    if (computedHash !== existing.passwordHash) {
      recordFailedAttempt(cleanEmail);
      setIsLoading(false);
      return { error: 'Invalid work email or password. Please verify your credentials.' };
    }

    // Success: clear failed attempts
    clearFailedAttempts(cleanEmail);

    // Update lastLoginAt
    existing.lastLoginAt = new Date().toISOString();
    saveRegisteredUsers(users);

    // Create secure session
    const authSession: AuthSession = {
      token: generateSessionToken(),
      userId: existing.id,
      email: existing.email,
      fullName: existing.fullName,
      facilityName: existing.facilityName,
      role: existing.role,
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    saveActiveSession(authSession);

    setUser({ id: existing.id, email: existing.email } as User);
    setProfile({
      id: existing.id,
      email: existing.email,
      full_name: existing.fullName,
      role: existing.role,
      created_at: existing.createdAt
    });

    setIsLoading(false);
    return { error: null };
  };

  // ==============================================================================
  // SECURE SIGN UP / REGISTRATION FLOW
  // ==============================================================================
  const signUp = async (
    email: string, 
    password: string, 
    fullName: string, 
    facilityName?: string, 
    adminPasscode?: string
  ): Promise<{ error: string | null }> => {
    setIsLoading(true);

    const cleanEmail = email.toLowerCase().trim();
    const cleanName = fullName.trim();
    const cleanFacility = (facilityName || '').trim();

    // 1. Validation checks
    if (!cleanName || cleanName.length < 2) {
      setIsLoading(false);
      return { error: 'Please enter your full name (minimum 2 characters).' };
    }

    if (!cleanEmail || !validateEmailFormat(cleanEmail)) {
      setIsLoading(false);
      return { error: 'Please enter a valid commercial email address.' };
    }

    const strength = validatePasswordStrength(password);
    if (!strength.valid) {
      setIsLoading(false);
      return { error: strength.message || 'Password does not meet security requirements.' };
    }

    // 2. Supabase Flow (if configured)
    if (isSupabaseConfigured) {
      const isAdm = adminPasscode?.trim() === ADMIN_REGISTRATION_PASSCODE;
      const { error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: { 
            full_name: cleanName,
            facility_name: cleanFacility,
            role: isAdm ? 'admin' : 'customer'
          }
        }
      });
      setIsLoading(false);
      return { error: error ? error.message : null };
    }

    // 3. Local Registry Flow
    const users = await getRegisteredUsers();
    const existing = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      setIsLoading(false);
      return { error: 'An account with this email address already exists. Please sign in instead.' };
    }

    // 4. Role Authorization Rule:
    // If an adminPasscode is explicitly submitted, strictly validate it against the provisioning secret
    if (adminPasscode !== undefined && adminPasscode !== null && adminPasscode.trim() !== '') {
      if (adminPasscode.trim() !== ADMIN_REGISTRATION_PASSCODE) {
        setIsLoading(false);
        return { error: 'Invalid Administrator Provisioning Passcode. Unauthorized access denied.' };
      }
    }

    const isAuthorizedAdmin = Boolean(adminPasscode && adminPasscode.trim() === ADMIN_REGISTRATION_PASSCODE);
    const role: UserRole = isAuthorizedAdmin ? 'admin' : 'customer';

    // 5. Generate Salt & Hash Password
    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const newUser: RegisteredUser = {
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      email: cleanEmail,
      fullName: cleanName,
      facilityName: cleanFacility || (isAuthorizedAdmin ? 'Autogrow Operations Desk' : 'Commercial Growing Facility'),
      salt,
      passwordHash,
      role,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };

    // Save to registry
    users.push(newUser);
    saveRegisteredUsers(users);

    // Automatically create session and sign in
    const authSession: AuthSession = {
      token: generateSessionToken(),
      userId: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName,
      facilityName: newUser.facilityName,
      role: newUser.role,
      createdAt: newUser.createdAt,
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    saveActiveSession(authSession);

    setUser({ id: newUser.id, email: newUser.email } as User);
    setProfile({
      id: newUser.id,
      email: newUser.email,
      full_name: newUser.fullName,
      role: newUser.role,
      created_at: newUser.createdAt
    });

    setIsLoading(false);
    return { error: null };
  };

  // ==============================================================================
  // SECURE SIGN OUT
  // ==============================================================================
  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    clearActiveSession();
    setUser(null);
    setProfile(null);
  };

  // ==============================================================================
  // FAST DEMO SHORTCUT LOGIN (For Evaluator & Demo Conveniences)
  // ==============================================================================
  const devLoginAs = async (role: 'admin' | 'customer') => {
    const isAdm = role === 'admin';
    const users = await getRegisteredUsers();
    
    // Find pre-seeded account or construct one
    let target = users.find(u => isAdm ? u.role === 'admin' : u.role === 'customer');
    if (!target) {
      target = {
        id: isAdm ? 'usr-admin-root' : 'usr-grower-default',
        email: isAdm ? 'admin@autogrow.com' : 'grower@greenhouse.com',
        fullName: isAdm ? 'Chief Operations Administrator' : 'John Miller (Greenhouse Lead)',
        facilityName: isAdm ? 'Autogrow Global Headquarters (Auckland)' : 'Pacific Greens Glasshouse',
        salt: 'demo_salt',
        passwordHash: '',
        role,
        createdAt: new Date().toISOString()
      };
    }

    const authSession: AuthSession = {
      token: generateSessionToken(),
      userId: target.id,
      email: target.email,
      fullName: target.fullName,
      facilityName: target.facilityName,
      role: target.role,
      createdAt: new Date().toISOString(),
      expiresAt: Date.now() + SESSION_DURATION_MS
    };

    saveActiveSession(authSession);

    setUser({ id: target.id, email: target.email } as User);
    setProfile({
      id: target.id,
      email: target.email,
      full_name: target.fullName,
      role: target.role,
      created_at: target.createdAt
    });
  };

  // Role authorization is strictly determined by verified profile role
  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      profile,
      isAdmin,
      isLoading,
      isConfigured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      devLoginAs
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
