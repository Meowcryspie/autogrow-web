import React, { useState } from 'react';
import { CROP_SOLUTIONS_DATA } from '../data/mockProducts';
import type { CropSolution } from '../types';
import { Sprout, Cpu } from 'lucide-react';

interface CropSolutionsSectionProps {
  onSelectProductById: (productId: string) => void;
}

export const CropSolutionsSection: React.FC<CropSolutionsSectionProps> = ({ onSelectProductById }) => {
  const [selectedCrop, setSelectedCrop] = useState<CropSolution>(CROP_SOLUTIONS_DATA[0]);

  return (
    <section 
      id="crops"
      style={{
        padding: '96px 0',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: '48px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-green)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Sprout size={14} />
            Plant-Centric Automation
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Crop-Specific Environmental & Dosing Steering
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Every crop species transpires and absorbs nutrients under unique biological curves. 
            Autogrow links canopy VPD to substrate TDR moisture needles to automate vegetative versus generative steering.
          </p>
        </div>

        {/* Crop Selector Tabs (Sharp Industrial Pills) */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '36px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '16px',
          }}
        >
          {CROP_SOLUTIONS_DATA.map((crop) => {
            const isSelected = selectedCrop.id === crop.id;
            return (
              <button
                key={crop.id}
                onClick={() => setSelectedCrop(crop)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  border: isSelected ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                  borderTop: isSelected ? '1px solid var(--color-green)' : '1px solid var(--border-chamfer)',
                  background: isSelected ? 'rgba(0, 229, 117, 0.12)' : 'var(--bg-surface)',
                  color: isSelected ? 'var(--color-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.14s ease',
                }}
              >
                {crop.name}
              </button>
            );
          })}
        </div>

        {/* Active Crop Deep Dive (Asymmetric Split Panel) */}
        <div 
          className="panel-chassis"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            overflow: 'hidden',
          }}
        >
          {/* Left: Agronomic Parameters & Recipe Matrix */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="decal-badge" style={{ color: 'var(--color-green)', borderColor: 'rgba(0, 229, 117, 0.3)' }}>
                  AGRONOMIC PROFILE
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {selectedCrop.scientificGroup}
                </span>
              </div>

              <h3 
                className="font-display" 
                style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px 0' }}
              >
                {selectedCrop.name}
              </h3>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
                {selectedCrop.description}
              </p>

              {/* Technical Target Parameters Matrix */}
              <div 
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  padding: '16px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Target Canopy VPD
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetVPD}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Target Dosing EC
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetEC}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Solution pH Band
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetPH}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    Daily Dryback Target
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetDryback}
                  </div>
                </div>
              </div>

              {/* Irrigation Strategy Readout */}
              <div style={{ marginBottom: '24px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <span style={{ color: 'var(--color-green)', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '11px', textTransform: 'uppercase' }}>
                  Irrigation Strategy:
                </span>{' '}
                {selectedCrop.irrigationStrategy}
              </div>
            </div>

            {/* Recommended Hardware Stack */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Recommended Autogrow Hardware Package:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCrop.recommendedHardware.map((hw, idx) => (
                  <button 
                    key={idx}
                    onClick={() => onSelectProductById(hw.includes('MGC-Pro') ? 'multigrow-master' : hw.includes('SGF-100') || hw.includes('FertiX') ? 'satugrow-fertix-skid' : hw.includes('SGP-1') ? 'satugrow-pro' : hw.includes('IDC-4') ? 'intellidose-pro' : hw.includes('ICC-2') ? 'intelliclimate-icc2' : 'multigrow-master')}
                    className="decal-badge"
                    style={{ background: 'rgba(255, 255, 255, 0.05)', color: '#FFFFFF', cursor: 'pointer' }}
                  >
                    <Cpu size={12} style={{ color: 'var(--color-green)' }} />
                    {hw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Crop Visual with Interactive 24-Hr Dryback Curve */}
          <div 
            style={{
              position: 'relative',
              minHeight: '420px',
              borderLeft: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg-void)',
            }}
          >
            {/* Top Crop Photo Banner */}
            <div style={{ position: 'relative', height: '210px', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
              <img 
                src={selectedCrop.image} 
                alt={selectedCrop.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7) contrast(1.2)',
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.1) 0%, rgba(7, 11, 8, 0.9) 100%)',
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '16px',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                <span className="decal-badge" style={{ color: 'var(--color-green)' }}>
                  RECIPE VALIDATED
                </span>
                <span className="decal-badge" style={{ color: '#FFFFFF' }}>
                  {selectedCrop.targetDryback}
                </span>
              </div>
            </div>

            {/* Bottom 24-Hour Transpiration & Dryback SVG Instrument Chart */}
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
                    24-Hour Generative Crop Steering Curve (VWC% & Dryback)
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
                    FARMROAD™ TELEMETRY
                  </span>
                </div>

                {/* SVG Curve */}
                <div style={{ width: '100%', height: '90px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '2px', padding: '6px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="curveFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#00E575" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#00E575" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Grid lines */}
                    <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
                    
                    {/* Irrigation pulse bars */}
                    <line x1="75" y1="80" x2="75" y2="25" stroke="#00C8FF" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="95" y1="80" x2="95" y2="20" stroke="#00C8FF" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="115" y1="80" x2="115" y2="20" stroke="#00C8FF" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="135" y1="80" x2="135" y2="22" stroke="#00C8FF" strokeWidth="2" strokeDasharray="2 2" />

                    {/* VWC Curve Path */}
                    <path 
                      d="M 0 52 Q 40 54 75 25 L 95 20 L 115 20 L 135 22 Q 180 32 230 45 Q 270 52 300 56" 
                      fill="none" 
                      stroke="#00E575" 
                      strokeWidth="2.2" 
                    />
                    <path 
                      d="M 0 52 Q 40 54 75 25 L 95 20 L 115 20 L 135 22 Q 180 32 230 45 Q 270 52 300 56 L 300 80 L 0 80 Z" 
                      fill="url(#curveFill)" 
                    />
                  </svg>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  <span>00:00 (NIGHT)</span>
                  <span>06:00 (PULSE START)</span>
                  <span>12:00 (MAX TRANSPIRATION)</span>
                  <span>18:00 (DRYBACK)</span>
                  <span>24:00</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Calculated Dryback Rate:</span>
                <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>{selectedCrop.targetDryback.split(' ')[0]} / CYCLE</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};