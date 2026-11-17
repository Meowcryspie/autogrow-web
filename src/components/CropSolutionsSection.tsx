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
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '840px', marginBottom: '44px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11.5px',
              color: 'var(--color-green-dark)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              fontWeight: 700,
            }}
          >
            <Sprout size={15} color="var(--color-green)" />
            Commercial Crop Steering Profiles
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            Tailored Environmental & Dosing Formulas
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Every crop transpires and absorbs nutrition differently across seasonal daylight cycles. 
            Autogrow links canopy VPD to substrate TDR sensors to automate vegetative growth and fruit loading.
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
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
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: isSelected ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                  background: isSelected ? 'var(--color-green-light)' : '#FFFFFF',
                  color: isSelected ? 'var(--color-green-text)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 1px 3px rgba(22, 163, 74, 0.2)' : 'var(--shadow-sm)',
                  transition: 'all 0.15s ease',
                }}
              >
                {crop.name}
              </button>
            );
          })}
        </div>

        {/* Active Crop Split Panel */}
        <div 
          className="panel-chassis"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          {/* Left: Agronomic Parameters & Recipe Matrix */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="decal-badge" style={{ background: 'var(--color-green-light)', color: 'var(--color-green-text)', borderColor: '#B7E4C7' }}>
                  COMMERCIAL CROP PROFILE
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedCrop.scientificGroup}
                </span>
              </div>

              <h3 
                className="font-display" 
                style={{ fontSize: '26px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px 0' }}
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
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
                  padding: '16px',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Target Canopy VPD
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetVPD}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Target Dosing EC
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetEC}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Solution pH Band
                  </div>
                  <div style={{ fontSize: '17px', fontWeight: 800, color: 'var(--color-blue)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetPH}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Daily Dryback Target
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                    {selectedCrop.targetDryback}
                  </div>
                </div>
              </div>

              {/* Irrigation Strategy Readout */}
              <div style={{ marginBottom: '24px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--color-green-dark)' }}>
                  Irrigation Strategy:
                </strong>{' '}
                {selectedCrop.irrigationStrategy}
              </div>
            </div>

            {/* Recommended Hardware Stack */}
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, marginBottom: '8px' }}>
                Recommended Equipment Stack:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedCrop.recommendedHardware.map((hw, idx) => (
                  <button 
                    key={idx}
                    onClick={() => onSelectProductById(hw.includes('MGC-Pro') ? 'multigrow-master' : hw.includes('SGF-100') || hw.includes('FertiX') ? 'satugrow-fertix-skid' : hw.includes('SGP-1') ? 'satugrow-pro' : hw.includes('IDC-4') ? 'intellidose-pro' : hw.includes('ICC-2') ? 'intelliclimate-icc2' : 'multigrow-master')}
                    className="decal-badge"
                    style={{ background: '#FFFFFF', color: 'var(--text-primary)', cursor: 'pointer', border: '1px solid var(--border-medium)', padding: '5px 10px' }}
                  >
                    <Cpu size={13} color="var(--color-green-dark)" />
                    {hw}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Crop Visual with 24-Hr Crop Steering Curve */}
          <div 
            style={{
              position: 'relative',
              minHeight: '420px',
              borderLeft: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              background: '#FFFFFF',
            }}
          >
            {/* Top Crop Photo Banner */}
            <div style={{ position: 'relative', height: '220px', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
              <img 
                src={selectedCrop.image} 
                alt={selectedCrop.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'contrast(1.05)',
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 40%, rgba(0, 0, 0, 0.65) 100%)',
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
                <span className="decal-badge" style={{ background: '#FFFFFF', color: 'var(--color-green-dark)', fontWeight: 800 }}>
                  RECIPE VERIFIED
                </span>
                <span className="decal-badge" style={{ background: '#FFFFFF', color: 'var(--text-primary)' }}>
                  {selectedCrop.targetDryback}
                </span>
              </div>
            </div>

            {/* Bottom 24-Hour Transpiration & Dryback Clean SVG Curve */}
            <div style={{ padding: '22px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-surface-subtle)' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                    24-Hour Substrate Moisture & Dryback Trajectory
                  </span>
                  <span style={{ fontSize: '10.5px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    FARMLINK™ TELEMETRY
                  </span>
                </div>

                {/* SVG Curve on White Surface */}
                <div style={{ width: '100%', height: '95px', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '8px', boxShadow: 'var(--shadow-sm)' }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 80" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="daylightCurveFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#16A34A" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#16A34A" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <line x1="0" y1="20" x2="300" y2="20" stroke="#E2E8E1" strokeDasharray="3 3" />
                    <line x1="0" y1="50" x2="300" y2="50" stroke="#E2E8E1" strokeDasharray="3 3" />
                    
                    {/* Irrigation Shots */}
                    <line x1="75" y1="80" x2="75" y2="25" stroke="#0284C7" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="95" y1="80" x2="95" y2="20" stroke="#0284C7" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="115" y1="80" x2="115" y2="20" stroke="#0284C7" strokeWidth="2" strokeDasharray="2 2" />
                    <line x1="135" y1="80" x2="135" y2="22" stroke="#0284C7" strokeWidth="2" strokeDasharray="2 2" />

                    {/* VWC Curve Path */}
                    <path 
                      d="M 0 52 Q 40 54 75 25 L 95 20 L 115 20 L 135 22 Q 180 32 230 45 Q 270 52 300 56" 
                      fill="none" 
                      stroke="#16A34A" 
                      strokeWidth="2.5" 
                    />
                    <path 
                      d="M 0 52 Q 40 54 75 25 L 95 20 L 115 20 L 135 22 Q 180 32 230 45 Q 270 52 300 56 L 300 80 L 0 80 Z" 
                      fill="url(#daylightCurveFill)" 
                    />
                  </svg>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                  <span>00:00 (NIGHT)</span>
                  <span style={{ color: 'var(--color-blue)' }}>06:00 (IRRIGATION PULSE)</span>
                  <span>12:00 (PEAK LIGHT)</span>
                  <span>18:00 (DRYBACK)</span>
                  <span>24:00</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px', fontSize: '11.5px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Target Crop Steer:</span>
                <strong style={{ color: 'var(--color-green-dark)' }}>{selectedCrop.targetDryback.split(' ')[0]} Generative Slope</strong>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};