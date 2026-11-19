import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { UserProfile, UserRole } from '../types/orders';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  // Fast test switcher for demo/development
  devLoginAs: (role: 'admin' | 'customer') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_SESSION_KEY = 'autogrow_demo_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check auth session
  useEffect(() => {
    if (isSupabaseConfigured) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        handleSession(session);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        handleSession(session);
      });

      return () => subscription.unsubscribe();
    } else {
      // Restore local mock user if saved
      const saved = localStorage.getItem(LOCAL_SESSION_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setUser({ id: parsed.id, email: parsed.email } as User);
          setProfile(parsed);
        } catch {
          // ignore
        }
      }
      setIsLoading(false);
    }
  }, []);

  const handleSession = async (session: Session | null) => {
    if (session?.user) {
      setUser(session.user);
      
      // Fetch role from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (data && !error) {
        setProfile(data as UserProfile);
      } else {
        // Fallback profile if profile trigger not created yet
        const isAdmin = session.user.email?.includes('admin') || false;
        setProfile({
          id: session.user.id,
          email: session.user.email || '',
          full_name: session.user.user_metadata?.full_name || 'Commercial Customer',
          role: isAdmin ? 'admin' : 'customer',
          created_at: new Date().toISOString()
        });
      }
    } else {
      setUser(null);
      setProfile(null);
    }
    setIsLoading(false);
  };

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    setIsLoading(true);

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setIsLoading(false);
      return { error: error ? error.message : null };
    }

    // Local Demo Login Mode
    const isMockAdmin = email.toLowerCase().includes('admin');
    const mockProfile: UserProfile = {
      id: 'demo-' + (isMockAdmin ? 'admin-1' : 'user-1'),
      email,
      full_name: isMockAdmin ? 'Autogrow Systems Administrator' : 'Commercial Grower',
      role: (isMockAdmin ? 'admin' : 'customer') as UserRole,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(mockProfile));
    setUser({ id: mockProfile.id, email: mockProfile.email } as User);
    setProfile(mockProfile);
    setIsLoading(false);
    return { error: null };
  };

  const signUp = async (email: string, password: string, fullName: string): Promise<{ error: string | null }> => {
    setIsLoading(true);

    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName }
        }
      });
      setIsLoading(false);
      return { error: error ? error.message : null };
    }

    // Local Demo Sign Up
    const isMockAdmin = email.toLowerCase().includes('admin');
    const mockProfile: UserProfile = {
      id: 'demo-' + Date.now(),
      email,
      full_name: fullName || 'Commercial Grower',
      role: (isMockAdmin ? 'admin' : 'customer') as UserRole,
      created_at: new Date().toISOString()
    };

    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(mockProfile));
    setUser({ id: mockProfile.id, email: mockProfile.email } as User);
    setProfile(mockProfile);
    setIsLoading(false);
    return { error: null };
  };

  const signOut = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(LOCAL_SESSION_KEY);
    setUser(null);
    setProfile(null);
  };

  const devLoginAs = (role: 'admin' | 'customer') => {
    const isAdm = role === 'admin';
    const mockProfile: UserProfile = {
      id: isAdm ? 'demo-admin-root' : 'demo-grower-1',
      email: isAdm ? 'admin@autogrow.com' : 'grower@commercialgreenhouse.com',
      full_name: isAdm ? 'Chief Operations Admin' : 'John Miller (Greenhouse Lead)',
      role,
      created_at: new Date().toISOString()
    };
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(mockProfile));
    setUser({ id: mockProfile.id, email: mockProfile.email } as User);
    setProfile(mockProfile);
  };

  const isAdmin = profile?.role === 'admin' || Boolean(user?.email?.toLowerCase().includes('admin'));

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
