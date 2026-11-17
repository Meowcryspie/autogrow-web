import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowRight,
  Cpu,
  Layers,
  ShoppingBag,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2
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
  const [isSupportBarOpen, setIsSupportBarOpen] = useState(false);

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
      {/* Top Black Bar - FarmRoad AI, SatuGrow FertiX & Blog REMOVED as requested */}
      <div 
        style={{
          backgroundColor: '#1E2421',
          color: '#E5E7EB',
          fontSize: '12.5px',
          padding: '7px 0',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left: Brand Identity Only (FarmRoad & SatuGrow removed) */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span 
              onClick={() => onNavigateToPage('home')}
              style={{ fontWeight: 700, color: '#76b82a', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
              Autogrow Systems
            </span>
          </div>

          {/* Right Utility Menu: About Us, Technical Support Desk (Blog removed from black header) */}
          <div className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '22px' }}>
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
              About Us
            </span>

            {/* Technical Support Desk Button - Toggles Support Bar */}
            <span 
              onClick={() => setIsSupportBarOpen(!isSupportBarOpen)}
              style={{ 
                cursor: 'pointer', 
                color: isSupportBarOpen ? '#76b82a' : '#86EFAC', 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                fontWeight: 600,
                backgroundColor: isSupportBarOpen ? 'rgba(118, 184, 42, 0.15)' : 'transparent',
                padding: '2px 8px',
                borderRadius: '4px',
                transition: 'all 0.15s' 
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = isSupportBarOpen ? '#76b82a' : '#86EFAC')}
            >
              <MessageSquare size={13} />
              Technical Support Desk
              <ChevronDown size={12} style={{ transform: isSupportBarOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </span>

            <span style={{ color: '#9CA3AF', fontSize: '11px' }}>|</span>

            <span style={{ color: '#76b82a', fontWeight: 600 }}>
              Global Support: +1 (800) 852-3088
            </span>
          </div>
        </div>
      </div>

      {/* EXPANDABLE TECHNICAL SUPPORT DESK BAR WITH X BUTTON (Content from Autogrow Support) */}
      {isSupportBarOpen && (
        <div 
          style={{
            backgroundColor: '#161B18',
            color: '#FFFFFF',
            borderBottom: '2px solid #76b82a',
            boxShadow: '0 12px 30px rgba(0,0,0,0.35)',
            position: 'relative',
            zIndex: 1200,
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div className="container" style={{ padding: '24px 20px' }}>
            
            {/* Top Bar inside Support Desk */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#76b82a', boxShadow: '0 0 8px #76b82a' }} />
                <h3 style={{ fontSize: '15px', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#FFFFFF', margin: 0 }}>
                  Autogrow Technical Support Desk · Auckland HQ & Field Integration
                </h3>
              </div>

              {/* Close 'X' Button */}
              <button
                onClick={() => setIsSupportBarOpen(false)}
                aria-label="Close Technical Support Desk"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '6px',
                  color: '#D1D5DB',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.color = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#D1D5DB';
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* 3-Column Genuine Autogrow Support Content */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              
              {/* Column 1: Direct Phone Hotlines */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#76b82a', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>
                  <Phone size={16} />
                  Telephone Hotlines (Mon–Fri 11am–5pm NZST)
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇳🇿 New Zealand & Global:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>+64 9 415 2380</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇺🇸 Americas Toll-Free:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>+1 (800) 852-3088</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇲🇾 Southeast Asia Hub:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>+60 3-8023 2388</strong>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#86EFAC', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <CheckCircle2 size={12} />
                  24/7 harvest critical escalation for enterprise skid clients.
                </div>
              </div>

              {/* Column 2: Email Helpdesks */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284C7', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>
                  <Mail size={16} />
                  Email Helpdesks & Ticket Support
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>General Technical Help:</span>
                    <a href="mailto:help@autogrow.com" style={{ color: '#38BDF8', textDecoration: 'none' }}>help@autogrow.com</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Skids & Wiring Support:</span>
                    <a href="mailto:engineering@autogrow.com" style={{ color: '#38BDF8', textDecoration: 'none' }}>engineering@autogrow.com</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Agronomy & Recipe Steering:</span>
                    <a href="mailto:agronomy@autogrow.com" style={{ color: '#38BDF8', textDecoration: 'none' }}>agronomy@autogrow.com</a>
                  </div>
                </div>
                <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '10px' }}>
                  Guaranteed 1-hour ticket acknowledgment for commercial sites.
                </div>
              </div>

              {/* Column 3: Instant Diagnostics & Online Resources */}
              <div style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '10px', padding: '16px', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', fontWeight: 700, fontSize: '13px', marginBottom: '10px' }}>
                    <MessageSquare size={16} />
                    Instant Diagnostics & Replacement Parts
                  </div>
                  <p style={{ fontSize: '12px', color: '#D1D5DB', margin: '0 0 12px 0' }}>
                    Troubleshoot MultiGrow 24VAC alarms, probe calibration, or order replacement parts:
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      setIsSupportBarOpen(false);
                      onOpenSupportChat();
                    }}
                    className="btn btn-primary"
                    style={{ padding: '8px 16px', fontSize: '12px' }}
                  >
                    <MessageSquare size={13} />
                    Launch Live Support Chat
                  </button>

                  <button
                    onClick={() => {
                      setIsSupportBarOpen(false);
                      onNavigateToPage('store');
                    }}
                    style={{
                      padding: '8px 14px',
                      fontSize: '12px',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#FFFFFF',
                      border: '1px solid rgba(255,255,255,0.2)',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <ShoppingBag size={12} />
                    Online Parts Store
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Primary White Header */}
      <div style={{ padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px' }}>
          
          {/* Brand Logo */}
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

          {/* Desktop Navigation Links (Where to Buy beside Blog REMOVED) */}
          <nav className="d-none-mobile" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            
            {/* 1. Unified HARDWARE Dropdown */}
            <div 
              style={{ position: 'relative' }}
              onMouseEnter={() => setActiveMegaMenu('hardware')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <button 
                onClick={() => onNavigateToSection('suite')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeMegaMenu === 'hardware' ? '#76b82a' : '#1F2937',
                  fontWeight: 600,
                  fontSize: '14.5px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  cursor: 'pointer',
                  padding: '8px 0',
                }}
              >
                Hardware
                <ChevronDown size={14} style={{ transform: activeMegaMenu === 'hardware' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>

              {/* Mega Menu Dropdown */}
              {activeMegaMenu === 'hardware' && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: '-20px',
                    width: '680px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                    padding: '24px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '24px',
                    zIndex: 1100,
                  }}
                >
                  {/* Column A: Controller Systems */}
                  <div>
                    <div 
                      onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                      style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#76b82a', letterSpacing: '0.08em', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Cpu size={14} />
                      Controller Systems
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>MultiGrow Pro Series</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Indoor & multi-compartment climate management</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>SatuGrow FertiX Skid</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>10-100 m³/hr inline proportional fertigation</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>IntelliDose 8-Channel</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Precision peristaltic nutrient & pH dosing</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>IntelliClimate CEA</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Ridge vents, shading, fogging & heating</div>
                      </div>
                    </div>
                  </div>

                  {/* Column B: Hardware Lineup */}
                  <div>
                    <div 
                      onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                      style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#0284C7', letterSpacing: '0.08em', marginBottom: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Layers size={14} />
                      Hardware Lineup
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>EnviroSensor Canopy Pod</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Fan-forced aspirated VPD & CO2 sensing</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>WCS Rootzone TDR Probe</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Substrate volumetric water content & pore EC</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Digital Turbine Flow Meters</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>1 pulse/Litre real-time volume logging</div>
                      </div>

                      <div 
                        onClick={() => { onNavigateToSection('suite'); setActiveMegaMenu(null); }}
                        style={{ padding: '8px 10px', borderRadius: '6px', cursor: 'pointer', transition: 'background 0.15s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827' }}>Meteorological Pyranometer</div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280' }}>Outdoor solar accumulation & wind mast</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Solutions */}
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

            {/* 3. Autogrow App */}
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
              Autogrow App
            </button>

            {/* 4. Online Store */}
            <button 
              onClick={() => onNavigateToPage('store')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'store' ? '#15803D' : '#1F2937',
                fontWeight: currentPage === 'store' ? 700 : 600,
                fontSize: '14.5px',
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

            {/* 5. Blog */}
            <button 
              onClick={() => onNavigateToPage('blog')}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === 'blog' ? '#76b82a' : '#1F2937',
                fontWeight: currentPage === 'blog' ? 700 : 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'blog' ? '#76b82a' : '#1F2937')}
            >
              Blog
            </button>

            {/* Note: "Where to Buy" text link has been removed from beside Blog as directed */}
          </nav>

          {/* Right Controls: Search + SINGLE GREEN "Where to Buy" Button Kept */}
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

            {/* Single Green Where to Buy Button (Kept green as requested) */}
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
            onClick={() => { onNavigateToPage('home'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Home Overview
          </div>
          <div 
            onClick={() => { onNavigateToSection('suite'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Hardware (Controllers & Lineup)
          </div>
          <div 
            onClick={() => { onNavigateToSection('showcase'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Solutions
          </div>
          <div 
            onClick={() => { onNavigateToSection('app'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Autogrow App
          </div>
          <div 
            onClick={() => { onNavigateToPage('store'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#15803D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShoppingBag size={16} />
            Online Store (Controllers, Hardware & Spares)
          </div>
          <div 
            onClick={() => { onNavigateToPage('blog'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Blog
          </div>
          <div 
            onClick={() => { onNavigateToPage('about'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            About Us
          </div>
          <div 
            onClick={() => { 
              setMobileMenuOpen(false);
              setIsSupportBarOpen(true); 
            }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#0284C7', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <MessageSquare size={16} />
            Technical Support Desk (Info & Contacts)
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
