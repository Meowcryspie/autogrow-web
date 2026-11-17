import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Globe, 
  ShieldCheck, 
  ArrowUpRight,
  Cpu,
  Layers,
  Smartphone,
  BookOpen,
  MapPin
} from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onNavigateToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Utility Announcement Bar (TrolMaster Style) */}
      <div
        style={{
          background: '#040705',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          padding: '6px 0',
          transition: 'all 0.2s ease',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="beacon-pulse" />
              <strong style={{ color: 'var(--color-green)' }}>Global Support:</strong> +1 (800) 852-3088 · 24/7 CEA Emergency Response
            </span>
            <span style={{ display: 'none', color: 'var(--text-muted)' }}>|</span>
            <span style={{ color: 'var(--text-muted)' }} className="hide-mobile">
              Auckland, NZ · California, USA · Melbourne, AU
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}>
              <Globe size={13} color="var(--color-green)" />
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Global / EN</span>
            </div>
            <a
              href="https://meowcryspie.github.io/farmgrow/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--color-green)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>IntelliGrow™ Web Portal</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Tactical Navbar */}
      <div
        style={{
          background: isScrolled ? 'rgba(7, 11, 9, 0.88)' : 'rgba(7, 11, 9, 0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border-subtle)',
          boxShadow: isScrolled ? '0 10px 30px rgba(0, 0, 0, 0.8)' : 'none',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '74px',
          }}
        >
          {/* Brand Logo (TrolMaster Style Typography) */}
          <div
            onClick={() => handleNavClick('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(0, 229, 117, 0.2), rgba(0, 229, 117, 0.05))',
                border: '1px solid var(--border-glow)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 16px var(--color-green-glow)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                <path d="M16 3 L27 9 L27 23 L16 29 L5 23 L5 9 Z" stroke="#00E575" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M16 8 C16 8 22 13 22 18 C22 21.5 19.3 24 16 24 C12.7 24 10 21.5 10 18 C10 13 16 8 16 8 Z" fill="#00E575" />
                <line x1="16" y1="13" x2="16" y2="24" stroke="#070B09" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  className="font-tech"
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  AUTOGROW
                </span>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-green)', display: 'inline-block' }} />
              </div>
              <span
                style={{
                  fontSize: '9.5px',
                  letterSpacing: '1.8px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                Intelligent CEA Automation
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="hide-mobile"
          >
            {/* Controllers Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveDropdown('controllers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('products')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: activeDropdown === 'controllers' ? 'var(--color-green)' : 'var(--text-primary)',
                  fontSize: '14.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                <span>Controllers</span>
                <ChevronDown size={14} />
              </button>

              {activeDropdown === 'controllers' && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '320px',
                    background: '#0B120E',
                    border: '1px solid var(--border-glow)',
                    borderRadius: '16px',
                    padding: '12px',
                    boxShadow: '0 20px 45px rgba(0,0,0,0.8), 0 0 20px rgba(0, 229, 117, 0.15)',
                    backdropFilter: 'blur(24px)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                  }}
                >
                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 117, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '14px', color: '#FFF' }}>MultiGrow Pro (MGC-1)</strong>
                      <span className="badge-tactical" style={{ fontSize: '10px' }}>Glasshouse</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Multi-compartment commercial greenhouse brain</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 117, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '14px', color: '#FFF' }}>IntelliClimate (ICC-2)</strong>
                      <span className="badge-tactical" style={{ fontSize: '10px' }}>Indoor CEA</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Dynamic VPD, CO2 & multi-stage climate controller</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 117, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '14px', color: '#FFF' }}>IntelliDose (IDC-4)</strong>
                      <span className="badge-tactical" style={{ fontSize: '10px' }}>8-Part Doser</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Automated nutrient dosing and pH regulation</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '10px 12px', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.15s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 117, 0.1)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '14px', color: '#FFF' }}>EC Mini Link (ECM-1)</strong>
                      <span className="badge-tactical" style={{ fontSize: '10px' }}>Compact</span>
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Set-and-forget EC doser with cloud telemetry</span>
                  </div>
                </div>
              )}
            </div>

            {/* Ecosystem */}
            <button
              onClick={() => handleNavClick('ecosystem')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              Ecosystem
            </button>

            {/* Phone Scaling & App Studio */}
            <button
              onClick={() => handleNavClick('phone-app')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.15s ease',
              }}
            >
              <span>IntelliGrow™ App</span>
              <span className="badge-tactical" style={{ fontSize: '10px', padding: '2px 6px' }}>Interactive</span>
            </button>

            {/* Solutions */}
            <button
              onClick={() => handleNavClick('solutions')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              Commercial CEA
            </button>

            {/* Downloads */}
            <button
              onClick={() => handleNavClick('downloads')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14.5px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.15s ease',
              }}
            >
              Support & Docs
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Search Trigger */}
            <button
              onClick={onSearchClick}
              aria-label="Search equipment"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              <Search size={17} />
            </button>

            {/* Launch Web Portal CTA */}
            <a
              href="https://meowcryspie.github.io/farmgrow/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ height: '42px', padding: '0 18px', fontSize: '13.5px' }}
            >
              <ShieldCheck size={16} />
              <span>Launch Live App</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="show-mobile"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '110px 0 0 0',
            background: 'rgba(5, 9, 7, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
            gap: '16px',
            overflowY: 'auto',
          }}
        >
          <button
            onClick={() => handleNavClick('products')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Cpu size={18} color="var(--color-green)" />
              All Controllers & Dosing
            </span>
            <ChevronDown size={16} />
          </button>

          <button
            onClick={() => handleNavClick('ecosystem')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <Layers size={18} color="var(--color-green)" />
            Autogrow Ecosystem Architecture
          </button>

          <button
            onClick={() => handleNavClick('phone-app')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-glow)',
              color: 'var(--color-green)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={18} />
              IntelliGrow™ Mobile App Simulator
            </span>
            <span className="badge-tactical">Interactive</span>
          </button>

          <button
            onClick={() => handleNavClick('solutions')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <MapPin size={18} color="var(--color-green)" />
            Commercial CEA Solutions
          </button>

          <button
            onClick={() => handleNavClick('downloads')}
            style={{
              padding: '14px 16px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            <BookOpen size={18} color="var(--color-green)" />
            Support, Manuals & Firmware
          </button>

          <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <a
              href="https://meowcryspie.github.io/farmgrow/"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              style={{ width: '100%', height: '52px' }}
            >
              Launch Live Demonstration App
            </a>
          </div>
        </div>
      )}

      {/* Responsive media query styles */}
      <style>{`
        @media (max-width: 992px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 993px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
};
