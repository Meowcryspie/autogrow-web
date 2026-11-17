import React, { useState } from 'react';
import { 
  Smartphone, 
  RotateCcw, 
  Wifi, 
  Battery, 
  Signal, 
  Bell, 
  Droplet, 
  Thermometer, 
  Wind, 
  Sun, 
  Activity, 
  CheckCircle, 
  AlertTriangle,
  Play,
  Layers,
  Settings,
  ShieldAlert
} from 'lucide-react';

interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceLabel: string;
}

export const PhoneScalingAppSection: React.FC = () => {
  const presets: ViewportPreset[] = [
    { id: 'compact', name: 'Compact', width: 340, height: 690, deviceLabel: '340 × 690 · Pocket Display' },
    { id: 'standard', name: 'Standard', width: 380, height: 780, deviceLabel: '380 × 780 · Grower Phone' },
    { id: 'promax', name: 'Pro Max', width: 420, height: 840, deviceLabel: '420 × 840 · Field Tablet' },
  ];

  const [activePreset, setActivePreset] = useState<ViewportPreset>(presets[1]);
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [activeAppTab, setActiveAppTab] = useState<'telemetry' | 'dosing' | 'substrate' | 'alarms'>('telemetry');
  
  // Interactive Dosing Simulation
  const [isDosingPulsing, setIsDosingPulsing] = useState<boolean>(false);
  const [lastDoseTimestamp, setLastDoseTimestamp] = useState<string>('14 mins ago');
  const [liveEC, setLiveEC] = useState<number>(2.24);
  const [livePH, setLivePH] = useState<number>(5.82);

  const triggerManualDose = () => {
    setIsDosingPulsing(true);
    setTimeout(() => {
      setIsDosingPulsing(false);
      setLastDoseTimestamp('Just now');
      setLiveEC(prev => Number((prev + 0.04).toFixed(2)));
      setLivePH(prev => Number((prev - 0.02).toFixed(2)));
    }, 1800);
  };

  return (
    <section 
      id="phone-scaling" 
      style={{
        padding: '96px 0',
        background: 'var(--bg-page)',
        position: 'relative',
        borderBottom: '1px solid var(--border-subtle)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '36px' }}>
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
            <Smartphone size={14} />
            Mobile App & Viewport Scaling Studio
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            IntelliGrow™ Mobile Scaler
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Experience 1:1 responsive viewport scaling replicating TrolMaster’s mobile showcase. 
            Adjust viewport widths and zoom magnification dynamically while interacting with real-time Autogrow telemetry and pulse dosing.
          </p>
        </div>

        {/* Viewport Control Bar */}
        <div 
          className="panel-chassis"
          style={{
            maxWidth: '920px',
            margin: '0 auto 40px',
            padding: '14px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'var(--bg-surface)',
          }}
        >
          {/* Preset Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginRight: '6px' }}>
              Device Frame:
            </span>
            {presets.map(p => (
              <button
                key={p.id}
                onClick={() => setActivePreset(p)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activePreset.id === p.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid var(--border-subtle)',
                  background: activePreset.id === p.id 
                    ? 'var(--color-green-light)' 
                    : 'var(--bg-surface-subtle)',
                  color: activePreset.id === p.id ? 'var(--color-green-dark)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                }}
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Zoom Slider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Scale:
            </span>
            <input 
              type="range"
              min="75"
              max="115"
              value={zoomScale}
              onChange={(e) => setZoomScale(Number(e.target.value))}
              style={{
                width: '120px',
                accentColor: 'var(--color-green)',
                cursor: 'pointer',
              }}
            />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-primary)', width: '42px', fontWeight: 600 }}>
              {zoomScale}%
            </span>
            <button
              onClick={() => { setZoomScale(100); setActivePreset(presets[1]); }}
              title="Reset Viewport"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>

          {/* Active Resolution Readout */}
          <div style={{ fontSize: '11.5px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
            {activePreset.deviceLabel}
          </div>
        </div>

        {/* Studio Workspace: Phone Center + Side Specifications */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto minmax(0, 1fr)',
            gap: '30px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Left Feature Column */}
          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div 
              className="panel-chassis"
              style={{
                background: '#FFFFFF',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-green)' }}>
                <Activity size={18} />
                <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Sub-500ms MQTT Telemetry
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Real-time bi-directional sync directly to MultiGrow Pro controllers with full TLS 1.3 socket encryption.
              </p>
            </div>

            <div 
              className="panel-chassis"
              style={{
                background: '#FFFFFF',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-blue)' }}>
                <Droplet size={18} />
                <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Remote Dosing Override
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Push manual or scheduled nutrient micro-doses to up to 8 peristaltic channels anywhere in the world.
              </p>
            </div>
          </div>

          {/* Center Scalable Phone Device Chassis */}
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
                background: '#FFFFFF',
                borderRadius: '46px',
                border: '10px solid #1E2922',
                boxShadow: '0 20px 45px -10px rgba(17, 25, 19, 0.22), 0 0 0 1px rgba(0, 0, 0, 0.08)',
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
                  width: '110px',
                  height: '24px',
                  background: '#1E2922',
                  borderRadius: '16px',
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#111913' }} />
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--color-green)' }} />
              </div>

              {/* Phone Status Bar */}
              <div 
                style={{
                  height: '42px',
                  padding: '8px 22px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  background: '#FFFFFF',
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

              {/* IntelliGrow App Shell Inside Phone */}
              <div 
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-page)',
                  overflowY: 'auto',
                }}
              >
                {/* App Topbar */}
                <div 
                  style={{
                    padding: '12px 18px',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: '#FFFFFF',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                        FACILITY #04 · NORTH CANTERBURY
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                        ZONE A: VINE TOMATOES
                      </div>
                    </div>
                    <span 
                      style={{
                        padding: '2px 7px',
                        borderRadius: '3px',
                        background: 'var(--color-green-light)',
                        border: '1px solid #86EFAC',
                        fontSize: '9px',
                        color: 'var(--color-green-text)',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                      }}
                    >
                      ONLINE
                    </span>
                  </div>
                </div>

                {/* Sub-navigation Tabs Inside App */}
                <div 
                  style={{
                    display: 'flex',
                    background: '#FFFFFF',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  {[
                    { id: 'telemetry', label: 'Sensors' },
                    { id: 'dosing', label: 'Dosing' },
                    { id: 'substrate', label: 'Substrate' },
                    { id: 'alarms', label: 'Alarms' },
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveAppTab(tab.id as any)}
                      style={{
                        flex: 1,
                        padding: '10px 4px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        border: 'none',
                        background: activeAppTab === tab.id ? 'var(--bg-surface-subtle)' : 'transparent',
                        borderBottom: activeAppTab === tab.id ? '2px solid var(--color-green)' : 'none',
                        color: activeAppTab === tab.id ? 'var(--color-green-dark)' : 'var(--text-muted)',
                        cursor: 'pointer',
                        fontWeight: activeAppTab === tab.id ? 700 : 500,
                        transition: 'all 0.15s ease',
                      }}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* App Content Body */}
                <div style={{ flex: 1, padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  
                  {activeAppTab === 'telemetry' && (
                    <>
                      {/* Big Hero Radial Meter Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        
                        {/* EC Card */}
                        <div 
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '12px',
                            position: 'relative',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        >
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            CONDUCTIVITY
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                            {liveEC}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            Target: 2.20 mS/cm
                          </div>
                        </div>

                        {/* pH Card */}
                        <div 
                          style={{
                            background: '#FFFFFF',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: '6px',
                            padding: '12px',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        >
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            SOLUTION pH
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                            {livePH}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                            Target: 5.80 pH
                          </div>
                        </div>
                      </div>

                      {/* Climate Quad Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            <Thermometer size={12} style={{ color: '#D97706' }} />
                            TEMP
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            24.5°C
                          </div>
                        </div>

                        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            <Droplet size={12} style={{ color: '#0284C7' }} />
                            RH
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            68.2%
                          </div>
                        </div>

                        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            <Wind size={12} style={{ color: 'var(--color-green)' }} />
                            VPD
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)' }}>
                            1.15 kPa
                          </div>
                        </div>

                        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>
                            <Sun size={12} style={{ color: '#D97706' }} />
                            CO2
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                            1,120 ppm
                          </div>
                        </div>
                      </div>

                      {/* Mini Live Chart Bar */}
                      <div 
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '6px',
                          padding: '12px',
                          border: '1px solid var(--border-subtle)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
                          <span>24-HR VPD TREND</span>
                          <span style={{ color: 'var(--color-green-dark)' }}>OPTIMAL BAND</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '36px' }}>
                          {[30, 45, 60, 70, 75, 80, 78, 85, 90, 85, 75, 70, 65, 60, 55, 50, 48, 52].map((val, idx) => (
                            <div 
                              key={idx}
                              style={{
                                flex: 1,
                                height: `${val}%`,
                                background: val > 80 ? 'var(--color-green)' : '#BBF7D0',
                                borderRadius: '2px',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppTab === 'dosing' && (
                    <>
                      {/* Dosing Controller Status */}
                      <div 
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '12px',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                          <span style={{ fontSize: '9.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>ACTIVE RECIPE</span>
                          <span style={{ fontSize: '9.5px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>RECIPE #03: BLOOM DENSE</span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          Multi-channel peristaltic dosing calibrated for rockwool slab crop steering.
                        </div>
                      </div>

                      {/* Channels Indicator */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
                        {['PUMP A', 'PUMP B', 'PUMP C', 'pH DOWN'].map((p, idx) => (
                          <div 
                            key={idx}
                            style={{
                              padding: '8px 4px',
                              borderRadius: '4px',
                              background: isDosingPulsing ? 'var(--color-green-light)' : '#FFFFFF',
                              border: isDosingPulsing ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                              textAlign: 'center',
                              transition: 'all 0.2s ease',
                              boxShadow: 'var(--shadow-sm)',
                            }}
                          >
                            <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>{p}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: isDosingPulsing ? 'var(--color-green-dark)' : 'var(--text-primary)' }}>
                              {isDosingPulsing ? 'RUN' : 'RDY'}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Interactive Dose Button */}
                      <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                        <button
                          onClick={triggerManualDose}
                          disabled={isDosingPulsing}
                          style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '4px',
                            background: isDosingPulsing ? 'var(--color-green-light)' : 'var(--color-green)',
                            color: isDosingPulsing ? 'var(--color-green-dark)' : '#FFFFFF',
                            border: '1px solid var(--color-green)',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11.5px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            cursor: isDosingPulsing ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                        >
                          <Play size={14} />
                          {isDosingPulsing ? 'Dosing In Progress...' : 'Trigger 10ml Pulse Dose'}
                        </button>
                        <div style={{ textAlign: 'center', fontSize: '9px', color: 'var(--text-muted)', marginTop: '6px', fontFamily: 'var(--font-mono)' }}>
                          Last dosed: {lastDoseTimestamp}
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppTab === 'substrate' && (
                    <>
                      <div 
                        style={{
                          background: '#FFFFFF',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: '6px',
                          padding: '14px',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: 'var(--color-blue)', fontFamily: 'var(--font-mono)', marginBottom: '4px', fontWeight: 700 }}>
                          SUBSTRATE SENSOR · WCS-PRO
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          Volumetric Water: 62.4%
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Pore Water EC: 3.2 mS/cm · Temp: 21.6°C
                        </div>
                      </div>

                      <div 
                        style={{
                          background: '#FFFFFF',
                          borderRadius: '6px',
                          padding: '12px',
                          border: '1px solid var(--border-subtle)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                          DAILY DRYBACK STRATEGY
                        </div>
                        <div style={{ fontSize: '12px', color: 'var(--text-primary)' }}>
                          Target dryback before sunrise: <strong style={{ color: 'var(--color-green-dark)' }}>12.0%</strong>
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Current dryback: 8.5% (On track for generative steering)
                        </div>
                      </div>
                    </>
                  )}

                  {activeAppTab === 'alarms' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div 
                        style={{
                          background: '#FEF3C7',
                          border: '1px solid #FCD34D',
                          borderRadius: '6px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <AlertTriangle size={16} style={{ color: '#D97706', flexShrink: 0 }} />
                        <div style={{ fontSize: '11px', color: '#78350F' }}>
                          <strong>CO2 Tank Pressure:</strong> Low pressure alert (18.2 bar). Replacement scheduled.
                        </div>
                      </div>

                      <div 
                        style={{
                          background: '#DCFCE7',
                          border: '1px solid #86EFAC',
                          borderRadius: '6px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <CheckCircle size={16} style={{ color: '#16A34A', flexShrink: 0 }} />
                        <div style={{ fontSize: '11px', color: '#14532D' }}>
                          <strong>Watchdog OK:</strong> All 12 RS485 sensory nodes responding within 22ms.
                        </div>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bottom App Bar */}
                <div 
                  style={{
                    height: '46px',
                    borderTop: '1px solid var(--border-subtle)',
                    background: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Activity size={16} style={{ color: 'var(--color-green)' }} />
                  <Layers size={16} />
                  <Bell size={16} />
                  <Settings size={16} />
                </div>

                {/* iPhone Home Bar */}
                <div 
                  style={{
                    height: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: '#FFFFFF',
                  }}
                >
                  <div style={{ width: '90px', height: '3px', background: '#D1D5DB', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Feature Column */}
          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div 
              className="panel-chassis"
              style={{
                background: '#FFFFFF',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-green)' }}>
                <ShieldAlert size={18} />
                <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Autonomous Local Logic
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Even if internet cuts out, Autogrow controllers continue executing irrigation and climate formulas locally without failure.
              </p>
            </div>

            <div 
              className="panel-chassis"
              style={{
                background: '#FFFFFF',
                padding: '22px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-blue)' }}>
                <Layers size={18} />
                <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', fontWeight: 700 }}>
                  Multi-Site Farm Overview
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Switch effortlessly between multiple commercial zones, sister facilities, and research chambers from a single account.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
