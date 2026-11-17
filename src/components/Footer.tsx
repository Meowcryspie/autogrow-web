import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  return (
    <footer 
      style={{
        background: '#040705',
        borderTop: '1px solid var(--border-subtle)',
        padding: '80px 0 32px',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="container">
        
        {/* Main Columns Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '56px',
          }}
        >
          {/* Column 1: Brand & Pedigree */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div 
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '3px',
                  background: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)',
                  fontWeight: 900,
                  fontSize: '16px',
                  fontFamily: 'var(--font-display)',
                }}
              >
                A
              </div>
              <span 
                className="font-display"
                style={{
                  fontWeight: 800,
                  fontSize: '22px',
                  letterSpacing: '0.04em',
                  color: '#FFFFFF',
                }}
              >
                AUTOGROW<span style={{ color: 'var(--color-green)' }}>.</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', lineHeight: 1.65, color: 'var(--text-secondary)', marginBottom: '18px' }}>
              Pioneering commercial greenhouse and vertical farming automation for over 30 years. Engineered with precision in New Zealand, deployed across 45+ countries.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11.5px', fontFamily: 'var(--font-mono)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={13} style={{ color: 'var(--color-green)' }} />
                <span>Rosedale, Auckland, New Zealand</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={13} style={{ color: 'var(--color-green)' }} />
                <span>Global Support: +1 (800) 852-3088</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={13} style={{ color: 'var(--color-green)' }} />
                <span>support@autogrow.com</span>
              </div>
            </div>
          </div>

          {/* Column 2: Flagship Hardware */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '16px', letterSpacing: '0.06em' }}>
              Controllers & Skids
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  MultiGrow Master [MGC-Pro]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  SatuGrow FertiX Skid [100m³/h]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  SatuGrow Pro All-in-One
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  IntelliDose 8-Channel [IDC-4]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  IntelliClimate CEA [ICC-2]
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('products')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  EnviroSensor Pro Canopy Pod
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Agronomy & Systems */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '16px', letterSpacing: '0.06em' }}>
              Crop Solutions & Tools
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px', fontFamily: 'var(--font-mono)' }}>
              <li>
                <button 
                  onClick={() => onNavigateToSection('crops')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  High-Wire Vine Crops
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('crops')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Tabletop Berries & Soft Fruit
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('crops')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Leafy Greens NFT Channels
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('roi-calculator')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Fertilizer & Water ROI Calculator
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigateToSection('distributors')}
                  style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                >
                  Where to Buy (Distributor Map)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Engineering Whitepaper Newsletter */}
          <div>
            <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#FFFFFF', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', marginBottom: '16px', letterSpacing: '0.06em' }}>
              CEA Engineering Dispatch
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '14px' }}>
              Subscribe for firmware releases, sensor calibration guides, and commercial crop steering whitepapers.
            </p>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
              <input 
                type="email" 
                placeholder="engineer@farm.com"
                style={{
                  flex: 1,
                  padding: '8px 10px',
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '2px',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  outline: 'none',
                }}
              />
              <button
                className="btn-machine-primary"
                style={{ padding: '8px 14px', fontSize: '11px' }}
              >
                Join
              </button>
            </div>

            {/* Certifications Badge Bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
              {['CE COMPLIANT', 'FCC CLASS A', 'RoHS', 'IP66 DIE-CAST', 'ISO 9001'].map((cert, idx) => (
                <span 
                  key={idx}
                  className="decal-badge"
                  style={{ fontSize: '9px', padding: '2px 6px' }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Hairline Bar */}
        <div 
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            fontSize: '11.5px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} Autogrow Systems Ltd. All Rights Reserved. Engineered in New Zealand. Reference inspired by TrolMaster® UI architecture.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Privacy Policy</span>
            <span>Hardware Warranty Terms</span>
            <span>Distributor Portal</span>
            <span>Security Bug Bounty</span>
          </div>
        </div>

      </div>
    </footer>
  );
};