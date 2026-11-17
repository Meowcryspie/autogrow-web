import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowUpRight,
  Cpu,
  Smartphone,
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
      {/* Top Utility Announcement Bar (TrolMaster Industrial Style) */}
      <div
        style={{
          background: '#040705',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          padding: '6px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="beacon-pulse" />
              <strong style={{ color: 'var(--color-green)' }}>Global Hotline:</strong> +1 (800) 852-3088 · Auckland Global HQ +64 (9) 415-2380
            </span>
            <span style={{ color: 'var(--border-subtle)' }} className="hide-mobile">|</span>
            <span style={{ color: 'var(--text-muted)' }} className="hide-mobile">
              New Zealand Engineering · Deployed Across 45+ Countries
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div 
              onClick={() => handleNavClick('distributors')}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <MapPin size={12} color="var(--color-green)" />
              <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Where to Buy</span>
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
              <span>IntelliGrow™ Cloud</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Tactical Navbar */}
      <div
        style={{
          background: isScrolled ? 'rgba(7, 11, 8, 0.94)' : 'rgba(7, 11, 8, 0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-subtle)',
          transition: 'all 0.14s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '70px',
          }}
        >
          {/* Brand Logo (TrolMaster Industrial Monogram) */}
          <div
            onClick={() => handleNavClick('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '3px',
                background: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-medium)',
                borderTop: '1px solid var(--border-chamfer)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <path d="M16 3 L27 9 L27 23 L16 29 L5 23 L5 9 Z" stroke="#00E575" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M16 8 C16 8 22 13 22 18 C22 21.5 19.3 24 16 24 C12.7 24 10 21.5 10 18 C10 13 16 8 16 8 Z" fill="#00E575" />
                <line x1="16" y1="13" x2="16" y2="24" stroke="#070B09" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: '22px',
                    fontWeight: 800,
                    letterSpacing: '0.04em',
                    color: '#FFFFFF',
                    lineHeight: 1,
                  }}
                >
                  AUTOGROW<span style={{ color: 'var(--color-green)' }}>.</span>
                </span>
                <span className="decal-badge" style={{ fontSize: '9px', padding: '1px 5px' }}>CEA-PRO</span>
              </div>
              <span
                style={{
                  fontSize: '9px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '1px',
                }}
              >
                NZ Industrial Controllers
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
            }}
            className="hide-mobile"
          >
            {/* 1. Controllers Dropdown */}
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
                  fontSize: '13.5px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px 0',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                }}
              >
                <span>Controllers</span>
                <ChevronDown size={13} />
              </button>

              {activeDropdown === 'controllers' && (
                <div
                  className="panel-chassis"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '340px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#FFF', fontFamily: 'var(--font-mono)' }}>MultiGrow Master [MGC-Pro]</strong>
                      <span className="decal-badge" style={{ color: 'var(--color-green)' }}>32 ZONES</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Multi-area commercial greenhouse & boiler brain</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#FFF', fontFamily: 'var(--font-mono)' }}>SatuGrow FertiX Skid [SGF-100]</strong>
                      <span className="decal-badge" style={{ color: 'var(--color-cyan)' }}>100m³/hr</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Multi-zone inline precision fertigation on skid</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#FFF', fontFamily: 'var(--font-mono)' }}>SatuGrow Pro [SGP-1]</strong>
                      <span className="decal-badge">ALL-IN-ONE</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Climate + batch tank fertigation for single bay</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#FFF', fontFamily: 'var(--font-mono)' }}>IntelliDose Pro [IDC-4]</strong>
                      <span className="decal-badge">8-CHANNEL</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>8-part automated nutrient & pH precision doser</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '2px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: '#FFF', fontFamily: 'var(--font-mono)' }}>IntelliClimate [ICC-2]</strong>
                      <span className="decal-badge">VPD CEA</span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Dynamic canopy VPD, HVAC & CO2 controller</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Crop Steering */}
            <button
              onClick={() => handleNavClick('crops')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Crops
            </button>

            {/* 3. Architecture Ecosystem */}
            <button
              onClick={() => handleNavClick('ecosystem')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Ecosystem
            </button>

            {/* 4. Phone Scaling Studio */}
            <button
              onClick={() => handleNavClick('phone-scaling')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Smartphone size={14} style={{ color: 'var(--color-cyan)' }} />
              <span>Mobile Studio</span>
            </button>

            {/* 5. ROI Calculator */}
            <button
              onClick={() => handleNavClick('roi-calculator')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              ROI Calculator
            </button>

            {/* 6. Support & CAD */}
            <button
              onClick={() => handleNavClick('support')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '13.5px',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Support & CAD
            </button>
          </nav>

          {/* Right Action Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Quick Search Button */}
            <button
              onClick={onSearchClick}
              title="Search hardware & specs"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.14s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Search size={16} />
            </button>

            {/* Get Engineering Spec CTA */}
            <button
              onClick={() => handleNavClick('products')}
              className="btn-machine-primary hide-mobile"
              style={{ padding: '8px 18px', fontSize: '11px' }}
            >
              <Cpu size={14} />
              Commercial Systems
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '3px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-subtle)',
                color: '#FFFFFF',
                cursor: 'pointer',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="show-mobile"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'var(--bg-void)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          <button
            onClick={() => handleNavClick('products')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            01 // CONTROLLERS & SKIDS
          </button>
          <button
            onClick={() => handleNavClick('crops')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            02 // CROPS & AGRONOMY
          </button>
          <button
            onClick={() => handleNavClick('ecosystem')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            03 // ARCHITECTURE ECOSYSTEM
          </button>
          <button
            onClick={() => handleNavClick('phone-scaling')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            04 // INTELLIGROW™ MOBILE STUDIO
          </button>
          <button
            onClick={() => handleNavClick('roi-calculator')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            05 // ROI CALCULATOR
          </button>
          <button
            onClick={() => handleNavClick('distributors')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            06 // WHERE TO BUY (DISTRIBUTORS)
          </button>
          <button
            onClick={() => handleNavClick('support')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: '#FFF', fontSize: '15px', fontFamily: 'var(--font-mono)' }}
          >
            07 // TECHNICAL DOWNLOADS & CAD
          </button>
        </div>
      )}
    </header>
  );
};