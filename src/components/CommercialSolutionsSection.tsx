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
        padding: '100px 0',
        background: 'var(--bg-main)',
        position: 'relative',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
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
              marginBottom: '12px',
            }}
          >
            <Building2 size={14} />
            Commercial Deployments
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.02em',
              margin: '0 0 16px 0',
            }}
          >
            Commercial CEA Solutions
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Tailored engineering architectures for commercial glasshouses, indoor vertical multi-tier farms, and precision fertigation blending centers.
          </p>
        </div>

        {/* Solutions Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {SOLUTIONS_DATA.map((solution, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div 
                key={solution.id}
                className="card-tactical"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                      filter: 'brightness(0.85) contrast(1.1)',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 10, 8, 0.2) 0%, rgba(6, 10, 8, 0.8) 100%)',
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
                    style={{
                      fontSize: '26px',
                      fontWeight: 800,
                      color: '#ffffff',
                      marginBottom: '14px',
                      fontFamily: 'var(--font-display)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {solution.title}
                  </h3>
                  <p 
                    style={{
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '24px',
                    }}
                  >
                    {solution.description}
                  </p>

                  {/* Metrics Row */}
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(3, 1fr)',
                      gap: '12px',
                      padding: '16px',
                      background: 'rgba(0, 0, 0, 0.35)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      marginBottom: '24px',
                    }}
                  >
                    {solution.metrics.map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                          {metric.value}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Checkmarks */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '24px' }}>
                    {solution.features.map((feat, fIdx) => (
                      <div key={fIdx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--color-cyan)', flexShrink: 0 }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA button */}
                  <div>
                    <button
                      onClick={() => onNavigateToSection('products')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'transparent',
                        border: '1px solid rgba(0, 255, 136, 0.4)',
                        color: 'var(--color-green)',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 255, 136, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      View Engineered Systems
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