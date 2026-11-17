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

          {/* Right: Technical Crop Visual with Crosshair Framing */}
          <div 
            style={{
              position: 'relative',
              minHeight: '360px',
              borderLeft: '1px solid var(--border-subtle)',
              overflow: 'hidden',
            }}
          >
            <img 
              src={selectedCrop.image} 
              alt={selectedCrop.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.75) contrast(1.15)',
              }}
            />
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.1) 0%, rgba(7, 11, 8, 0.85) 100%)',
              }}
            />

            {/* Tactical Decal Stamp in Corner */}
            <div 
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                background: 'rgba(7, 11, 8, 0.92)',
                border: '1px solid var(--border-medium)',
                borderRadius: '3px',
                padding: '10px 14px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
              }}
            >
              <div style={{ color: 'var(--text-muted)', fontSize: '9px', textTransform: 'uppercase' }}>
                VALIDATED HORTICULTURAL PROTOCOL
              </div>
              <div style={{ color: 'var(--color-green)', fontWeight: 700 }}>
                NZ CEA VERIFIED RECIPE #408
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};