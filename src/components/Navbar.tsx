import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  ArrowRight,
  Cpu,
  Layers,
  ShoppingBag,
  ShoppingCart,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle2,
  Sliders,
  User,
  LogOut
} from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

interface NavbarProps {
  onSearchClick: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentPage: 'home' | 'about' | 'blog' | 'store' | 'admin' | 'orders' | 'feedback';
  onNavigateToPage: (page: 'home' | 'about' | 'blog' | 'store' | 'admin' | 'orders' | 'feedback') => void;
  onOpenSupportChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onSearchClick, 
  onNavigateToSection,
  currentPage,
  onNavigateToPage,
  onOpenSupportChat
}) => {
  const { activeContent } = useContent();
  const contacts = activeContent.supportContacts;

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSupportBarOpen, setIsSupportBarOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const { user, profile, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {/* Right Utility Menu: About Us, Technical Support Desk, Global Hotline */}
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
              Global Support: {contacts.phoneUs}
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
                  Telephone Hotlines ({contacts.supportHours})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇳🇿 New Zealand & Global:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{contacts.phoneNz}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇺🇸 Americas Toll-Free:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{contacts.phoneUs}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>🇲🇾 Southeast Asia Hub:</span>
                    <strong style={{ color: '#FFFFFF', fontFamily: 'monospace' }}>{contacts.phoneSea}</strong>
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
                    <a href={`mailto:${contacts.emailHelp}`} style={{ color: '#38BDF8', textDecoration: 'none' }}>{contacts.emailHelp}</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Skids & Wiring Support:</span>
                    <a href={`mailto:${contacts.emailEngineering}`} style={{ color: '#38BDF8', textDecoration: 'none' }}>{contacts.emailEngineering}</a>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#9CA3AF' }}>Agronomy & Recipe Steering:</span>
                    <a href={`mailto:${contacts.emailAgronomy}`} style={{ color: '#38BDF8', textDecoration: 'none' }}>{contacts.emailAgronomy}</a>
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
            
            {/* 1. Solutions */}
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

            {/* 2. Unified HARDWARE Dropdown */}
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
                color: currentPage === 'store' ? '#76b82a' : '#1F2937',
                fontWeight: currentPage === 'store' ? 700 : 600,
                fontSize: '14.5px',
                cursor: 'pointer',
                padding: '8px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
              onMouseLeave={(e) => (e.currentTarget.style.color = currentPage === 'store' ? '#76b82a' : '#1F2937')}
            >
              Online Store
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

          {/* Right Controls: Search + Where to Buy Button + (Sign In OR Profile Circle Dropdown) */}
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

            {/* Right Side of Where to Buy: Sign In (if guest) OR Circular Profile Dropdown (if signed in) */}
            {user ? (
              <div ref={profileDropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  data-testid="mini-profile-button"
                  aria-label="User Account Menu"
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: isAdmin ? '#1E2421' : '#F3F4F6',
                    color: isAdmin ? '#86EFAC' : '#1F2937',
                    border: isAdmin ? '1.5px solid rgba(118, 184, 42, 0.5)' : '1.5px solid #D1D5DB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                    padding: 0
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#76b82a';
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isAdmin ? 'rgba(118, 184, 42, 0.5)' : '#D1D5DB';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                  title={`${profile?.full_name || user.email} · Account Profile`}
                >
                  {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : <User size={18} />}
                </button>

                {/* Dropdown Menu */}
                {isProfileDropdownOpen && (
                  <div
                    data-testid="mini-profile-dropdown"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      width: '240px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      boxShadow: '0 16px 36px -4px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.06)',
                      padding: '8px',
                      zIndex: 1500,
                      animation: 'fadeIn 0.15s ease',
                    }}
                  >
                    {/* User Profile Header (Name & Email in Dropdown) */}
                    <div style={{ padding: '8px 12px 10px', borderBottom: '1px solid #F3F4F6' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {profile?.full_name || (isAdmin ? 'Chief Operations Admin' : 'Grower Client')}
                        </span>
                        <span style={{ 
                          backgroundColor: isAdmin ? '#DCFCE7' : '#EFF6FF', 
                          color: isAdmin ? '#15803D' : '#1D4ED8', 
                          fontSize: '9px', 
                          fontWeight: 800, 
                          padding: '1px 5px', 
                          borderRadius: '4px' 
                        }}>
                          {isAdmin ? 'ADMIN' : 'GROWER'}
                        </span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '2px' }}>
                        {user.email}
                      </div>
                    </div>

                    {/* Dropdown Items: Orders, Feedback, and Manage Site (Admin Only) */}
                    <div style={{ padding: '6px 0', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        onClick={() => {
                          onNavigateToPage('orders');
                          setIsProfileDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 12px',
                          background: currentPage === 'orders' ? '#F0FDF4' : 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: currentPage === 'orders' ? '#15803D' : '#374151',
                          fontSize: '13px',
                          fontWeight: currentPage === 'orders' ? 700 : 500,
                          textAlign: 'left',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={(e) => {
                          if (currentPage !== 'orders') e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          if (currentPage !== 'orders') e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <ShoppingCart size={16} style={{ color: '#76b82a' }} />
                        <span>Orders</span>
                      </button>

                      <button
                        onClick={() => {
                          onNavigateToPage('feedback');
                          setIsProfileDropdownOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 12px',
                          background: currentPage === 'feedback' ? '#EFF6FF' : 'transparent',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          color: currentPage === 'feedback' ? '#1D4ED8' : '#374151',
                          fontSize: '13px',
                          fontWeight: currentPage === 'feedback' ? 700 : 500,
                          textAlign: 'left',
                          transition: 'background 0.12s',
                        }}
                        onMouseEnter={(e) => {
                          if (currentPage !== 'feedback') e.currentTarget.style.backgroundColor = '#F9FAFB';
                        }}
                        onMouseLeave={(e) => {
                          if (currentPage !== 'feedback') e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        <MessageSquare size={16} style={{ color: '#0284C7' }} />
                        <span>Feedback</span>
                      </button>

                      {/* Manage Site (Only for Admin users) */}
                      {isAdmin && (
                        <button
                          onClick={() => {
                            onNavigateToPage('admin');
                            setIsProfileDropdownOpen(false);
                          }}
                          style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '9px 12px',
                            background: currentPage === 'admin' ? '#F3F4F6' : 'transparent',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            color: currentPage === 'admin' ? '#111827' : '#374151',
                            fontSize: '13px',
                            fontWeight: currentPage === 'admin' ? 700 : 500,
                            textAlign: 'left',
                            transition: 'background 0.12s',
                          }}
                          onMouseEnter={(e) => {
                            if (currentPage !== 'admin') e.currentTarget.style.backgroundColor = '#F9FAFB';
                          }}
                          onMouseLeave={(e) => {
                            if (currentPage !== 'admin') e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          <Sliders size={16} style={{ color: '#76b82a' }} />
                          <span>Manage Site</span>
                        </button>
                      )}
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', backgroundColor: '#F3F4F6', margin: '4px 0' }} />

                    {/* Sign Out */}
                    <button
                      onClick={() => {
                        signOut();
                        setIsProfileDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        background: 'none',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#DC2626',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        textAlign: 'left',
                        transition: 'background 0.12s',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FEF2F2')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <LogOut size={14} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* When not signed in, show Sign In button to the RIGHT of Where to Buy */
              <button
                onClick={() => setIsAuthOpen(true)}
                data-testid="navbar-sign-in-btn"
                className="d-none-mobile"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #D1D5DB',
                  borderRadius: '9999px',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#1F2937',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#F9FAFB';
                  e.currentTarget.style.borderColor = '#9CA3AF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFFFF';
                  e.currentTarget.style.borderColor = '#D1D5DB';
                }}
                title="Sign in or register your grower account"
              >
                <User size={15} style={{ color: '#76b82a' }} />
                <span>Sign In</span>
              </button>
            )}

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
            onClick={() => { onNavigateToSection('showcase'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Solutions
          </div>
          <div 
            onClick={() => { onNavigateToSection('suite'); setMobileMenuOpen(false); }}
            style={{ fontWeight: 700, fontSize: '16px', color: '#111827', cursor: 'pointer' }}
          >
            Hardware (Controllers & Lineup)
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

          {user && isAdmin && (
            <>
              <div 
                onClick={() => { onNavigateToPage('orders'); setMobileMenuOpen(false); }}
                style={{ fontWeight: 700, fontSize: '16px', color: '#15803D', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F0FDF4', padding: '10px 12px', borderRadius: '8px' }}
              >
                <ShoppingCart size={16} />
                Orders Management
              </div>
              <div 
                onClick={() => { onNavigateToPage('feedback'); setMobileMenuOpen(false); }}
                style={{ fontWeight: 700, fontSize: '16px', color: '#2563EB', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#EFF6FF', padding: '10px 12px', borderRadius: '8px' }}
              >
                <MessageSquare size={16} />
                Feedback Management
              </div>
              <div 
                onClick={() => { onNavigateToPage('admin'); setMobileMenuOpen(false); }}
                style={{ fontWeight: 700, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1E2421', color: '#86EFAC', padding: '10px 12px', borderRadius: '8px' }}
              >
                <Sliders size={16} />
                Manage Site (CMS)
              </div>
            </>
          )}

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

          <div style={{ paddingTop: '16px', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {user ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 600 }}>
                  {profile?.full_name || user.email}
                </span>
                <button
                  onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '13px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { setIsAuthOpen(true); setMobileMenuOpen(false); }}
                style={{ padding: '10px', backgroundColor: '#111827', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontWeight: 700, fontSize: '14px', cursor: 'pointer', textAlign: 'center' }}
              >
                Grower Sign In / Register
              </button>
            )}
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </header>
  );
};
