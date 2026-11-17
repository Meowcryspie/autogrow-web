import React from 'react';
import { ArrowRight, ShieldCheck, Radio, Cpu, Layers } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToSection }) => {
  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        borderBottom: '1px solid var(--border-color)',
        paddingTop: '60px',
        paddingBottom: '80px',
      }}
    >
      {/* Background Hero Image with Tactical CEA Dark Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(180deg, rgba(6, 10, 8, 0.82) 0%, rgba(6, 10, 8, 0.94) 75%, rgba(6, 10, 8, 1) 100%),
            linear-gradient(90deg, rgba(6, 10, 8, 0.95) 0%, rgba(6, 10, 8, 0.65) 50%, rgba(6, 10, 8, 0.95) 100%),
            url('assets/images/hero-greenhouse.jpg')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 0,
        }}
      />

      {/* Cyber AgTech Grid Lines & Ambient Glow */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(circle at 75% 25%, rgba(0, 255, 136, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 20% 70%, rgba(0, 229, 255, 0.07) 0%, transparent 45%)
          `,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Hero Content */}
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: '860px' }}>
          
          {/* Top Tactical Status Badge */}
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: 'rgba(0, 255, 136, 0.08)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              marginBottom: '24px',
              boxShadow: '0 0 20px rgba(0, 255, 136, 0.15)',
            }}
          >
            <span className="beacon-pulse" />
            <span 
              style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '11px', 
                color: 'var(--color-green)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              Autogrow IntelliSeries™ · Industrial CEA Automation
            </span>
            <span 
              style={{
                fontSize: '10px',
                padding: '2px 8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                color: '#fff',
                fontFamily: 'var(--font-mono)',
              }}
            >
              v3.2 Live
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              marginBottom: '22px',
              color: '#ffffff',
            }}
          >
            PRECISION CLIMATE & <br />
            <span 
              style={{
                background: 'linear-gradient(135deg, #00FF88 0%, #00E5FF 70%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FERTIGATION DOSING
            </span>
            <br />
            AT COMMERCIAL SCALE
          </h1>

          {/* Subtitle / Value Proposition */}
          <p 
            style={{
              fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '680px',
              marginBottom: '36px',
            }}
          >
            TrolMaster-grade tactical control meets Autogrow's 30+ years of New Zealand agricultural engineering. 
            Automate microclimates, multi-reservoir nutrition, and crop-steering telemetry across commercial greenhouses and vertical farms worldwide.
          </p>

          {/* Action CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', marginBottom: '50px' }}>
            <button
              onClick={() => onNavigateToSection('products')}
              className="btn-glow"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                borderRadius: '6px',
                background: 'var(--color-green)',
                color: '#060a08',
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Cpu size={18} />
              Explore Hardware Systems
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onNavigateToSection('phone-scaling')}
              className="btn-ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 26px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                fontWeight: 600,
                fontSize: '14px',
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <Radio size={18} style={{ color: 'var(--color-cyan)' }} />
              Live Phone Scaling Demo
            </button>

            <button
              onClick={() => onNavigateToSection('ecosystem')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-secondary)',
                padding: '10px 14px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Layers size={16} />
              View Ecosystem Architecture
            </button>
          </div>

          {/* Tactical Specs Ticker Grid (TrolMaster style) */}
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '16px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                30<span style={{ color: 'var(--color-green)' }}>+</span> YRS
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                CEA Engineering Heritage
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                45<span style={{ color: 'var(--color-cyan)' }}>+</span> CTYS
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Active Worldwide Deployments
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                ±0.05 <span style={{ color: 'var(--color-green)', fontSize: '14px' }}>EC</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Continuous Dosing Precision
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '24px', fontWeight: 700, color: '#ffffff' }}>
                99.98<span style={{ color: 'var(--color-green)' }}>%</span>
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Hardware Telemetry Uptime
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Tactical Telemetry Card in Hero Corner */}
      <div 
        className="hide-mobile"
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '12%',
          width: '320px',
          background: 'rgba(11, 18, 14, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(0, 255, 136, 0.25)',
          borderRadius: '10px',
          padding: '18px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 255, 136, 0.1)',
          zIndex: 3,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="beacon-pulse" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-green)', fontWeight: 600 }}>
              ZONE 01 · MULTIGROW PRO
            </span>
          </div>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>RS485 CH-04</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target EC</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              2.24 <span style={{ fontSize: '11px', color: 'var(--color-green)' }}>mS/cm</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Target pH</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              5.82 <span style={{ fontSize: '11px', color: 'var(--color-cyan)' }}>pH</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>VPD Deficit</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              1.18 <span style={{ fontSize: '11px', color: 'var(--color-green)' }}>kPa</span>
            </div>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>CO2 Level</div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
              1,150 <span style={{ fontSize: '11px', color: '#ffcc00' }}>ppm</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '10px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <ShieldCheck size={14} style={{ color: 'var(--color-green)' }} />
            Fail-Safe Watchdog Active
          </span>
          <span style={{ color: 'var(--color-green)', fontFamily: 'var(--font-mono)', fontSize: '10px' }}>NORMAL</span>
        </div>
      </div>
    </section>
  );
};