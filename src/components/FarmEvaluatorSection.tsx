import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Activity, 
  Droplet, 
  Thermometer, 
  ArrowRight, 
  FileText,
  Calculator,
  MessageCircle,
  TrendingUp
} from 'lucide-react';

interface FarmEvaluatorSectionProps {
  onOpenQuoteWithPackage?: (items: { name: string; modelCode: string; quantity: number; price: number; category: string }[], farmDetails: { facilityType: string; area: string; crop: string }) => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const FarmEvaluatorSection: React.FC<FarmEvaluatorSectionProps> = ({ 
  onOpenQuoteWithPackage,
  onNavigateToSection
}) => {
  // Configurator State
  const [facilityType, setFacilityType] = useState<'poly' | 'glasshouse' | 'indoor' | 'shade'>('glasshouse');
  const [farmScale, setFarmScale] = useState<'boutique' | 'standard' | 'enterprise' | 'industrial'>('standard');
  const [cropType, setCropType] = useState<'vine' | 'greens' | 'berries' | 'medicinal'>('vine');
  const [automationPriority, setAutomationPriority] = useState<'fertigation' | 'climate' | 'moisture' | 'turnkey'>('turnkey');

  // Facility Options
  const facilityOptions = [
    { id: 'poly', label: 'Poly-Tunnel / Gothic Arch', desc: 'Single or multi-span film greenhouse' },
    { id: 'glasshouse', label: 'Venlo Glasshouse', desc: 'Commercial double-glazed structural glass' },
    { id: 'indoor', label: 'Indoor CEA / Vertical', desc: 'Insulated warehouse with multi-tier LEDs' },
    { id: 'shade', label: 'Shade / Net House', desc: 'Protected canopy for warm climates' },
  ];

  // Scale Options
  const scaleOptions = [
    { id: 'boutique', label: '< 1,000 m²', sub: '< 0.25 Acre', areaText: '750 m²' },
    { id: 'standard', label: '1,000 – 5,000 m²', sub: '0.25 – 1.25 Acres', areaText: '2,500 m² (~0.6 Acre)' },
    { id: 'enterprise', label: '5,000 – 20,000 m²', sub: '1.25 – 5.0 Acres', areaText: '10,000 m² (~2.5 Acres)' },
    { id: 'industrial', label: '20,000+ m²', sub: '5.0+ Hectares', areaText: '30,000 m² (3.0 Hectares)' },
  ];

  // Crop Options
  const cropOptions = [
    { id: 'vine', label: 'Vine Crops', desc: 'Tomatoes, Cucumbers, Capsicums (Substrate slabs)' },
    { id: 'greens', label: 'Leafy Greens & Herbs', desc: 'Hydroponic NFT / DFT troughs' },
    { id: 'berries', label: 'Soft Berries', desc: 'Strawberries, Blueberries in coir bags' },
    { id: 'medicinal', label: 'Medicinal Crops', desc: 'Strict VPD, microclimate & sterile fertigation' },
  ];

  // Priorities
  const priorityOptions = [
    { id: 'turnkey', label: 'Complete Turnkey Automation', icon: Cpu, desc: 'Fertigation + Multi-zone climate + Weather station' },
    { id: 'fertigation', label: 'Precision Fertigation & Dosing', icon: Droplet, desc: 'A/B/Acid injection, dual EC & pH closed-loop' },
    { id: 'climate', label: 'Climate & Ridge Venting', icon: Thermometer, desc: 'Ridge vents, curtains, pad-and-fan, VPD tracking' },
    { id: 'moisture', label: 'Root-Zone Moisture Tracking', icon: Activity, desc: 'TDR probes, volumetric water content % & runoff' },
  ];

  // Dynamic Sizing Calculations
  const getRecommendation = () => {
    let sensorCount = 4;
    let valveCount = 4;
    let estimatedSavings = '28%';
    let laborSaved = '14 hrs/wk';

    if (farmScale === 'boutique') {
      sensorCount = 2;
      valveCount = 2;
      estimatedSavings = '22%';
      laborSaved = '8 hrs/wk';
    } else if (farmScale === 'standard') {
      sensorCount = 4;
      valveCount = 4;
      estimatedSavings = '29%';
      laborSaved = '16 hrs/wk';
    } else if (farmScale === 'enterprise') {
      sensorCount = 8;
      valveCount = 8;
      estimatedSavings = '34%';
      laborSaved = '26 hrs/wk';
    } else if (farmScale === 'industrial') {
      sensorCount = 16;
      valveCount = 16;
      estimatedSavings = '38%';
      laborSaved = '45 hrs/wk';
    }

    return {
      coreController: 'MultiGrow™ Pro Master IoT Controller (Auckland Edition)',
      coreModel: 'MG-PRO-NZ2026',
      corePrice: 4850,
      sensorCount,
      valveCount,
      estimatedSavings,
      laborSaved,
      peripherals: [
        { name: `Autogrow Dual EC & pH Industrial Probe Rig`, model: 'PR-IND-ECPH', qty: 1, price: 680, category: 'parts' },
        { name: `IntelliDose Precision Solenoid Injection Valve Bank (${valveCount}-Channel)`, model: `ID-SOL-${valveCount}CH`, qty: 1, price: valveCount * 220, category: 'hardware' },
        { name: `Substrate TDR Volumetric Water Content (VWC%) Probes`, model: 'TDR-SOIL-10M', qty: sensorCount, price: sensorCount * 195, category: 'parts' },
        { name: `Aspirated Digital Temperature, RH & VPD Sensor Pod`, model: 'SEN-VPD-ASP', qty: farmScale === 'industrial' ? 4 : farmScale === 'enterprise' ? 2 : 1, price: (farmScale === 'industrial' ? 4 : farmScale === 'enterprise' ? 2 : 1) * 420, category: 'hardware' },
        { name: `Meteorological Solar Radiation Pyranometer & Mast`, model: 'MET-PYR-300', qty: 1, price: 950, category: 'hardware' }
      ]
    };
  };

  const rec = getRecommendation();
  const currentScaleObj = scaleOptions.find(s => s.id === farmScale) || scaleOptions[1];
  const currentCropObj = cropOptions.find(c => c.id === cropType) || cropOptions[0];
  const currentFacilityObj = facilityOptions.find(f => f.id === facilityType) || facilityOptions[1];

  const handlePackageToQuote = () => {
    const items = [
      { name: rec.coreController, modelCode: rec.coreModel, quantity: 1, price: rec.corePrice, category: 'controllers' },
      ...rec.peripherals.map(p => ({
        name: p.name,
        modelCode: p.model,
        quantity: p.qty,
        price: p.price,
        category: p.category
      }))
    ];

    if (onOpenQuoteWithPackage) {
      onOpenQuoteWithPackage(items, {
        facilityType: currentFacilityObj.label,
        area: currentScaleObj.areaText,
        crop: currentCropObj.label
      });
    } else if (onNavigateToSection) {
      onNavigateToSection('store');
    }
  };

  return (
    <section 
      id="farm-evaluator" 
      style={{ 
        backgroundColor: '#F8FAFC', 
        borderTop: '1px solid #E2E8F0', 
        borderBottom: '1px solid #E2E8F0',
        padding: '80px 0' 
      }}
    >
      <div className="container">
        
        {/* Header Badge & Title */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 48px auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '6px 14px', borderRadius: '999px', color: '#065F46', fontSize: '12px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px' }}>
            <Calculator size={14} style={{ color: '#059669' }} />
            <span>Commercial CEA Sizing Configurator</span>
          </div>

          <h2 style={{ fontSize: '34px', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: '0 0 16px 0', lineHeight: 1.2 }}>
            Farm Evaluation: IoT System Recommendation
          </h2>

          <p style={{ fontSize: '16px', color: '#64748B', lineHeight: 1.6, margin: 0 }}>
            Every greenhouse has unique hydraulic, electrical, and crop transpiration demands. Select your farm parameters below to calculate exact controller specifications, peripheral sensor density, and direct Request-for-Quote (RFQ) sizing.
          </p>
        </div>

        {/* 2-Column Split: Interactive Inputs Left vs Technical Sizing Output Right */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px', alignItems: 'start' }}>
          
          {/* LEFT: Step-by-Step Inputs */}
          <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            
            {/* Step 1: Facility Type */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Greenhouse / Facility Architecture
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {facilityOptions.map(opt => {
                  const active = facilityType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFacilityType(opt.id as any)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: active ? '2px solid #16A34A' : '1px solid #CBD5E1',
                        backgroundColor: active ? '#F0FDF4' : '#FFFFFF',
                        color: active ? '#166534' : '#334155',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Growing Area */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Total Production Footprint (Area)
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {scaleOptions.map(opt => {
                  const active = farmScale === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFarmScale(opt.id as any)}
                      style={{
                        padding: '12px 8px',
                        borderRadius: '10px',
                        border: active ? '2px solid #16A34A' : '1px solid #CBD5E1',
                        backgroundColor: active ? '#F0FDF4' : '#FFFFFF',
                        color: active ? '#166534' : '#334155',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '12.5px', fontWeight: 800 }}>{opt.label}</div>
                      <div style={{ fontSize: '10.5px', color: '#64748B', marginTop: '2px' }}>{opt.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Crop Type */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Target Crop Cultivation
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {cropOptions.map(opt => {
                  const active = cropType === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setCropType(opt.id as any)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: active ? '2px solid #16A34A' : '1px solid #CBD5E1',
                        backgroundColor: active ? '#F0FDF4' : '#FFFFFF',
                        color: active ? '#166534' : '#334155',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ fontSize: '13px', fontWeight: 700 }}>{opt.label}</div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', lineHeight: 1.3 }}>{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Primary Automation Need */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0F172A', color: '#FFFFFF', fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</span>
                <label style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Automation Scope & Expansion Priority
                </label>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                {priorityOptions.map(opt => {
                  const active = automationPriority === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAutomationPriority(opt.id as any)}
                      style={{
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: active ? '2px solid #16A34A' : '1px solid #CBD5E1',
                        backgroundColor: active ? '#F0FDF4' : '#FFFFFF',
                        color: active ? '#166534' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Icon size={18} style={{ color: active ? '#16A34A' : '#64748B', flexShrink: 0 }} />
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '13px', fontWeight: 700 }}>{opt.label}</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>{opt.desc}</div>
                        </div>
                      </div>
                      <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: active ? '5px solid #16A34A' : '2px solid #CBD5E1', flexShrink: 0 }} />
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* RIGHT: Technical Sizing Card & Direct RFQ Action */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* The Recommended Hardware Box */}
            <div 
              style={{ 
                backgroundColor: '#0F172A', 
                color: '#FFFFFF', 
                borderRadius: '16px', 
                padding: '28px',
                border: '1px solid #1E293B',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #1E293B', paddingBottom: '14px' }}>
                <div>
                  <span style={{ fontSize: '10.5px', color: '#4ADE80', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    ENGINEERING RECOMMENDATION
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    MultiGrow™ Pro IoT Master Unit
                  </div>
                </div>
                <div style={{ backgroundColor: '#1E293B', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', color: '#94A3B8' }}>
                  {rec.coreModel}
                </div>
              </div>

              {/* Sizing Breakdown Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                
                <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#F1F5F9' }}>Core IoT Brain Unit</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>1x MultiGrow™ Dual-CPU 32-bit controller, 4G/LAN</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4ADE80' }}>1 Unit</span>
                </div>

                <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#F1F5F9' }}>Dosing & Solenoid Bank</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>IntelliDose {rec.valveCount}-Channel Dosing Channels</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4ADE80' }}>{rec.valveCount} Channels</span>
                </div>

                <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#F1F5F9' }}>Root-Zone Moisture Density</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>High-precision TDR substrate probes (10m cable)</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4ADE80' }}>{rec.sensorCount} Probes</span>
                </div>

                <div style={{ backgroundColor: '#1E293B', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#F1F5F9' }}>Weather & Pyranometer Mast</div>
                    <div style={{ fontSize: '11px', color: '#94A3B8' }}>Solar light accumulation tracking sensor</div>
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#4ADE80' }}>1 Station</span>
                </div>

              </div>

              {/* Projected Farm Impact (ROI Metric Cards) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '22px' }}>
                <div style={{ backgroundColor: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.25)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#86EFAC', fontWeight: 700 }}>Fertilizer & Water Efficiency</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    +{rec.estimatedSavings}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Through closed-loop EC runoff control</div>
                </div>

                <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.25)', borderRadius: '8px', padding: '10px' }}>
                  <div style={{ fontSize: '11px', color: '#7DD3FC', fontWeight: 700 }}>Labor Hours Saved</div>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#FFFFFF', marginTop: '2px' }}>
                    {rec.laborSaved}
                  </div>
                  <div style={{ fontSize: '10px', color: '#94A3B8' }}>Automated dosing & vent adjustments</div>
                </div>
              </div>

              {/* CTA Action: Add to Quote Basket */}
              <button
                type="button"
                onClick={handlePackageToQuote}
                style={{
                  width: '100%',
                  padding: '14px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(22, 163, 74, 0.35)',
                  transition: 'background-color 0.15s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#15803D')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#16A34A')}
              >
                <FileText size={16} />
                <span>Add Recommended System to Quote (RFQ)</span>
                <ArrowRight size={16} />
              </button>

              <div style={{ fontSize: '11px', color: '#94A3B8', textAlign: 'center', marginTop: '10px' }}>
                Commercial equipment requires Auckland electrical engineering review. No instant payment required.
              </div>
            </div>

            {/* Quick Regional Contact Card (Milesight / Seeed Studio Benchmark) */}
            <div 
              style={{ 
                backgroundColor: '#FFFFFF', 
                border: '1px solid #E2E8F0', 
                borderRadius: '14px', 
                padding: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                  Need Custom Farm Engineering Consultation?
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                  Regional support for New Zealand, Australia, Malaysia & Southeast Asian CEA facilities.
                </div>
              </div>

              <a
                href="https://wa.me/6498523088"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#25D366',
                  color: '#FFFFFF',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  flexShrink: 0
                }}
              >
                <MessageCircle size={15} />
                <span>WhatsApp RFQ</span>
              </a>
            </div>

          </div>

        </div>

        {/* ============================================================================== */}
        {/* HOW IT WORKS ARCHITECTURE DIAGRAM (NETAFIM GROMSPHERE BENCHMARK) */}
        {/* ============================================================================== */}
        <div style={{ marginTop: '64px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '36px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              HOW IT WORKS · THE 4-TIER AUTONOMOUS PIPELINE
            </span>
            <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: '4px 0 6px 0' }}>
              From Root-Zone Sensing to Cloud Crop Forecasting
            </h3>
            <p style={{ fontSize: '13.5px', color: '#64748B', margin: 0 }}>
              Physical industrial controllers handle real-time fail-safe dosing locally, while encrypted telemetry continuously syncs to your desktop and phone.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', position: 'relative' }}>
            
            {/* Tier 1: Field Sensors */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#DCFCE7', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Activity size={20} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#16A34A', textTransform: 'uppercase', marginBottom: '4px' }}>Stage 01</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Field & Canopy Sensors</div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                EC, pH, Substrate TDR VWC%, Solar Pyranometer & Aspirated VPD screens take continuous millivolt readings.
              </p>
            </div>

            {/* Tier 2: MultiGrow Controller (Edge IoT) */}
            <div style={{ backgroundColor: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#16A34A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Cpu size={20} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', marginBottom: '4px' }}>Stage 02</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#14532D', marginBottom: '6px' }}>MultiGrow™ IoT Controller</div>
              <p style={{ fontSize: '11.5px', color: '#166534', margin: 0, lineHeight: 1.4 }}>
                Dual 32-bit Cortex processor executes PID dosing algorithms locally. Operates 24/7 without internet dependency.
              </p>
            </div>

            {/* Tier 3: FarmRoad Cloud */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <Layers size={20} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '4px' }}>Stage 03</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>FarmRoad™ Cloud Platform</div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Encrypted 4G / Ethernet telemetry uploads batch curves, solar radiation accumulation, and yield logs.
              </p>
            </div>

            {/* Tier 4: Grower Command Center */}
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                <TrendingUp size={20} />
              </div>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#D97706', textTransform: 'uppercase', marginBottom: '4px' }}>Stage 04</div>
              <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', marginBottom: '6px' }}>Desktop & Mobile App</div>
              <p style={{ fontSize: '11.5px', color: '#64748B', margin: 0, lineHeight: 1.4 }}>
                Real-time greenhouse dashboard, push notifications, target setpoint overrides, and multi-farm oversight.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
