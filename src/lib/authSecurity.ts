// ==============================================================================
// AUTOGROW COMMERCIAL AGTECH - AUTHENTICATION SECURITY ENGINE
// Cryptographic hashing, credential validation, and local registry security
// ==============================================================================

import type { UserProfile, UserRole } from '../types/orders';

export interface RegisteredUser {
  id: string;
  email: string;
  fullName: string;
  facilityName: string;
  passwordHash: string;
  salt: string;
  role: UserRole;
  createdAt: string;
  lastLoginAt?: string;
}

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  fullName: string;
  facilityName: string;
  role: UserRole;
  createdAt: string;
  expiresAt: number; // Unix timestamp ms
}

const REGISTRY_STORAGE_KEY = 'autogrow_user_registry_v1';
const SESSION_STORAGE_KEY = 'autogrow_auth_session_v1';
const ATTEMPTS_STORAGE_KEY = 'autogrow_failed_login_attempts';

// Official Administrator Provisioning Passcode for New Admin Registrations
export const ADMIN_REGISTRATION_PASSCODE = 'AUTOGROW-NZ-ADMIN-2026';

// Session duration: 7 days
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;

// Maximum failed consecutive attempts before 30-second cooldown
const MAX_FAILED_ATTEMPTS = 5;
const COOLDOWN_MS = 30 * 1000;

// ==============================================================================
// 1. CRYPTOGRAPHIC UTILITIES (Web Crypto SHA-256)
// ==============================================================================

export async function hashPassword(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${salt}:${password}:autogrow_commercial_salt_2026`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateSessionToken(): string {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'tok-' + Date.now() + '-' + Math.random().toString(36).substring(2, 12);
}

// ==============================================================================
// 2. PRE-SEEDED DEMO ACCOUNTS
// ==============================================================================

const SEED_ADMIN: RegisteredUser = {
  id: 'usr-admin-root',
  email: 'admin@autogrow.com',
  fullName: 'Chief Operations Administrator',
  facilityName: 'Autogrow Global Headquarters (Auckland)',
  salt: 'seed_admin_salt_849201',
  // Pre-hashed for 'AdminPassword2026!'
  passwordHash: '', // computed on first run
  role: 'admin',
  createdAt: new Date().toISOString()
};

const SEED_GROWER: RegisteredUser = {
  id: 'usr-grower-default',
  email: 'grower@greenhouse.com',
  fullName: 'John Miller',
  facilityName: 'Pacific Greens Glasshouse (Pukekohe)',
  salt: 'seed_grower_salt_193820',
  // Pre-hashed for 'GrowerPassword2026!'
  passwordHash: '', // computed on first run
  role: 'customer',
  createdAt: new Date().toISOString()
};

// ==============================================================================
// 3. REGISTRY STORAGE & LIFECYCLE
// ==============================================================================

export async function getRegisteredUsers(): Promise<RegisteredUser[]> {
  try {
    const raw = localStorage.getItem(REGISTRY_STORAGE_KEY);
    if (!raw) {
      // Initialize registry with seed accounts
      const adminHash = await hashPassword('AdminPassword2026!', SEED_ADMIN.salt);
      const growerHash = await hashPassword('GrowerPassword2026!', SEED_GROWER.salt);
      
      const initial: RegisteredUser[] = [
        { ...SEED_ADMIN, passwordHash: adminHash },
        { ...SEED_GROWER, passwordHash: growerHash }
      ];
      localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Error reading user registry from localStorage:', err);
    return [];
  }
}

export function saveRegisteredUsers(users: RegisteredUser[]): void {
  try {
    localStorage.setItem(REGISTRY_STORAGE_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Error saving user registry to localStorage:', err);
  }
}

// ==============================================================================
// 4. RATE LIMITING & SECURITY SAFEGUARDS
// ==============================================================================

interface AttemptRecord {
  count: number;
  lastAttemptAt: number;
}

export function checkRateLimit(email: string): { allowed: boolean; waitSeconds?: number } {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return { allowed: true };
    const records: Record<string, AttemptRecord> = JSON.parse(raw);
    const rec = records[email.toLowerCase().trim()];
    if (!rec) return { allowed: true };

    if (rec.count >= MAX_FAILED_ATTEMPTS) {
      const elapsed = Date.now() - rec.lastAttemptAt;
      if (elapsed < COOLDOWN_MS) {
        const remaining = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
        return { allowed: false, waitSeconds: remaining };
      } else {
        // Cooldown passed, reset
        delete records[email.toLowerCase().trim()];
        sessionStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(records));
      }
    }
    return { allowed: true };
  } catch {
    return { allowed: true };
  }
}

export function recordFailedAttempt(email: string): void {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_STORAGE_KEY) || '{}';
    const records: Record<string, AttemptRecord> = JSON.parse(raw);
    const key = email.toLowerCase().trim();
    const existing = records[key] || { count: 0, lastAttemptAt: 0 };
    records[key] = {
      count: existing.count + 1,
      lastAttemptAt: Date.now()
    };
    sessionStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

export function clearFailedAttempts(email: string): void {
  try {
    const raw = sessionStorage.getItem(ATTEMPTS_STORAGE_KEY);
    if (!raw) return;
    const records: Record<string, AttemptRecord> = JSON.parse(raw);
    delete records[email.toLowerCase().trim()];
    sessionStorage.setItem(ATTEMPTS_STORAGE_KEY, JSON.stringify(records));
  } catch {
    // ignore
  }
}

// ==============================================================================
// 5. SESSION MANAGEMENT
// ==============================================================================

export function getActiveSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    const session: AuthSession = JSON.parse(raw);
    if (Date.now() > session.expiresAt) {
      clearActiveSession();
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export function saveActiveSession(session: AuthSession): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    // Also update legacy demo key for backward-compatibility with existing components
    const legacyProfile: UserProfile = {
      id: session.userId,
      email: session.email,
      full_name: session.fullName,
      role: session.role,
      created_at: session.createdAt
    };
    localStorage.setItem('autogrow_demo_user', JSON.stringify(legacyProfile));
  } catch (err) {
    console.error('Error saving active session:', err);
  }
}

export function clearActiveSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem('autogrow_demo_user');
  } catch (err) {
    console.error('Error clearing active session:', err);
  }
}

// ==============================================================================
// 6. VALIDATION HELPERS
// ==============================================================================

export function validateEmailFormat(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

export function validatePasswordStrength(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters long.' };
  }
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!hasLetter || !hasNumberOrSymbol) {
    return { valid: false, message: 'Password must include both letters and at least one number or symbol.' };
  }
  return { valid: true };
}
