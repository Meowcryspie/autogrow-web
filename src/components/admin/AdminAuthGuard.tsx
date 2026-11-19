import React, { useState } from 'react';
import { ShieldAlert, Lock, ArrowLeft, LogIn } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

interface AdminAuthGuardProps {
  children: React.ReactNode;
  onExitToSite: () => void;
}

export const AdminAuthGuard: React.FC<AdminAuthGuardProps> = ({ children, onExitToSite }) => {
  const { user, isAdmin, isLoading, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0F17', color: '#94A3B8' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #1E293B', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px auto' }} />
          <p style={{ fontSize: '14px', fontWeight: 600 }}>Verifying Cryptographic Privileges...</p>
        </div>
      </div>
    );
  }

  // If logged in as admin, grant access!
  if (user && isAdmin) {
    return <>{children}</>;
  }

  // If logged in as regular customer (not admin)
  if (user && !isAdmin) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0F17', padding: '24px' }}>
        <div style={{ maxWidth: '460px', width: '100%', backgroundColor: '#111827', border: '1px solid #1F2937', borderRadius: '16px', padding: '36px', textAlign: 'center', color: '#F3F4F6' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#7F1D1D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto' }}>
            <ShieldAlert size={28} color="#F87171" />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px 0' }}>Access Restricted</h2>
          <p style={{ fontSize: '14px', color: '#9CA3AF', margin: '0 0 16px 0', lineHeight: 1.5 }}>
            You are signed in as <strong>{user.email}</strong>, which does not have Commercial Operations Administrator privileges.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={signOut}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#DC2626',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Sign Out & Switch Account
            </button>
            <button
              onClick={onExitToSite}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'transparent',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#D1D5DB',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Return to Public Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Not logged in at all
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0F17', padding: '24px' }}>
      <div style={{ maxWidth: '440px', width: '100%', backgroundColor: '#0F172A', border: '1px solid #1E293B', borderRadius: '16px', padding: '36px', textAlign: 'center', color: '#F8FAFC', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '12px', backgroundColor: '#1E293B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', border: '1px solid #334155' }}>
          <Lock size={26} color="#76b82a" />
        </div>
        <div style={{ display: 'inline-block', backgroundColor: '#064E3B', color: '#34D399', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Protected Management Area
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
          Autogrow Operations Portal
        </h2>
        <p style={{ fontSize: '13.5px', color: '#94A3B8', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Sign in with authorized administrator credentials to manage website products, customer quote orders, and grower feedback.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              width: '100%',
              padding: '13px',
              backgroundColor: '#76b82a',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <LogIn size={16} />
            Sign In with Administrator Credentials
          </button>

          <button
            onClick={onExitToSite}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'transparent',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#94A3B8',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <ArrowLeft size={14} />
            Back to Public Website
          </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode="signin"
      />
    </div>
  );
};
