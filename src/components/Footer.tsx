import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToPage: (page: 'home' | 'about' | 'blog' | 'store' | 'admin') => void;
  onOpenSupportChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateToSection, 
  onNavigateToPage, 
  onOpenSupportChat 
}) => {
  return (
    <footer 
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #E5E7EB',
        paddingTop: '64px',
        color: '#4B5563',
      }}
    >
      {/* Tier 1: Top Footer CTA Banner - Exact TrolMaster Layout */}
      <div className="container" style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '48px', marginBottom: '56px' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 
              style={{
                fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                fontWeight: 800,
                color: '#111827',
                lineHeight: 1.15,
                margin: '0 0 12px 0',
              }}
            >
              Start your <span style={{ textDecoration: 'underline', textDecorationColor: '#76b82a' }}>journey</span>,<br />
              at Autogrow
            </h2>
            <p style={{ fontSize: '15px', color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: '640px' }}>
              Autogrow makes it easy to control your grow environment — from research chambers to large commercial acreage. Manage climate, watering, and CO2 with our smart systems. Find the right setup for your needs.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <button
              onClick={() => onNavigateToSection('where-to-buy')}
              className="btn btn-primary"
              style={{ padding: '14px 34px', fontSize: '15px' }}
            >
              Find a Distributor
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Middle Footer - 6 Link Columns */}
      <div className="container" style={{ marginBottom: '48px' }}>
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
            gap: '32px',
          }}
        >
          {/* Col 1: Brands */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Brands</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToPage('home')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Autogrow</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>FarmRoad AI</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>SatuGrow FertiX</span></li>
              <li><span onClick={() => onNavigateToPage('about')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Bluelab Alliance (2021)</span></li>
              <li><span onClick={() => onNavigateToPage('about')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Excel Seeds Commercial (2024)</span></li>
            </ul>
          </div>

          {/* Col 2: Controller System */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Controller System</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Indoor Growing (MultiGrow)</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Smart Irrigation (SatuGrow)</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Greenhouse Automation</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>IntelliDose 8-Channel</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>CO2 Enrichment System</span></li>
            </ul>
          </div>

          {/* Col 3: Hardware & Parts */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Hardware & Parts</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>MultiGrow MGC-Pro</span></li>
              <li><span onClick={() => onNavigateToSection('suite')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>FertiX 100m³/h Skid</span></li>
              <li><span onClick={() => onNavigateToPage('store')} style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#15803D', fontWeight: 600 }}>pH Sense Plus Probe</span></li>
              <li><span onClick={() => onNavigateToPage('store')} style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#15803D', fontWeight: 600 }}>EC Toroidal Inline Sensor</span></li>
              <li><span onClick={() => onNavigateToPage('store')} style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#15803D', fontWeight: 600 }}>Pump Tubing Spares</span></li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Solutions</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToSection('showcase')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Indoor Vertical CEA</span></li>
              <li><span onClick={() => onNavigateToSection('showcase')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Greenhouse Automation</span></li>
              <li><span onClick={() => onNavigateToSection('showcase')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Closed-Loop Irrigation</span></li>
              <li><span onClick={() => onNavigateToSection('showcase')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>High-Wire Vine Crops</span></li>
              <li><span onClick={() => onNavigateToSection('showcase')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Tabletop Berries</span></li>
            </ul>
          </div>

          {/* Col 5: Discover */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Discover</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToPage('blog')} style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#76b82a', fontWeight: 700 }}>Blog</span></li>
              <li><span onClick={() => onNavigateToPage('about')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Our Story Since 1994</span></li>
              <li><span onClick={() => onNavigateToSection('stories')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>North Canterbury Tomatoes</span></li>
              <li><span onClick={() => onNavigateToSection('stories')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Baja Desert Greenhouse</span></li>
              <li><span onClick={() => onNavigateToSection('stories')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Ontario Tabletop Berries</span></li>
            </ul>
          </div>

          {/* Col 6: Support */}
          <div>
            <p style={{ fontWeight: 700, color: '#111827', fontSize: '15px', marginBottom: '16px' }}>Support & Spares</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px' }}>
              <li><span onClick={() => onNavigateToPage('about')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>About Us</span></li>
              <li><span onClick={() => onNavigateToPage('store')} style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#15803D', fontWeight: 700 }}>Direct Online Store</span></li>
              <li>
                <span 
                  onClick={onOpenSupportChat} 
                  style={{ cursor: 'pointer', transition: 'color 0.15s', color: '#0284C7', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <MessageSquare size={13} />
                  Live Support Chat
                </span>
              </li>
              <li><span onClick={() => onNavigateToSection('where-to-buy')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Firmware & Manuals</span></li>
              <li><span onClick={() => onNavigateToSection('where-to-buy')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>CAD 3D Schematics</span></li>
              <li><span onClick={() => onNavigateToSection('where-to-buy')} style={{ cursor: 'pointer', transition: 'color 0.15s' }}>Distributor Network</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tier 3: Pre-Bottom Footer - Autogrow Logo */}
      <div className="container" style={{ borderTop: '1px solid #E5E7EB', paddingTop: '32px', paddingBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div 
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '6px',
              backgroundColor: '#76b82a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 900,
              fontSize: '16px',
            }}
          >
            A
          </div>
          <span style={{ fontSize: '20px', fontWeight: 800, color: '#111827' }}>
            AUTOGROW<span style={{ color: '#76b82a' }}>.</span>
          </span>
          <span style={{ fontSize: '12px', color: '#6B7280', marginLeft: '12px', paddingLeft: '12px', borderLeft: '1px solid #D1D5DB' }}>
            Engineered in New Zealand for Global Protected Cropping · Founded 1994
          </span>
        </div>
      </div>

      {/* Tier 4: Bottom Footer - Copyright & Social Links */}
      <div 
        style={{
          backgroundColor: '#F9FAFB',
          borderTop: '1px solid #E5E7EB',
          padding: '20px 0',
          fontSize: '12.5px',
          color: '#6B7280',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <span>© {new Date().getFullYear()} Autogrow Systems Ltd. All rights reserved.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateToPage('about')}>About Us</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateToPage('blog')}>Grower Blog</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateToPage('store')}>Online Store</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigateToSection('where-to-buy')}>Distributor Portal</span>
            <span style={{ cursor: 'pointer' }} onClick={onOpenSupportChat}>Technical Helpdesk</span>
            <span style={{ cursor: 'pointer', color: '#15803D', fontWeight: 600 }} onClick={() => onNavigateToPage('admin')}>CMS Admin</span>
          </div>
        </div>
      </div>

    </footer>
  );
};
