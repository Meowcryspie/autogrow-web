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
  Layers,
  ShoppingBag,
  MessageSquare,
  BookOpen,
  Info
} from 'lucide-react';

interface NavbarProps {
  onSearchClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentPage: 'home' | 'about' | 'blog' | 'store';
  onNavigateToPage: (page: 'home' | 'about' | 'blog' | 'store') => void;
  onOpenSupportChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearchClick, 
  onNavigateToSection,
  currentPage,
  onNavigateToPage,
  onOpenSupportChat
}) => {
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
            <span 
              onClick={() => onNavigateToPage('home')}
              style={{ fontWeight: 700, color: '#76b82a', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' }}
            >
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
          <div className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span 
              onClick={() => onNavigateToPage('about')}
              style={{ 
                cursor: 'pointer', 
                color: currentPage === 'about' ? '#76b82a' : '#D1D5DB', 
                fontWeight: currentPage === 'about' ? 700 : 500,
                transition: 'color 0.15s' 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'about' ? '#76b82a' : '#D1D5DB')}
            >
              About Us (1994)
            </span>
            <span 
              onClick={() => onNavigateToPage('blog')}
              style={{ 
                cursor: 'pointer', 
                color: currentPage === 'blog' ? '#76b82a' : '#D1D5DB', 
                fontWeight: currentPage === 'blog' ? 700 : 500,
                transition: 'color 0.15s' 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'blog' ? '#76b82a' : '#D1D5DB')}
            >
              Grower Blog
            </span>
            <span 
              onClick={onOpenSupportChat}
              style={{ 
                cursor: 'pointer', 
                color: '#86EFAC', 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
                transition: 'color 0.15s' 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#86EFAC')}
            >
              <MessageSquare size={13} />
              Technical Support Desk
            </span>
            <span style={{ color: '#9CA3AF', fontSize: '11px' }}>|</span>
            <span style={{ color: '#76b82a', fontWeight: 600 }}>
              Global Support: +1 (800) 852-3088
            </span>
          </div>
        </div>
      </div>

      {/* Primary Header Middle */}
      <div style={{ padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* TrolMaster-Style Brand Logo */}
          <div 
            onClick={() => onNavigateToPage('home')}
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
          <nav className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
            
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
                  fontSize: '14px',
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
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              Solutions
            </button>

            {/* Nav Item: Hardware Lineup */}
            <button 
              onClick={() => onNavigateToSection('suite')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14px',
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
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F2937')}
            >
              IntelliGrow™ App
            </button>

            {/* Nav Item: Online Store (Direct Autogrow Commercial Spares) */}
            <button 
              onClick={() => onNavigateToPage('store')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'store' ? '#15803D' : '#1F2937',
                fontWeight: currentPage === 'store' ? 700 : 600,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 0',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'store' ? '#15803D' : '#1F2937')}
            >
              <ShoppingBag size={15} style={{ color: '#76b82a' }} />
              Online Store
              <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '4px' }}>
                DIRECT
              </span>
            </button>

            {/* Nav Item: Grower Blog */}
            <button 
              onClick={() => onNavigateToPage('blog')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'blog' ? '#76b82a' : '#1F2937',
                fontWeight: currentPage === 'blog' ? 700 : 600,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'blog' ? '#76b82a' : '#1F2937')}
            >
              Grower Blog
            </button>

            {/* Nav Item: About Us */}
            <button 
              onClick={() => onNavigateToPage('about')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'about' ? '#76b82a' : '#1F2937',
                fontWeight: currentPage === 'about' ? 700 : 600,
                fontSize: '14px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'about' ? '#76b82a' : '#1F2937')}
            >
              About Us
            </button>

            {/* Nav Item: Where to Buy */}
            <button 
              onClick={() => onNavigateToSection('where-to-buy')}
              style={{
                background: 'none',
                border: 'none',
                color: '#1F2937',
                fontWeight: 600,
                fontSize: '14px',
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

          {/* Right Header Controls: Search + DUAL ACTION BUTTONS (Store + Where to Buy) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              <Search size={17} />
            </button>

            {/* DUAL BUTTON 1: Shop Online Store (Requested by user) */}
            <button
              onClick={() => onNavigateToPage('store')}
              className="btn btn-secondary d-none-mobile"
              style={{ padding: '9px 18px', fontSize: '13px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ShoppingBag size={14} style={{ color: '#76b82a' }} />
              Parts Store
            </button>

            {/* DUAL BUTTON 2: Where to Buy (Dealers & Commercial Integration) */}
            <button
              onClick={() => onNavigateToSection('where-to-buy')}
              className="btn btn-primary d-none-mobile"
              style={{ padding: '9px 20px', fontSize: '13px' }}
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
            onClick={() => { onNavigateToPage('home'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Home Overview
          </div>
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
            onClick={() => { onNavigateToSection('app'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            IntelliGrow™ Mobile App
          </div>
          <div 
            onClick={() => { onNavigateToPage('store'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#15803D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingBag size={16} />
            Direct Online Store (Probes & Spares)
          </div>
          <div 
            onClick={() => { onNavigateToPage('blog'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <BookOpen size={16} />
            Grower Blog & Technical Guides
          </div>
          <div 
            onClick={() => { onNavigateToPage('about'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Info size={16} />
            About Us (1994 Heritage)
          </div>
          <div 
            onClick={() => { onOpenSupportChat(); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#0284C7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={16} />
            Technical Support Desk (Live Chat)
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
