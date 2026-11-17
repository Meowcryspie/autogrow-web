import React from 'react';
import { SOLUTIONS_DATA } from '../data/mockProducts';
import { CheckCircle2, Building2, ArrowRight } from 'lucide-react';

interface CommercialSolutionsSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const CommercialSolutionsSection: React.FC<CommercialSolutionsSectionProps> = ({ onNavigateToSection }) => {
  return (
    <section 
      id="solutions" 
      style={{
        padding: '96px 0',
        background: 'var(--bg-void)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '40px' }}>
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
            <Building2 size={14} />
            Commercial Protected Cropping
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Turnkey Facility Automation Packages
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Tailored engineering architectures for commercial Venlo glasshouse acreage, indoor multi-tier vertical cleanrooms, and high-volume inline fertigation centers.
          </p>
        </div>

        {/* Solutions Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {SOLUTIONS_DATA.map((solution, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div 
                key={solution.id}
                className="panel-chassis"
                style={{
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                  alignItems: 'center',
                }}
              >
                {/* Solution Image Column */}
                <div 
                  style={{
                    order: isReversed ? 2 : 1,
                    position: 'relative',
                    height: '100%',
                    minHeight: '340px',
                    overflow: 'hidden',
                  }}
                >
                  <img 
                    src={solution.image} 
                    alt={solution.title}
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
                      background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.1) 0%, rgba(7, 11, 8, 0.8) 100%)',
                    }}
                  />
                </div>

                {/* Solution Text & Metrics Column */}
                <div 
                  style={{
                    order: isReversed ? 1 : 2,
                    padding: '36px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <div 
                    style={{
                      fontSize: '11px',
                      color: 'var(--color-green)',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}
                  >
                    {solution.subtitle}
                  </div>

                  <h3 
                    className="font-display"
                    style={{
                      fontSize: '26px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '12px',
                    }}
                  >
                    {solution.title}
                  </h3>

                  <p 
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {solution.description}
                  </p>

                  {/* Metrics Row (Hairline Spec Matrix) */}
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '10px',
                      padding: '14px',
                      background: 'var(--bg-void)',
                      borderRadius: '3px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '20px',
                    }}
                  >
                    {solution.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Checkmarks */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px', marginBottom: '24px' }}>
                    {solution.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={14} style={{ color: 'var(--color-cyan)', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div>
                    <button
                      onClick={() => onNavigateToSection('products')}
                      className="btn-machine-secondary"
                      style={{ padding: '8px 18px', fontSize: '12px' }}
                    >
                      View Engineered Package
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};