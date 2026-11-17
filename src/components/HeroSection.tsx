import React, { useState } from 'react';
import { ArrowRight, Cpu, Radio, Terminal } from 'lucide-react';

interface HeroSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigateToSection }) => {
  const [activeZone, setActiveZone] = useState<'zone1' | 'zone2' | 'zone3'>('zone1');

  const zoneData = {
    zone1: {
      name: 'ZONE 01 · VENLO BAY A',
      crop: 'High-Wire Vine Tomatoes',
      ec: '2.42 mS/cm',
      ph: '5.82 pH',
      vpd: '1.18 kPa',
      temp: '24.2°C',
      co2: '1,150 ppm',
      relays: [
        { name: 'RIDGE VENT 1', state: '45% OPEN' },
        { name: 'SHADE SCREEN', state: 'DEPLOYED' },
        { name: 'BOILER VALVE', state: 'CLOSED' },
        { name: 'FERTI-X SKID', state: 'INJECTING' },
      ],
    },
    zone2: {
      name: 'ZONE 02 · POLY BAY B',
      crop: 'Tabletop Strawberries',
      ec: '1.58 mS/cm',
      ph: '5.95 pH',
      vpd: '0.95 kPa',
      temp: '20.8°C',
      co2: '850 ppm',
      relays: [
        { name: 'GABLE FAN 1', state: 'RUNNING' },
        { name: 'MISTING LINE', state: 'PULSING' },
        { name: 'ACID PUMP 1', state: 'IDLE' },
        { name: 'DRAIN VALVE', state: 'MONITORING' },
      ],
    },
    zone3: {
      name: 'ZONE 03 · INDOOR CEA',
      crop: 'Leafy Greens Multi-Tier',
      ec: '1.35 mS/cm',
      ph: '5.85 pH',
      vpd: '1.05 kPa',
      temp: '22.0°C',
      co2: '1,200 ppm',
      relays: [
        { name: 'CHILLED HVAC', state: 'COOLING' },
        { name: 'DEHUMIDIFIER', state: 'ACTIVE' },
        { name: 'CO2 SOLENOID', state: 'INJECTING' },
        { name: 'LED LIGHT RACK', state: '100% 16H' },
      ],
    },
  };

  const current = zoneData[activeZone];

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingTop: '64px',
        paddingBottom: '72px',
        background: 'var(--bg-void)',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        
        {/* Asymmetric Split Layout: Left Narrative / Right Live Machine Console */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left Column: Industrial Authority & Pedigree */}
          <div>
            {/* Decal Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span className="beacon-pulse" />
              <span className="decal-badge" style={{ color: 'var(--color-green)', borderColor: 'rgba(0, 229, 117, 0.4)' }}>
                NZ CEA HERITAGE · 30+ YEARS · 45+ COUNTRIES
              </span>
            </div>

            {/* Display Headline */}
            <h1 
              className="font-display"
              style={{
                fontSize: 'clamp(2.6rem, 5vw, 4.4rem)',
                lineHeight: 1.02,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '0.02em',
                margin: '0 0 20px 0',
              }}
            >
              COMMERCIAL GREENHOUSE <br />
              <span style={{ color: 'var(--color-green)' }}>CLIMATE & FERTIGATION</span> <br />
              AUTOMATION
            </h1>

            {/* Factual Subhead */}
            <p 
              style={{
                fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.65,
                maxWidth: '620px',
                marginBottom: '32px',
              }}
            >
              TrolMaster-grade tactical reliability powered by Autogrow’s 30+ years of New Zealand agricultural engineering. 
              Autonomous multi-bay climate coordination, high-volume inline fertigation (up to 100 m³/hr), and sub-500ms cloud crop steering.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '40px' }}>
              <button
                onClick={() => onNavigateToSection('products')}
                className="btn-machine-primary"
              >
                <Cpu size={16} />
                Explore Controllers & Skids
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigateToSection('phone-scaling')}
                className="btn-machine-secondary"
              >
                <Radio size={16} style={{ color: 'var(--color-cyan)' }} />
                IntelliGrow™ Mobile Studio
              </button>

              <button
                onClick={() => onNavigateToSection('roi-calculator')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  padding: '10px 14px',
                  textTransform: 'uppercase',
                }}
              >
                Economic Model
              </button>
            </div>

            {/* Technical Ticker Strip (No Cards, Pure Hairline Data) */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  32<span style={{ color: 'var(--color-green)' }}>Z</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Zones Per Controller
                </div>
              </div>

              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  100<span style={{ color: 'var(--color-cyan)' }}>m³/h</span>
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  FertiX Inline Flow
                </div>
              </div>

              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  ±0.03
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  EC Repeatability
                </div>
              </div>

              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  IP66
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Harsh CEA Die-Cast
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: MultiGrow Virtual Machine Diagnostic Console */}
          <div 
            className="panel-chassis"
            style={{
              padding: '24px',
              background: 'var(--bg-surface)',
            }}
          >
            {/* Top Console Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Terminal size={14} style={{ color: 'var(--color-green)' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#FFFFFF', fontWeight: 700 }}>
                  MULTIGROW PRO // CONSOLE v1.4.2
                </span>
              </div>
              <span className="decal-badge" style={{ color: 'var(--color-green)' }}>
                ONLINE · LOCAL LOGIC
              </span>
            </div>

            {/* Zone Selector Buttons */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '18px' }}>
              {[
                { id: 'zone1', label: 'Bay 01 Vine' },
                { id: 'zone2', label: 'Bay 02 Berries' },
                { id: 'zone3', label: 'Bay 03 CEA' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveZone(tab.id as any)}
                  style={{
                    flex: 1,
                    padding: '6px 8px',
                    borderRadius: '2px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    border: activeZone === tab.id ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                    background: activeZone === tab.id ? 'rgba(0, 229, 117, 0.12)' : 'var(--bg-void)',
                    color: activeZone === tab.id ? 'var(--color-green)' : 'var(--text-muted)',
                    transition: 'all 0.14s ease',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Active Zone Label */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                Active Compartment
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#FFFFFF', fontFamily: 'var(--font-display)' }}>
                {current.name} · <span style={{ color: 'var(--color-cyan)', fontSize: '13px' }}>{current.crop}</span>
              </div>
            </div>

            {/* 4-Quadrant High-Density Telemetry Readouts */}
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '8px',
                marginBottom: '18px',
              }}
            >
              <div style={{ background: 'var(--bg-void)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Solution EC
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                  {current.ec}
                </div>
              </div>

              <div style={{ background: 'var(--bg-void)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Solution pH
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
                  {current.ph}
                </div>
              </div>

              <div style={{ background: 'var(--bg-void)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Canopy VPD
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  {current.vpd}
                </div>
              </div>

              <div style={{ background: 'var(--bg-void)', padding: '12px', borderRadius: '3px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                  Canopy Temp / CO2
                </div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                  {current.temp} · {current.co2}
                </div>
              </div>
            </div>

            {/* Relay Channels State */}
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
              Relay Channel Status (Solid-State Outputs)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '16px' }}>
              {current.relays.map((r, i) => (
                <div 
                  key={i}
                  style={{
                    background: 'var(--bg-void)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 10px',
                    borderRadius: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>{r.name}</span>
                  <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>{r.state}</span>
                </div>
              ))}
            </div>

            {/* Console Footer */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              <span>WATCHDOG: HW TIMER OK</span>
              <span>GALVANIC ISOLATION: 2.5kV</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};