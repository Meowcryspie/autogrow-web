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
    { id: 'compact', name: 'Compact', width: 340, height: 690, deviceLabel: '340 × 690 · SE / Pocket' },
    { id: 'standard', name: 'Standard', width: 380, height: 780, deviceLabel: '380 × 780 · iPhone / Pixel' },
    { id: 'promax', name: 'Pro Max', width: 420, height: 840, deviceLabel: '420 × 840 · Pro Max / Ultra' },
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
        background: 'var(--bg-void)',
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
              color: 'var(--color-green)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
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
              color: '#FFFFFF',
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
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activePreset.id === p.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: activePreset.id === p.id 
                    ? 'rgba(0, 255, 136, 0.15)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  color: activePreset.id === p.id ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#fff', width: '42px' }}>
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
          <div style={{ fontSize: '11px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
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
              style={{
                background: 'rgba(11, 18, 14, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-green)' }}>
                <Activity size={18} />
                <h4 style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Sub-500ms MQTT Telemetry
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Real-time bi-directional sync directly to MultiGrow Pro controllers with full TLS 1.3 socket encryption.
              </p>
            </div>

            <div 
              style={{
                background: 'rgba(11, 18, 14, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-cyan)' }}>
                <Droplet size={18} />
                <h4 style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Remote Dosing Override
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
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
                background: '#040705',
                borderRadius: '46px',
                border: '9px solid #1a221d',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08)',
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
                  background: '#000000',
                  borderRadius: '16px',
                  zIndex: 50,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0a100d' }} />
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
                  color: 'var(--text-secondary)',
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
                  background: '#070b09',
                  overflowY: 'auto',
                }}
              >
                {/* App Topbar */}
                <div 
                  style={{
                    padding: '12px 18px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    background: 'rgba(11, 18, 14, 0.95)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                        FACILITY #04 · NORTH CANTERBURY
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-display)' }}>
                        ZONE A: VINE TOMATOES
                      </div>
                    </div>
                    <span 
                      style={{
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'rgba(0, 255, 136, 0.15)',
                        border: '1px solid rgba(0, 255, 136, 0.4)',
                        fontSize: '9px',
                        color: 'var(--color-green)',
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
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
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
                        background: activeAppTab === tab.id ? 'rgba(0, 255, 136, 0.12)' : 'transparent',
                        borderBottom: activeAppTab === tab.id ? '2px solid var(--color-green)' : 'none',
                        color: activeAppTab === tab.id ? 'var(--color-green)' : 'var(--text-muted)',
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
                <div style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  
                  {activeAppTab === 'telemetry' && (
                    <>
                      {/* Big Hero Radial Meter Cards */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        
                        {/* EC Card */}
                        <div 
                          style={{
                            background: 'rgba(16, 25, 20, 0.7)',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                            position: 'relative',
                          }}
                        >
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                            CONDUCTIVITY
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                            {liveEC}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                            Target: 2.20 mS/cm
                          </div>
                        </div>

                        {/* pH Card */}
                        <div 
                          style={{
                            background: 'rgba(16, 25, 20, 0.7)',
                            border: '1px solid rgba(0, 229, 255, 0.3)',
                            borderRadius: '8px',
                            padding: '12px',
                          }}
                        >
                          <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                            SOLUTION pH
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff', fontFamily: 'var(--font-mono)', margin: '4px 0' }}>
                            {livePH}
                          </div>
                          <div style={{ fontSize: '9px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
                            Target: 5.80 pH
                          </div>
                        </div>
                      </div>

                      {/* Climate Quad Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                            <Thermometer size={12} style={{ color: '#ff7b00' }} />
                            TEMP
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                            24.5°C
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                            <Droplet size={12} style={{ color: '#00b4d8' }} />
                            RH
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                            68.2%
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                            <Wind size={12} style={{ color: 'var(--color-green)' }} />
                            VPD
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>
                            1.15 kPa
                          </div>
                        </div>

                        <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9px', color: 'var(--text-muted)' }}>
                            <Sun size={12} style={{ color: '#ffd166' }} />
                            CO2
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: 700, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                            1,120 ppm
                          </div>
                        </div>
                      </div>

                      {/* Mini Live Chart Bar */}
                      <div 
                        style={{
                          background: 'rgba(0, 0, 0, 0.4)',
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                          <span>24-HR VPD TREND</span>
                          <span style={{ color: 'var(--color-green)' }}>OPTIMAL BAND</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px' }}>
                          {[30, 45, 60, 70, 75, 80, 78, 85, 90, 85, 75, 70, 65, 60, 55, 50, 48, 52].map((val, idx) => (
                            <div 
                              key={idx}
                              style={{
                                flex: 1,
                                height: `${val}%`,
                                background: val > 80 ? 'var(--color-green)' : 'rgba(0, 255, 136, 0.35)',
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
                          background: 'rgba(16, 25, 20, 0.8)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '12px',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACTIVE RECIPE</span>
                          <span style={{ fontSize: '10px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>RECIPE #03: BLOOM DENSE</span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#fff', lineHeight: 1.4 }}>
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
                              borderRadius: '6px',
                              background: isDosingPulsing ? 'rgba(0, 255, 136, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                              border: isDosingPulsing ? '1px solid var(--color-green)' : '1px solid rgba(255,255,255,0.06)',
                              textAlign: 'center',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{p}</div>
                            <div style={{ fontSize: '11px', fontWeight: 700, color: isDosingPulsing ? 'var(--color-green)' : '#fff' }}>
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
                            borderRadius: '6px',
                            background: isDosingPulsing ? 'rgba(0, 255, 136, 0.2)' : 'var(--color-green)',
                            color: isDosingPulsing ? 'var(--color-green)' : '#060a08',
                            border: 'none',
                            fontWeight: 700,
                            fontFamily: 'var(--font-mono)',
                            fontSize: '12px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            cursor: isDosingPulsing ? 'wait' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            boxShadow: isDosingPulsing ? 'none' : '0 0 15px rgba(0, 255, 136, 0.3)',
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
                          background: 'rgba(16, 25, 20, 0.8)',
                          border: '1px solid var(--border-color)',
                          borderRadius: '8px',
                          padding: '14px',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                          SUBSTRATE SENSOR · WCS-PRO
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff' }}>
                          Volumetric Water: 62.4%
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                          Pore Water EC: 3.2 mS/cm · Temp: 21.6°C
                        </div>
                      </div>

                      <div 
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '8px',
                          padding: '12px',
                          border: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>
                          DAILY DRYBACK STRATEGY
                        </div>
                        <div style={{ fontSize: '12px', color: '#fff' }}>
                          Target dryback before sunrise: <strong style={{ color: 'var(--color-green)' }}>12.0%</strong>
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
                          background: 'rgba(255, 183, 3, 0.08)',
                          border: '1px solid rgba(255, 183, 3, 0.3)',
                          borderRadius: '6px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <AlertTriangle size={16} style={{ color: '#ffb703', flexShrink: 0 }} />
                        <div style={{ fontSize: '11px', color: '#fff' }}>
                          <strong>CO2 Tank Pressure:</strong> Low pressure alert (18.2 bar). Replacement scheduled.
                        </div>
                      </div>

                      <div 
                        style={{
                          background: 'rgba(0, 255, 136, 0.08)',
                          border: '1px solid rgba(0, 255, 136, 0.2)',
                          borderRadius: '6px',
                          padding: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                        }}
                      >
                        <CheckCircle size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                        <div style={{ fontSize: '11px', color: '#fff' }}>
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
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    background: '#040705',
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
                  }}
                >
                  <div style={{ width: '90px', height: '3px', background: 'rgba(255, 255, 255, 0.3)', borderRadius: '999px' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Feature Column */}
          <div className="hide-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div 
              style={{
                background: 'rgba(11, 18, 14, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-green)' }}>
                <ShieldAlert size={18} />
                <h4 style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Autonomous Local Logic
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Even if internet cuts out, Autogrow controllers continue executing irrigation and climate formulas locally without failure.
              </p>
            </div>

            <div 
              style={{
                background: 'rgba(11, 18, 14, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--color-cyan)' }}>
                <Layers size={18} />
                <h4 style={{ margin: 0, fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  Multi-Site Farm Overview
                </h4>
              </div>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Switch effortlessly between multiple commercial zones, sister facilities, and research chambers from a single account.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};