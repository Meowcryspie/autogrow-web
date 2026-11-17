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
      {/* Top Agricultural Hotline Bar */}
      <div
        style={{
          background: 'var(--bg-surface-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
          fontSize: '11.5px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          padding: '6px 0',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="beacon-pulse" />
              <strong style={{ color: 'var(--color-green-dark)' }}>Commercial Grower Hotline:</strong> +1 (800) 852-3088 · Global HQ Auckland +64 (9) 415-2380
            </span>
            <span style={{ color: 'var(--border-subtle)' }} className="hide-mobile">|</span>
            <span style={{ color: 'var(--text-muted)' }} className="hide-mobile">
              New Zealand Agricultural Engineering · 45+ Countries
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <div 
              onClick={() => handleNavClick('distributors')}
              style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', color: 'var(--text-secondary)' }}
            >
              <MapPin size={12} color="var(--color-green-dark)" />
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Find a Dealer</span>
            </div>
            <a
              href="https://meowcryspie.github.io/farmgrow/"
              target="_blank"
              rel="noreferrer"
              style={{
                color: 'var(--color-green-dark)',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <span>IntelliGrow™ Cloud Portal</span>
              <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Main Daylight Navbar */}
      <div
        style={{
          background: isScrolled ? 'rgba(255, 255, 255, 0.96)' : '#FFFFFF',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border-subtle)',
          boxShadow: isScrolled ? '0 2px 10px rgba(17, 25, 19, 0.05)' : 'none',
          transition: 'all 0.15s ease',
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
          {/* Brand Logo (Crisp Emerald & Forest Green) */}
          <div
            onClick={() => handleNavClick('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '6px',
                background: 'var(--color-green-light)',
                border: '1px solid #B7E4C7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                <path d="M16 3 L27 9 L27 23 L16 29 L5 23 L5 9 Z" stroke="#15803D" strokeWidth="2.4" strokeLinejoin="round" />
                <path d="M16 8 C16 8 22 13 22 18 C22 21.5 19.3 24 16 24 C12.7 24 10 21.5 10 18 C10 13 16 8 16 8 Z" fill="#16A34A" />
                <line x1="16" y1="13" x2="16" y2="24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: '23px',
                    fontWeight: 800,
                    letterSpacing: '0.02em',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                  }}
                >
                  AUTOGROW<span style={{ color: 'var(--color-green)' }}>.</span>
                </span>
                <span 
                  style={{ 
                    fontSize: '9.5px', 
                    padding: '2px 6px',
                    background: 'var(--color-green-light)',
                    color: 'var(--color-green-text)',
                    borderRadius: '3px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                  }}
                >
                  CEA-PRO
                </span>
              </div>
              <span
                style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.08em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginTop: '1px',
                }}
              >
                Commercial CEA Automation
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '26px',
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
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                <span>Controllers & Skids</span>
                <ChevronDown size={14} />
              </button>

              {activeDropdown === 'controllers' && (
                <div
                  className="panel-chassis"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '360px',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    background: '#FFFFFF',
                    boxShadow: 'var(--shadow-lg)',
                  }}
                >
                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>MultiGrow Master [MGC-Pro]</strong>
                      <span className="decal-badge" style={{ color: 'var(--color-green-dark)' }}>32 ZONES</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Multi-area commercial greenhouse & boiler controller</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>SatuGrow FertiX Skid [SGF-100]</strong>
                      <span className="decal-badge" style={{ color: 'var(--color-blue)' }}>100 m³/hr</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Multi-zone inline precision fertigation on skid</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>SatuGrow Pro [SGP-1]</strong>
                      <span className="decal-badge">ALL-IN-ONE</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Climate + batch tank fertigation for single bay</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>IntelliDose Pro [IDC-4]</strong>
                      <span className="decal-badge">8-CHANNEL</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>8-part automated nutrient & pH precision doser</span>
                  </div>

                  <div
                    onClick={() => handleNavClick('products')}
                    style={{ padding: '8px 10px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.14s ease' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>IntelliClimate [ICC-2]</strong>
                      <span className="decal-badge">VPD SPECIALIST</span>
                    </div>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>Canopy VPD, multi-stage HVAC & CO2 steering</span>
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
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              Crops & Recipes
            </button>

            {/* 3. Architecture Ecosystem */}
            <button
              onClick={() => handleNavClick('ecosystem')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              Ecosystem
            </button>

            {/* 4. Mobile Studio */}
            <button
              onClick={() => handleNavClick('phone-scaling')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <Smartphone size={14} color="var(--color-green-dark)" />
              <span>Mobile App</span>
            </button>

            {/* 5. Economic Calculator */}
            <button
              onClick={() => handleNavClick('roi-calculator')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
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
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px 0',
              }}
            >
              Support & CAD
            </button>
          </nav>

          {/* Right Action Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              title="Search products and manuals"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.14s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Search size={16} />
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('products')}
              className="btn-machine-primary hide-mobile"
              style={{ padding: '9px 18px', fontSize: '13px' }}
            >
              <Cpu size={15} />
              Commercial Systems
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '4px',
                background: 'var(--bg-surface-subtle)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
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
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <button
            onClick={() => handleNavClick('products')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            Controllers & Fertigation Skids
          </button>
          <button
            onClick={() => handleNavClick('crops')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            Crops & Steering Profiles
          </button>
          <button
            onClick={() => handleNavClick('ecosystem')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            System Architecture
          </button>
          <button
            onClick={() => handleNavClick('phone-scaling')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            IntelliGrow™ Mobile App
          </button>
          <button
            onClick={() => handleNavClick('roi-calculator')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            Fertilizer ROI Calculator
          </button>
          <button
            onClick={() => handleNavClick('distributors')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            Find a Certified Dealer
          </button>
          <button
            onClick={() => handleNavClick('support')}
            style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}
          >
            Technical Manuals & CAD
          </button>
        </div>
      )}
    </header>
  );
};