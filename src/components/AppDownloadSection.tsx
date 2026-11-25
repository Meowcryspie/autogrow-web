import React, { useState } from 'react';
import { 
  Smartphone, 
  RotateCcw, 
  Wifi, 
  Battery, 
  Signal, 
  Droplet, 
  Thermometer, 
  Activity, 
  Play,
  Layers,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { FarmOneDrawing } from './graphics/FarmOneDrawing';
import { FarmTwoDrawing } from './graphics/FarmTwoDrawing';
import { EcGauge } from './graphics/EcGauge';
import { useAuth } from '../context/AuthContext';

interface ViewportPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  deviceLabel: string;
}

export const AppDownloadSection: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const presets: ViewportPreset[] = [
    { id: 'compact', name: 'Compact', width: 340, height: 690, deviceLabel: '340 × 690 · SE / Pocket' },
    { id: 'standard', name: 'Standard', width: 380, height: 760, deviceLabel: '380 × 760 · iPhone / Pixel' },
    { id: 'promax', name: 'Pro Max', width: 420, height: 820, deviceLabel: '420 × 820 · Pro Max / Ultra' },
  ];

  const [activePreset, setActivePreset] = useState<ViewportPreset>(presets[1]);
  const [zoomScale, setZoomScale] = useState<number>(95);
  
  // App screen switcher: 'farms' | 'tank' | 'pairing'
  const [activeScreen, setActiveScreen] = useState<'farms' | 'tank' | 'pairing'>('farms');

  // Interactive Tank state
  const [liveEC, setLiveEC] = useState<number>(1.82);
  const [targetEC, setTargetEC] = useState<number>(1.80);
  const [livePH, setLivePH] = useState<number>(5.85);
  const [dosingMode, setDosingMode] = useState<'Auto' | 'Manual' | 'Off'>('Auto');
  const [isDosingPulsing, setIsDosingPulsing] = useState<boolean>(false);
  const [lastDosedText, setLastDosedText] = useState<string>('12 mins ago');
  const [selectedStage, setSelectedStage] = useState<string>('Bloom');

  const stagePresets = [
    { label: 'Seedling', target: 0.8 },
    { label: 'Veg', target: 1.4 },
    { label: 'Bloom', target: 1.8 },
    { label: 'Peak', target: 2.2 },
  ];

  const handleStageSelect = (stage: { label: string; target: number }) => {
    setSelectedStage(stage.label);
    setTargetEC(stage.target);
  };

  const triggerManualDose = () => {
    setIsDosingPulsing(true);
    setTimeout(() => {
      setIsDosingPulsing(false);
      setLiveEC(prev => Number((prev + 0.04).toFixed(2)));
      setLivePH(prev => Number((prev - 0.02).toFixed(2)));
      setLastDosedText('Just now');
    }, 1400);
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
          
          {/* Left Column: Official Autogrow App Copy & Controls */}
          <div>
            <div 
              style={{
                display: 'inline-block',
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                padding: '4px 12px',
                borderRadius: '9999px',
                fontSize: '11.5px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              The Official Autogrow Mobile App
            </div>

            <h2 
              style={{
                fontSize: 'clamp(2.4rem, 4.2vw, 3.8rem)',
                fontWeight: 900,
                color: '#111827',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                marginBottom: '20px',
              }}
            >
              Manage all your farms in your <span style={{ color: '#76b82a' }}>POCKET.</span>
            </h2>

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
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                  Real-time multi-farm precision telemetry & closed-loop dosing control.
                </h3>
                <p style={{ fontSize: '14.5px', color: '#4B5563', margin: 0, lineHeight: 1.6 }}>
                  Built directly around commercial grower workflows. Track live EC, pH, and rootzone moisture across all polyhouses and tanks. Receive instant alarm alerts and steer recipes from anywhere.
                </p>
              </div>
            </div>

            {/* Interactive Screen Switcher Pills */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
                Preview Active App Screen:
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setActiveScreen('farms')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeScreen === 'farms' ? '1px solid #76b82a' : '1px solid #D1D5DB',
                    backgroundColor: activeScreen === 'farms' ? '#F0FDF4' : '#FFFFFF',
                    color: activeScreen === 'farms' ? '#15803D' : '#4B5563',
                    transition: 'all 0.15s',
                  }}
                >
                  1. My Farms Dashboard
                </button>

                <button
                  onClick={() => setActiveScreen('tank')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeScreen === 'tank' ? '1px solid #76b82a' : '1px solid #D1D5DB',
                    backgroundColor: activeScreen === 'tank' ? '#F0FDF4' : '#FFFFFF',
                    color: activeScreen === 'tank' ? '#15803D' : '#4B5563',
                    transition: 'all 0.15s',
                  }}
                >
                  2. Tank Telemetry & EC Gauge
                </button>

                <button
                  onClick={() => setActiveScreen('pairing')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: activeScreen === 'pairing' ? '1px solid #76b82a' : '1px solid #D1D5DB',
                    backgroundColor: activeScreen === 'pairing' ? '#F0FDF4' : '#FFFFFF',
                    color: activeScreen === 'pairing' ? '#15803D' : '#4B5563',
                    transition: 'all 0.15s',
                  }}
                >
                  3. Device Pairing Flow
                </button>
              </div>
            </div>

            {/* Farm SCADA Console Link Banner (Admin Only) */}
            {user && isAdmin && (
              <div 
                data-testid="app-section-farm-scada-banner"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: '#FFFFFF',
                  borderRadius: '10px',
                  border: '1px solid #76b82a',
                  marginBottom: '24px',
                  boxShadow: '0 4px 12px rgba(118, 184, 42, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Activity size={20} color="#76b82a" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>
                      Farm SCADA
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                      Interactive 1x1 isometric tile grid & multi-controller farm management.
                    </div>
                  </div>
                </div>
                <a
                  href="https://meowcryspie.github.io/autogrow-farm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '6px 14px',
                    backgroundColor: '#0F172A',
                    color: '#FFFFFF',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Launch Farm SCADA ↗
                </a>
              </div>
            )}

            {/* App Store Download Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '32px' }}>
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '1px solid #374151',
                }}
              >
                <Smartphone size={22} style={{ color: '#76b82a' }} />
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.04em' }}>Download on the</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.1 }}>App Store</div>
                </div>
              </div>

              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  backgroundColor: '#111827',
                  color: '#FFFFFF',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  border: '1px solid #374151',
                }}
              >
                <Play size={20} style={{ color: '#76b82a' }} />
                <div>
                  <div style={{ fontSize: '9px', textTransform: 'uppercase', color: '#9CA3AF', letterSpacing: '0.04em' }}>Get it on</div>
                  <div style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.1 }}>Google Play</div>
                </div>
              </div>
            </div>

            {/* 1:1 Responsive Viewport Scaler Toolbar */}
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                padding: '16px 20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#111827', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Smartphone size={14} style={{ color: '#76b82a' }} />
                Phone Simulator Scale & Presets
              </div>

              {/* Viewport Presets */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                {presets.map(p => (
                  <button
                    key={p.id}
                    onClick={() => setActivePreset(p)}
                    style={{
                      padding: '5px 12px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
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

          {/* Right Column: Scalable Mobile Device Chassis with OUR ACTUAL APP */}
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

              {/* App Shell Body */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB', overflowY: 'auto' }}>
                
                {/* ================= SCREEN 1: MY FARMS DASHBOARD ================= */}
                {activeScreen === 'farms' && (
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Top Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#111827', margin: '0 0 2px 0', letterSpacing: '-0.02em' }}>
                          My farms
                        </h3>
                        <div style={{ fontSize: '11.5px', color: '#15803D', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 600 }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#15803D' }} />
                          Live telemetry active
                        </div>
                      </div>

                      <div style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px' }}>
                        8 of 10 online
                      </div>
                    </div>

                    {/* Add Device Button */}
                    <button
                      onClick={() => setActiveScreen('pairing')}
                      style={{
                        backgroundColor: '#111827',
                        color: '#FFFFFF',
                        padding: '12px',
                        borderRadius: '12px',
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <Plus size={16} />
                      Add a device
                    </button>

                    {/* 3 Summary KPI Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                      <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '10px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Tanks</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>10</div>
                      </div>
                      <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '10px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#DC2626', fontWeight: 600 }}>Alarms</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#DC2626', fontFamily: 'monospace' }}>1</div>
                      </div>
                      <div style={{ backgroundColor: '#FFFFFF', padding: '10px', borderRadius: '10px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                        <div style={{ fontSize: '11px', color: '#6B7280', fontWeight: 500 }}>Offline</div>
                        <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>2</div>
                      </div>
                    </div>

                    {/* Farm Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {/* Farm 1: Cameron Highlands */}
                      <div 
                        onClick={() => setActiveScreen('tank')}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '16px',
                          border: '1px solid #E5E7EB',
                          padding: '14px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          transition: 'transform 0.15s ease',
                        }}
                      >
                        {/* 3D Isometric Farm Model */}
                        <div style={{ width: '100%', maxWidth: '260px', margin: '0 auto 8px auto', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.06))' }}>
                          <FarmOneDrawing />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#15803D', padding: '2px 8px', borderRadius: '4px' }}>
                            ALL ONLINE
                          </span>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>Cameron Highlands</span>
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                          Highlands Hydroponics
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                          <span>4 Tanks Active</span>
                          <span>Avg EC: <strong style={{ color: '#15803D' }}>1.85 mS/cm</strong></span>
                        </div>
                      </div>

                      {/* Farm 2: Pahang Berry Farm */}
                      <div 
                        onClick={() => setActiveScreen('tank')}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '16px',
                          border: '1px solid #E5E7EB',
                          padding: '14px',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          transition: 'transform 0.15s ease',
                        }}
                      >
                        {/* 3D Isometric Farm Model */}
                        <div style={{ width: '100%', maxWidth: '260px', margin: '0 auto 8px auto', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.06))' }}>
                          <FarmTwoDrawing />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: '#FEF3C7', color: '#B45309', padding: '2px 8px', borderRadius: '4px' }}>
                            1 ATTENTION
                          </span>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>Genting Highlands</span>
                        </div>
                        <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                          Pahang Berry Bay
                        </h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#4B5563', borderTop: '1px solid #F3F4F6', paddingTop: '8px' }}>
                          <span>6 Tanks Active</span>
                          <span>Avg EC: <strong style={{ color: '#15803D' }}>2.12 mS/cm</strong></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ================= SCREEN 2: TANK TELEMETRY & EC GAUGE ================= */}
                {activeScreen === 'tank' && (
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Top Bar with Back to Farms */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={() => setActiveScreen('farms')}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '12px',
                          color: '#15803D',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        ← All farms
                      </button>
                      <span style={{ fontSize: '10px', fontWeight: 700, backgroundColor: '#DCFCE7', color: '#15803D', padding: '2px 6px', borderRadius: '4px' }}>
                        LIVE 3s
                      </span>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 2px 0' }}>
                        Tank 1 - Bloom NFT
                      </h3>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>
                        Highlands Hydroponics · Zone 01
                      </div>
                    </div>

                    {/* Curved Sweep EC Gauge Card */}
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '14px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Electrical Conductivity (EC)
                      </div>

                      {/* Curved Sweep Gauge from Version 1 */}
                      <EcGauge 
                        ec={liveEC}
                        target={targetEC}
                        lowLimit={1.4}
                        highLimit={2.2}
                        statusColor="green"
                      />

                      {/* Target Stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginTop: '4px' }}>
                        <button
                          onClick={() => setTargetEC(prev => Math.max(0.6, Number((prev - 0.1).toFixed(1))))}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <div style={{ fontSize: '12px', color: '#374151' }}>
                          Target: <strong style={{ color: '#15803D' }}>{targetEC.toFixed(1)}</strong> mS
                        </div>
                        <button
                          onClick={() => setTargetEC(prev => Math.min(3.5, Number((prev + 0.1).toFixed(1))))}
                          style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#F3F4F6', border: '1px solid #D1D5DB', fontWeight: 800, fontSize: '14px', cursor: 'pointer' }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Secondary Metrics: pH & Water Temp */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>
                          <Droplet size={12} style={{ color: '#0284C7' }} />
                          pH Level
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>
                          {livePH.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '10px', color: '#15803D', fontWeight: 600 }}>Optimal (5.8–6.2)</div>
                      </div>

                      <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>
                          <Thermometer size={12} style={{ color: '#D97706' }} />
                          Water Temp
                        </div>
                        <div style={{ fontSize: '18px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>
                          21.4°C
                        </div>
                        <div style={{ fontSize: '10px', color: '#15803D', fontWeight: 600 }}>Chiller Stable</div>
                      </div>
                    </div>

                    {/* Stage Presets */}
                    <div style={{ backgroundColor: '#FFFFFF', padding: '12px', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '6px' }}>Crop Stage Presets:</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        {stagePresets.map(st => (
                          <button
                            key={st.label}
                            onClick={() => handleStageSelect(st)}
                            style={{
                              flex: 1,
                              padding: '5px 2px',
                              borderRadius: '6px',
                              fontSize: '10.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              border: selectedStage === st.label ? '1px solid #76b82a' : '1px solid #E5E7EB',
                              backgroundColor: selectedStage === st.label ? '#F0FDF4' : '#F9FAFB',
                              color: selectedStage === st.label ? '#15803D' : '#4B5563',
                            }}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dosing Mode Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF', padding: '8px 12px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: '#6B7280' }}>Dosing Mode:</span>
                      <div style={{ display: 'flex', gap: '4px' }}>
                        {(['Auto', 'Manual', 'Off'] as const).map(mode => (
                          <button
                            key={mode}
                            onClick={() => setDosingMode(mode)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '4px',
                              fontSize: '10.5px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              backgroundColor: dosingMode === mode ? '#111827' : '#F3F4F6',
                              color: dosingMode === mode ? '#FFFFFF' : '#4B5563',
                            }}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Dosing Button */}
                    <button
                      onClick={triggerManualDose}
                      disabled={isDosingPulsing}
                      style={{
                        padding: '12px',
                        borderRadius: '12px',
                        backgroundColor: isDosingPulsing ? '#15803D' : '#111827',
                        color: '#FFFFFF',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '13px',
                        cursor: isDosingPulsing ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <Droplet size={14} style={{ color: '#76b82a' }} />
                      {isDosingPulsing ? 'Injecting 20ml Pulse...' : 'Pulse Dose 20ml Once'}
                    </button>
                    <div style={{ textAlign: 'center', fontSize: '10px', color: '#9CA3AF' }}>
                      Last automated injection: {lastDosedText}
                    </div>
                  </div>
                )}

                {/* ================= SCREEN 3: DEVICE PAIRING FLOW ================= */}
                {activeScreen === 'pairing' && (
                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <button
                        onClick={() => setActiveScreen('farms')}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontSize: '12px',
                          color: '#15803D',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        ← Cancel
                      </button>
                      <span style={{ fontSize: '11px', color: '#6B7280', fontWeight: 600 }}>Step 2 of 3</span>
                    </div>

                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>
                        Pair Autogrow Device
                      </h3>
                      <p style={{ fontSize: '12px', color: '#6B7280', margin: 0 }}>
                        Provisioning greenhouse Wi-Fi credentials to controller.
                      </p>
                    </div>

                    {/* Found Controller Card */}
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #76b82a', padding: '14px', boxShadow: '0 2px 8px rgba(118,184,42,0.1)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#15803D' }}>
                          <CheckCircle2 size={18} />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#111827' }}>
                            MultiGrow MGC-Pro Found
                          </div>
                          <div style={{ fontSize: '10.5px', color: '#6B7280', fontFamily: 'monospace' }}>
                            BLE: AG-8841-NZ · Signal: -48 dBm
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Wi-Fi Configuration Box */}
                    <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '14px' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#6B7280', marginBottom: '10px' }}>
                        Facility Network Selected:
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: '#F9FAFB', borderRadius: '8px', border: '1px solid #E5E7EB', marginBottom: '12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', fontWeight: 600, color: '#111827' }}>
                          <Wifi size={14} style={{ color: '#15803D' }} />
                          Greenhouse_5G_Commercial
                        </div>
                        <span style={{ fontSize: '10px', color: '#15803D', fontWeight: 700 }}>STRONG</span>
                      </div>

                      <button
                        onClick={() => setActiveScreen('tank')}
                        style={{
                          width: '100%',
                          padding: '12px',
                          borderRadius: '10px',
                          backgroundColor: '#76b82a',
                          color: '#FFFFFF',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '13px',
                          cursor: 'pointer',
                        }}
                      >
                        Complete Setup & Launch Tank
                      </button>
                    </div>

                    <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: '#15803D' }}>
                      <ShieldCheck size={16} />
                      Encrypted TLS 1.3 token exchanged with Autogrow Cloud.
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Phone App Tab Bar */}
              <div 
                style={{
                  height: '52px',
                  backgroundColor: '#FFFFFF',
                  borderTop: '1px solid #E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  padding: '0 12px',
                  fontSize: '10px',
                  color: '#6B7280',
                }}
              >
                <div 
                  onClick={() => setActiveScreen('farms')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: activeScreen === 'farms' ? '#15803D' : '#6B7280', fontWeight: activeScreen === 'farms' ? 700 : 500 }}
                >
                  <Layers size={16} />
                  <span>Farms</span>
                </div>

                <div 
                  onClick={() => setActiveScreen('tank')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: activeScreen === 'tank' ? '#15803D' : '#6B7280', fontWeight: activeScreen === 'tank' ? 700 : 500 }}
                >
                  <Activity size={16} />
                  <span>Telemetry</span>
                </div>

                <div 
                  onClick={() => setActiveScreen('pairing')}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', cursor: 'pointer', color: activeScreen === 'pairing' ? '#15803D' : '#6B7280', fontWeight: activeScreen === 'pairing' ? 700 : 500 }}
                >
                  <Sliders size={16} />
                  <span>Pair</span>
                </div>
              </div>

              {/* Home Indicator Bar */}
              <div style={{ height: '18px', backgroundColor: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '110px', height: '4px', borderRadius: '999px', backgroundColor: '#1F2937' }} />
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
