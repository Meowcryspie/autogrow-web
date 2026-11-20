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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', color: '#64748B' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '36px', height: '36px', border: '3px solid #E2E8F0', borderTopColor: '#16A34A', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px auto' }} />
          <p style={{ fontSize: '13.5px', fontWeight: 600 }}>Loading administration console...</p>
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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '24px' }}>
        <div style={{ maxWidth: '440px', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '36px', textAlign: 'center', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.04)' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <ShieldAlert size={26} color="#DC2626" />
          </div>
          <h2 style={{ fontSize: '19px', fontWeight: 800, margin: '0 0 8px 0', color: '#0F172A' }}>Access Restricted</h2>
          <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 20px 0', lineHeight: 1.5 }}>
            You are signed in as <strong>{user.email}</strong>, which does not have Commercial Operations Administrator privileges.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={signOut}
              style={{
                width: '100%',
                padding: '11px',
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
                padding: '11px',
                backgroundColor: '#FFFFFF',
                border: '1px solid #CBD5E1',
                borderRadius: '8px',
                color: '#475569',
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '24px' }}>
      <div style={{ maxWidth: '440px', width: '100%', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px', textAlign: 'center', color: '#0F172A', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06), 0 8px 10px -6px rgba(0,0,0,0.04)' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '12px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px auto', border: '1px solid #DCFCE7' }}>
          <Lock size={24} color="#16A34A" />
        </div>
        <div style={{ display: 'inline-block', backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '3px 10px', borderRadius: '999px', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
          Protected Management Area
        </div>
        <h2 style={{ fontSize: '21px', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.02em', color: '#0F172A' }}>
          Autogrow Operations Portal
        </h2>
        <p style={{ fontSize: '13.5px', color: '#64748B', margin: '0 0 24px 0', lineHeight: 1.5 }}>
          Sign in with authorized administrator credentials to manage website products, customer quote orders, and grower feedback.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#16A34A',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '13.5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            <LogIn size={15} />
            Sign In with Administrator Credentials
          </button>

          <button
            onClick={onExitToSite}
            style={{
              width: '100%',
              padding: '11px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              color: '#475569',
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
