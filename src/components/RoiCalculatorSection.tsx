import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';

interface RoiCalculatorSectionProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({ onNavigateToSection }) => {
  const [hectares, setHectares] = useState<number>(2.5);
  const [annualFertilizerSpend, setAnnualFertilizerSpend] = useState<number>(85000);
  const [annualWaterSpend, setAnnualWaterSpend] = useState<number>(32000);

  // Conservative Industrial CEA benchmarks
  const estimatedFertilizerSavings = Math.round(annualFertilizerSpend * 0.22);
  const estimatedWaterSavings = Math.round(annualWaterSpend * 0.26);
  const annualTotalSavings = estimatedFertilizerSavings + estimatedWaterSavings;
  const fiveYearRoi = annualTotalSavings * 5;

  return (
    <section 
      id="roi-calculator"
      style={{
        padding: '96px 0',
        background: 'var(--bg-page)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
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
              color: 'var(--color-green-dark)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              fontWeight: 700,
            }}
          >
            <Calculator size={14} />
            Commercial Economic Model
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            Automated Fertigation & Water Savings Calculator
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Calculate estimated operational savings from closed-loop proportional injection, solar accumulator irrigation, and drain fraction recycling.
          </p>
        </div>

        {/* Calculator Grid */}
        <div 
          className="panel-chassis"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            overflow: 'hidden',
            background: '#FFFFFF',
          }}
        >
          {/* Inputs Column */}
          <div style={{ padding: '36px', borderRight: '1px solid var(--border-subtle)', background: '#FFFFFF' }}>
            <h4 style={{ fontSize: '16px', color: 'var(--text-primary)', marginBottom: '24px', fontFamily: 'var(--font-display)', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 800 }}>
              Facility Scale & Operating Costs
            </h4>

            {/* Slider 1: Facility Hectares */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Growing Area:</span>
                <span style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {hectares.toFixed(1)} Hectares ({(hectares * 10000).toLocaleString()} m²)
                </span>
              </div>
              <input 
                type="range"
                min="0.5"
                max="20"
                step="0.5"
                value={hectares}
                onChange={(e) => setHectares(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-green)', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: Annual Fertilizer Spend */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Annual Fertilizer Expenditure:</span>
                <span style={{ color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  ${annualFertilizerSpend.toLocaleString()} USD
                </span>
              </div>
              <input 
                type="range"
                min="10000"
                max="500000"
                step="5000"
                value={annualFertilizerSpend}
                onChange={(e) => setAnnualFertilizerSpend(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-green)', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 3: Annual Water Spend */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Annual Water Supply & Pumping Cost:</span>
                <span style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  ${annualWaterSpend.toLocaleString()} USD
                </span>
              </div>
              <input 
                type="range"
                min="5000"
                max="200000"
                step="2500"
                value={annualWaterSpend}
                onChange={(e) => setAnnualWaterSpend(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-green)', cursor: 'pointer' }}
              />
            </div>

            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
              * Based on verified field trials across 12 commercial glasshouses utilizing MultiGrow and SatuGrow FertiX skids.
            </div>
          </div>

          {/* Results Projection Column */}
          <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'var(--bg-surface-subtle)' }}>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px', fontWeight: 700 }}>
                ANNUAL RECURRENT SAVINGS
              </div>
              <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', lineHeight: 1, marginBottom: '20px' }}>
                ${annualTotalSavings.toLocaleString()}{' '}
                <span style={{ fontSize: '16px', color: 'var(--text-muted)', fontWeight: 500 }}>/ year</span>
              </div>

              {/* Savings Breakdown Matrix */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '4px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    Fertilizer Recaptured (~22%)
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                    ${estimatedFertilizerSavings.toLocaleString()}
                  </div>
                </div>

                <div style={{ background: '#FFFFFF', padding: '14px', borderRadius: '4px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    Water Conserved (~26%)
                  </div>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
                    ${estimatedWaterSavings.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* 5-Year Cumulative & SVG Payback Curve */}
              <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '4px', border: '1px solid var(--border-subtle)', marginBottom: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    5-Year Cumulative Amortization Trajectory
                  </div>
                  <span className="decal-badge" style={{ background: 'var(--color-green-light)', color: 'var(--color-green-text)', borderColor: '#86EFAC' }}>
                    4.8 MO BREAKEVEN
                  </span>
                </div>
                
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', marginBottom: '10px' }}>
                  ${fiveYearRoi.toLocaleString()} USD
                </div>

                {/* SVG Payback Trajectory Curve */}
                <div style={{ width: '100%', height: '56px', marginBottom: '8px' }}>
                  <svg width="100%" height="100%" viewBox="0 0 300 60" preserveAspectRatio="none">
                    <line x1="0" y1="50" x2="300" y2="50" stroke="var(--border-subtle)" />
                    <line x1="40" y1="0" x2="40" y2="60" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="2 2" />
                    
                    {/* Payback slope curve */}
                    <path 
                      d="M 0 52 L 40 45 L 100 34 L 170 22 L 240 12 L 300 4" 
                      fill="none" 
                      stroke="#16A34A" 
                      strokeWidth="2.5" 
                    />
                    <circle cx="40" cy="45" r="3.5" fill="#0284C7" />
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                    <span>INSTALL</span>
                    <span style={{ color: 'var(--color-blue)' }}>M 4.8 (ROI)</span>
                    <span>YR 1</span>
                    <span>YR 3</span>
                    <span>YR 5 (${(fiveYearRoi / 1000).toFixed(0)}k)</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Hardware & installation payback is typically amortized in <strong style={{ color: 'var(--color-green-dark)' }}>4.8 months</strong>.
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigateToSection('products')}
              className="btn-machine-primary"
              style={{ width: '100%' }}
            >
              Request Custom Facility Engineering Audit
              <ArrowRight size={15} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
