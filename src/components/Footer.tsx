import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  return (
    <footer 
      style={{
        background: '#040705',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '80px 0 30px',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="container">
        
        {/* Main Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Column 1: Brand & Origin */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #00FF88 0%, #00B359 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#060a08',
                  fontWeight: 900,
                  fontSize: '18px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                A
              </div>
              <span 
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '22px',
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                }}
              >
                AUTOGROW<span style={{ color: 'var(--color-green)' }}>.</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '20px' }}>
              Pioneering commercial greenhouse and vertical farming automation for over 30 years. Engineered in New Zealand, deployed across 45+ countries.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={14} style={{ color: 'var(--color-green)' }} />
                <span>Rosedale, Auckland, New Zealand</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={14} style={{ color: 'var(--color-green)' }} />
                <span>Global Support: +1 (800) 852-3088</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={14} style={{ color: 'var(--color-green)' }} />
                <span>support@autogrow.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Flagship Hardware */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '18px', letterSpacing: '0.05em' }}>
              Controllers & Dosing
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  MultiGrow Pro [MGC-Pro]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  IntelliClimate [ICC-2]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  IntelliDose [IDC-4]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  EC Mini Doser [ECM-1]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  EnviroSensor 4-in-1 [ESS-4]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left', transition: 'color 0.2s ease' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  Substrate SMS Pro [SMS-Pro]
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Commercial Solutions */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '18px', letterSpacing: '0.05em' }}>
              Solutions & Software
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <li>
                <button 
                  onClick={() => onNavigateToSection('solutions')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Commercial Glasshouses
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('solutions')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Indoor Vertical CEA
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('solutions')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Precision Fertigation Centers
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('phone-scaling')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  IntelliGrow™ Mobile App
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('support')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Firmware & CAD Schematics
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Certifications */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '18px', letterSpacing: '0.05em' }}>
              CEA Engineering Dispatch
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
              Subscribe for firmware releases, sensor calibration guides, and commercial crop steering whitepapers.
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input 
                type="email" 
                placeholder="engineer@farm.com"
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '4px',
                  color: '#fff',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
              />
              <button
                className="btn-glow"
                style={{
                  padding: '8px 14px',
                  background: 'var(--color-green)',
                  color: '#060a08',
                  fontWeight: 700,
                  fontSize: '12px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Join
              </button>
            </div>

            {/* Certifications Badge Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {['CE MARKED', 'FCC CLASS A', 'RoHS', 'IP65 RATED', 'ISO 9001'].map((cert, idx) => (
                <span 
                  key={idx}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '3px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Autogrow Systems Ltd. All Rights Reserved. Engineered with precision in New Zealand. Reference inspired by TrolMaster® UI architecture.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Hardware Warranty</span>
            <span>Distributor Portal</span>
            <span>Security Bug Bounty</span>
          </div>
        </div>

      </div>
    </footer>
  );
};