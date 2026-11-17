import React, { useState } from 'react';
import { 
  Smartphone, 
  RotateCcw, 
  Wifi, 
  Battery, 
  Signal, 
  Droplet, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity, 
  Play,
  Layers,
  Settings,
  Bell
} from 'lucide-react';

interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceLabel: string;
}

export const AppDownloadSection: React.FC = () => {
  const presets: ViewportPreset[] = [
    { id: 'compact', name: 'Compact', width: 340, height: 680, deviceLabel: '340 × 680 · SE / Pocket' },
    { id: 'standard', name: 'Standard', width: 380, height: 760, deviceLabel: '380 × 760 · iPhone / Pixel' },
    { id: 'promax', name: 'Pro Max', width: 420, height: 820, deviceLabel: '420 × 820 · Pro Max / Ultra' },
  ];

  const [activePreset, setActivePreset] = useState<ViewportPreset>(presets[1]);
  const [zoomScale, setZoomScale] = useState<number>(95);
  const [activeAppTab, setActiveAppTab] = useState<'sensors' | 'dosing' | 'substrate'>('sensors');

  // Interactive pulse dosing simulation
  const [isDosingPulsing, setIsDosingPulsing] = useState<boolean>(false);
  const [liveEC, setLiveEC] = useState<number>(2.24);
  const [livePH, setLivePH] = useState<number>(5.82);
  const [lastDosedText, setLastDosedText] = useState<string>('14 mins ago');

  const triggerManualDose = () => {
    setIsDosingPulsing(true);
    setTimeout(() => {
      setIsDosingPulsing(false);
      setLiveEC(prev => Number((prev + 0.04).toFixed(2)));
      setLivePH(prev => Number((prev - 0.02).toFixed(2)));
      setLastDosedText('Just now');
    }, 1600);
  };

  return (
    <section 
      id="app"
      style={{
        padding: '96px 0',
        backgroundColor: '#F6F7F9',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container">
        
        {/* TrolMaster Split: Content on Left, Phone Device on Right */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          
          {/* Left Column: Exact TrolMaster Copy & App Store Badges */}
          <div>
            <h1 
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                fontWeight: 900,
                color: '#111827',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '24px',
              }}
            >
              Grow in your <span style={{ color: '#76b82a' }}>POCKET!</span>
            </h1>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '28px' }}>
              <div 
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: '#76b82a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 900,
                  fontSize: '22px',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(118, 184, 42, 0.3)',
                }}
              >
                A
              </div>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                  All-in-one control and monitoring tool on smart phone.
                </h3>
                <p style={{ fontSize: '15px', color: '#4B5563', margin: 0 }}>
                  Get the IntelliGrow app now on the App Store and Google Play. Manage climate, watering, and CO2 with our smart controllers from anywhere in the world.
                </p>
              </div>
            </div>

            {/* App Store Download Badges */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <a 
                href="#app-store" 
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontSize: '22px' }}>🍎</div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>Download on the</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.1 }}>App Store</div>
                </div>
              </a>

              <a 
                href="#google-play" 
                onClick={(e) => e.preventDefault()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  padding: '10px 22px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  transition: 'background 0.15s',
                }}
              >
                <div style={{ fontSize: '20px' }}>▶</div>
                <div>
                  <div style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#9CA3AF' }}>GET IT ON</div>
                  <div style={{ fontSize: '15px', fontWeight: 700, lineHeight: 1.1 }}>Google Play</div>
                </div>
              </a>
            </div>

            {/* Viewport Presets & Zoom Tooling (User Requirement: 1:1 Phone Scaling) */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '18px 22px',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <Smartphone size={16} style={{ color: '#76b82a' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#111827', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Interactive Phone Viewport Scaler
                </span>
              </div>

              {/* Preset Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Device:</span>
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: activePreset.id === p.id ? '1px solid #76b82a' : '1px solid #D1D5DB',
                      backgroundColor: activePreset.id === p.id ? '#F0FDF4' : '#FFFFFF',
                      color: activePreset.id === p.id ? '#15803D' : '#374151',
                      transition: 'all 0.15s',
                    }}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              {/* Slider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>Scale:</span>
                <input 
                  type="range"
                  min="75"
                  max="110"
                  value={zoomScale}
                  onChange={(e) => setZoomScale(Number(e.target.value))}
                  style={{ width: '130px', accentColor: '#76b82a', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 700, color: '#111827', width: '38px' }}>
                  {zoomScale}%
                </span>
                <button
                  onClick={() => { setZoomScale(95); setActivePreset(presets[1]); }}
                  title="Reset Scale"
                  style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: '2px' }}
                >
                  <RotateCcw size={14} />
                </button>
                <span style={{ fontSize: '11px', color: '#76b82a', marginLeft: 'auto', fontWeight: 600 }}>
                  {activePreset.deviceLabel}
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Scalable Mobile Device Chassis with Live Telemetry */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'center',
              transform: `scale(${zoomScale / 100})`,
              transformOrigin: 'top center',
              transition: 'transform 0.2s ease, width 0.3s ease, height 0.3s ease',
            }}
          >
            <div 
              style={{
                width: `${activePreset.width}px`,
                height: `${activePreset.height}px`,
                backgroundColor: '#FFFFFF',
                borderRadius: '44px',
                border: '10px solid #1F2937',
                boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                userSelect: 'none',
              }}
            >
              {/* Dynamic Island / Hardware Notch */}
              <div 
                style={{
                  position: 'absolute',
                  top: '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '105px',
                  height: '24px',
                  backgroundColor: '#1F2937',
                  borderRadius: '16px',
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#111827' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#76b82a' }} />
              </div>

              {/* Status Bar */}
              <div 
                style={{
                  height: '40px',
                  padding: '8px 20px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'sans-serif',
                  color: '#111827',
                  fontWeight: 600,
                  zIndex: 40,
                }}
              >
                <span>09:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Signal size={12} />
                  <Wifi size={12} />
                  <Battery size={13} />
                </div>
              </div>

              {/* App Shell */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB', overflowY: 'auto' }}>
                
                {/* App Header */}
                <div style={{ padding: '12px 18px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#15803D', fontWeight: 700, textTransform: 'uppercase' }}>
                        FACILITY #04 · NORTH CANTERBURY
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#111827' }}>
                        ZONE A: VINE TOMATOES
                      </div>
                    </div>
                    <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '9.5px', fontWeight: 700 }}>
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Sub-Tabs */}
                <div style={{ display: 'flex', backgroundColor: '#FFFFFF', borderBottom: '1px solid #E5E7EB' }}>
                  {[
                    { id: 'sensors', label: 'Sensors' },
                    { id: 'dosing', label: 'Dosing' },
                    { id: 'substrate', label: 'Substrate' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAppTab(tab.id as any)}
                      style={{
                        flex: 1,
                        padding: '9px 4px',
                        fontSize: '11.5px',
                        fontWeight: activeAppTab === tab.id ? 700 : 500,
                        border: 'none',
                        background: 'none',
                        borderBottom: activeAppTab === tab.id ? '2px solid #76b82a' : 'none',
                        color: activeAppTab === tab.id ? '#15803D' : '#6B7280',
                        cursor: 'pointer',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {activeAppTab === 'sensors' && (
                    <>
                      {/* Metric Dual Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                          <div style={{ fontSize: '9.5px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>CONDUCTIVITY</div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '4px 0', fontFamily: 'monospace' }}>
                            {liveEC}
                          </div>
                          <div style={{ fontSize: '9.5px', color: '#15803D', fontWeight: 600 }}>Target: 2.20 mS/cm</div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                          <div style={{ fontSize: '9.5px', color: '#6B7280', textTransform: 'uppercase', fontWeight: 600 }}>SOLUTION pH</div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '4px 0', fontFamily: 'monospace' }}>
                            {livePH}
                          </div>
                          <div style={{ fontSize: '9.5px', color: '#0284C7', fontWeight: 600 }}>Target: 5.80 pH</div>
                        </div>
                      </div>

                      {/* Quad Climate Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>
                            <Thermometer size={12} style={{ color: '#D97706' }} /> TEMP
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>24.5°C</div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>
                            <Droplet size={12} style={{ color: '#0284C7' }} /> RH
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>68.2%</div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>
                            <Wind size={12} style={{ color: '#16A34A' }} /> VPD
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#15803D', fontFamily: 'monospace' }}>1.15 kPa</div>
                        </div>

                        <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: '#6B7280', fontWeight: 600 }}>
                            <Sun size={12} style={{ color: '#D97706' }} /> CO2
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#111827', fontFamily: 'monospace' }}>1,120 ppm</div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppTab === 'dosing' && (
                    <>
                      <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                        <div style={{ fontSize: '9.5px', color: '#6B7280', fontWeight: 600 }}>ACTIVE RECIPE</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: '2px 0' }}>BLOOM BOOST #03</div>
                        <div style={{ fontSize: '11px', color: '#6B7280' }}>Proportional A/B/pH injection active.</div>
                      </div>

                      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                        <button
                          onClick={triggerManualDose}
                          disabled={isDosingPulsing}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '6px',
                            backgroundColor: isDosingPulsing ? '#DCFCE7' : '#76b82a',
                            color: isDosingPulsing ? '#15803D' : '#FFFFFF',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            cursor: isDosingPulsing ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                          }}
                        >
                          <Play size={14} />
                          {isDosingPulsing ? 'Dosing in Progress...' : 'Trigger 10ml Pulse Dose'}
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '9.5px', color: '#9CA3AF', marginTop: '6px' }}>
                          Last dosed: {lastDosedText}
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppTab === 'substrate' && (
                    <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: '10px', color: '#0284C7', fontWeight: 700 }}>WCS-PRO SUBSTRATE POD</div>
                      <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '4px 0' }}>VWC: 62.4%</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>Pore Water EC: 3.2 mS/cm · Temp: 21.6°C</div>
                      <div style={{ marginTop: '10px', fontSize: '11px', color: '#15803D', fontWeight: 600 }}>
                        ✓ Target dryback on schedule (-12.0%)
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom App Bar */}
                <div style={{ height: '44px', borderTop: '1px solid #E5E7EB', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-around', color: '#9CA3AF' }}>
                  <Activity size={16} style={{ color: '#76b82a' }} />
                  <Layers size={16} />
                  <Bell size={16} />
                  <Settings size={16} />
                </div>

                {/* Home Bar */}
                <div style={{ height: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
                  <div style={{ width: '90px', height: '3px', backgroundColor: '#D1D5DB', borderRadius: '999px' }} />
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
