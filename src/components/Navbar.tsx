import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowRight,
  Cpu,
  Droplet,
  Sun,
  Layers
} from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearchClick, onNavigateToSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        backgroundColor: '#FFFFFF',
        boxShadow: isScrolled ? '0 2px 16px rgba(0,0,0,0.08)' : '0 1px 0 #E5E7EB',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Top Bar - Exact TrolMaster Layout */}
      <div 
        style={{
          backgroundColor: '#1E2421',
          color: '#E5E7EB',
          fontSize: '12.5px',
          padding: '6px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Brand Ecosystem Switcher */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontWeight: 700, color: '#76b82a', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
              Autogrow
            </span>
            <span 
              onClick={() => onNavigateToSection('suite')}
              style={{ color: '#9CA3AF', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
            >
              FarmRoad AI
            </span>
            <span 
              onClick={() => onNavigateToSection('suite')}
              style={{ color: '#9CA3AF', cursor: 'pointer', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#9CA3AF')}
            >
              SatuGrow FertiX
            </span>
          </div>

          {/* Right Utility Menu */}
          <div className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span 
              onClick={() => onNavigateToSection('stories')}
              style={{ cursor: 'pointer', color: '#D1D5DB', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D1D5DB')}
            >
              About Us
            </span>
            <span 
              onClick={() => onNavigateToSection('where-to-buy')}
              style={{ cursor: 'pointer', color: '#D1D5DB', transition: 'color 0.15s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#D1D5DB')}
            >
              Dealer Portal
            </span>
            <span style={{ color: '#76b82a', fontWeight: 600 }}>
              Global Support: +1 (800) 852-3088
            </span>
          </div>
        </div>
      </div>

      {/* Primary Header Middle */}
      <div style={{ padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* TrolMaster-Style Brand Logo */}
          <div 
            onClick={() => onNavigateToSection('hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: '#76b82a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 900,
                fontSize: '18px',
                boxShadow: '0 2px 8px rgba(118, 184, 42, 0.3)',
              }}
            >
              A
            </div>
            <div>
              <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-0.02em', color: '#111827' }}>
                AUTOGROW<span style={{ color: '#76b82a' }}>.</span>
              </span>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em', color: '#6B7280', textTransform: 'uppercase', lineHeight: 1 }}>
                New Zealand
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links & Mega Menus */}
          <nav className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '26px' }}>
            
            {/* Nav Item: Controller Systems */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveMegaMenu('controllers')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => onNavigateToSection('suite')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeMegaMenu === 'controllers' ? '#76b82a' : '#1F2937',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                Controller Systems
                <ChevronDown size={14} style={{ transform: activeMegaMenu === 'controllers' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === 'controllers' && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '640px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '20px',
                    zIndex: 1100,
                  }}
                >
                  <div 
                    onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                    style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#76b82a', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                      <Cpu size={16} />
                      MultiGrow Pro Series
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>
                      Indoor & Climate Management
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      Integrated temperature, humidity, VPD, and CO2 enrichment for 32 compartments.
                    </p>
                  </div>

                  <div 
                    onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                    style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284C7', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                      <Droplet size={16} />
                      SatuGrow FertiX Series
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>
                      Precision Fertigation Skids
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      Closed-loop proportional injection up to 100 m³/hr with drain fraction reuse.
                    </p>
                  </div>

                  <div 
                    onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                    style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                      <Sun size={16} />
                      IntelliClimate CEA
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>
                      Greenhouse Automation
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      Ridge vents, fogging, shading screens, and supplemental lighting automation.
                    </p>
                  </div>

                  <div 
                    onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                    style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7C3AED', fontWeight: 700, fontSize: '13px', marginBottom: '4px' }}>
                      <Layers size={16} />
                      IntelliDose 8-Channel
                    </div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', marginBottom: '3px' }}>
                      Dosing & Micro-Injection
                    </div>
                    <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                      Compact automated peristaltic dosing for craft research and NFT channels.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Nav Item: Solutions */}
            <button 
              onClick={() => onNavigateToSection('showcase')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              Solutions
            </button>

            {/* Nav Item: Specialized Suite */}
            <button 
              onClick={() => onNavigateToSection('suite')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              Hardware Lineup
            </button>

            {/* Nav Item: App */}
            <button 
              onClick={() => onNavigateToSection('app')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              IntelliGrow™ App
            </button>

            {/* Nav Item: Support & Downloads */}
            <button 
              onClick={() => onNavigateToSection('where-to-buy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              Support & CAD
            </button>

            {/* Nav Item: Where to Buy */}
            <button 
              onClick={() => onNavigateToSection('where-to-buy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              Where to Buy
            </button>
          </nav>

          {/* Right Header Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Search Button */}
            <button
              onClick={onSearchClick}
              aria-label="Search site"
              style={{
                background: '#F3F4F6',
                border: 'none',
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#374151',
                cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E5E7EB')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F3F4F6')}
            >
              <Search size={18} />
            </button>

            {/* Primary Action Button (TrolMaster Style Pill) */}
            <button
              onClick={() => onNavigateToSection('where-to-buy')}
              className="btn btn-primary d-none-mobile"
              style={{ padding: '10px 22px', fontSize: '13.5px' }}
            >
              Where to Buy
              <ArrowRight size={14} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="d-none-desktop"
              aria-label="Toggle Navigation"
              style={{
                background: 'none',
                border: 'none',
                color: '#111827',
                padding: '8px',
                cursor: 'pointer',
              }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <div 
            onClick={() => { onNavigateToSection('suite'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Controller Systems (MultiGrow & SatuGrow)
          </div>
          <div 
            onClick={() => { onNavigateToSection('showcase'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Protected Cropping Solutions
          </div>
          <div 
            onClick={() => { onNavigateToSection('suite'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Hardware & Dosing Skids
          </div>
          <div 
            onClick={() => { onNavigateToSection('app'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            IntelliGrow™ Mobile App
          </div>
          <div 
            onClick={() => { onNavigateToSection('stories'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Commercial Grower Stories
          </div>
          <div 
            onClick={() => { onNavigateToSection('where-to-buy'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Technical Downloads & CAD
          </div>
          <div 
            onClick={() => { onNavigateToSection('where-to-buy'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#76b82a', cursor: 'pointer' }}
          >
            Where to Buy (Distributor Network)
          </div>
        </div>
      )}
    </header>
  );
};
