import React, { useState } from 'react';
import { 
  Download, 
  Phone, 
  Mail, 
  CheckCircle2, 
  FileText, 
  Cpu, 
  Wrench, 
  Box,
  ArrowRight,
  ShoppingBag,
  MapPin,
  MessageSquare
} from 'lucide-react';
import { DOWNLOADS_DATA, DISTRIBUTORS_DATA } from '../data/mockProducts';
import type { DownloadItem, DistributorLocation } from '../types';

interface WhereToBuySupportProps {
  onNavigateToStore?: () => void;
  onOpenSupportChat?: () => void;
}

export const WhereToBuySupport: React.FC<WhereToBuySupportProps> = ({ 
  onNavigateToStore, 
  onOpenSupportChat 
}) => {
  const [activeTab, setActiveTab] = useState<'distributors' | 'downloads' | 'roi' | 'helpdesk'>('distributors');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // ROI Calculator states
  const [hectares, setHectares] = useState<number>(2.5);
  const [fertilizerSpend, setFertilizerSpend] = useState<number>(85000);
  const [waterSpend, setWaterSpend] = useState<number>(32000);

  const annualSavings = Math.round(fertilizerSpend * 0.22 + waterSpend * 0.26);

  const regions = ['All', 'Australasia (Global HQ)', 'North America', 'Europe', 'Latin America', 'Asia-Pacific'];

  const filteredDistributors = selectedRegion === 'All'
    ? DISTRIBUTORS_DATA
    : DISTRIBUTORS_DATA.filter((d: DistributorLocation) => d.region.includes(selectedRegion) || selectedRegion.includes(d.region));

  const handleDownload = (item: DownloadItem) => {
    setDownloadToast(`Downloading ${item.title} (${item.fileSize})...`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  return (
    <section 
      id="where-to-buy"
      style={{
        padding: '96px 0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '32px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#76b82a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Direct Store & Global Support Network
          </p>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#111827', margin: '0 0 16px 0' }}>
            Where to Buy & Technical Support
          </h2>
          <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '680px', margin: '0 0 28px 0', lineHeight: 1.6 }}>
            Order replacement probes directly from our online parts store, connect with a local certified greenhouse integrator in your region, or chat with technical support.
          </p>

          {/* DUAL BUTTONS + SUPPORT CHAT (As explicitly requested by user) */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
            {/* Button 1: Shop Online Store */}
            <button
              onClick={onNavigateToStore}
              className="btn btn-secondary"
              style={{ 
                padding: '14px 28px', 
                fontSize: '14.5px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                backgroundColor: '#F9FAFB',
                borderColor: '#111827',
                color: '#111827',
                boxShadow: '0 4px 14px rgba(0,0,0,0.06)'
              }}
            >
              <ShoppingBag size={18} style={{ color: '#76b82a' }} />
              Shop Online Store (Probes & Spares)
            </button>

            {/* Button 2: Find Local Distributor */}
            <button
              onClick={() => setActiveTab('distributors')}
              className="btn btn-primary"
              style={{ 
                padding: '14px 28px', 
                fontSize: '14.5px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px',
                boxShadow: '0 4px 16px rgba(118,184,42,0.25)'
              }}
            >
              <MapPin size={18} />
              Find Local Certified Distributor
            </button>

            {/* Button 3: Interactive Technical Support Chatbox */}
            <button
              onClick={onOpenSupportChat}
              style={{
                padding: '14px 26px',
                fontSize: '14.5px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '9999px',
                fontWeight: 700,
                cursor: 'pointer',
                backgroundColor: '#1E2421',
                color: '#FFFFFF',
                border: '1px solid #374151',
                boxShadow: '0 4px 14px rgba(0,0,0,0.15)',
                transition: 'background-color 0.15s, transform 0.15s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1E2421';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <MessageSquare size={18} style={{ color: '#76b82a' }} />
              Open Technical Support Chatbox
            </button>
          </div>
          
          {/* Top Pill Nav Tabs */}
          <div 
            style={{
              display: 'inline-flex',
              backgroundColor: '#F3F4F6',
              padding: '4px',
              borderRadius: '9999px',
              gap: '4px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              onClick={() => setActiveTab('distributors')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'distributors' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'distributors' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'distributors' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Certified Distributors (45+ Countries)
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'downloads' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'downloads' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'downloads' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Firmware & CAD Downloads
            </button>

            <button
              onClick={() => setActiveTab('helpdesk')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'helpdesk' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'helpdesk' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'helpdesk' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Support Hotlines & Pinouts
            </button>

            <button
              onClick={() => setActiveTab('roi')}
              style={{
                padding: '10px 22px',
                borderRadius: '9999px',
                fontSize: '13.5px',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: activeTab === 'roi' ? '#FFFFFF' : 'transparent',
                color: activeTab === 'roi' ? '#111827' : '#6B7280',
                boxShadow: activeTab === 'roi' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              Commercial ROI Calculator
            </button>
          </div>
        </div>

        {/* Tab 1: Global Distributors */}
        {activeTab === 'distributors' && (
          <div>
            {/* Region Filters */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '32px' }}>
              {regions.map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  style={{
                    padding: '8px 18px',
                    borderRadius: '9999px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    border: selectedRegion === r ? '1px solid #76b82a' : '1px solid #E5E7EB',
                    backgroundColor: selectedRegion === r ? '#F0FDF4' : '#FFFFFF',
                    color: selectedRegion === r ? '#15803D' : '#4B5563',
                    transition: 'all 0.15s',
                  }}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Distributors Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
              {filteredDistributors.map((dist) => (
                <div
                  key={dist.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '12px',
                    padding: '24px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                        {dist.region}
                      </span>
                      <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 500 }}>
                        {dist.country}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
                      {dist.partnerName}
                    </h3>
                    <p style={{ fontSize: '13px', color: '#4B5563', margin: '0 0 16px 0' }}>
                      <strong>Territory:</strong> {dist.territory}
                    </p>
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12.5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
                      <Phone size={13} style={{ color: '#76b82a' }} />
                      <span>{dist.supportPhone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#374151' }}>
                      <Mail size={13} style={{ color: '#0284C7' }} />
                      <a href={`mailto:${dist.email}`} style={{ color: '#0284C7', textDecoration: 'none' }}>
                        {dist.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Firmware & CAD Downloads */}
        {activeTab === 'downloads' && (
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            {downloadToast && (
              <div style={{ padding: '12px 18px', borderRadius: '8px', backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 600, fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={16} />
                {downloadToast}
              </div>
            )}

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
              {DOWNLOADS_DATA.map((item: DownloadItem, idx) => (
                <div
                  key={item.id}
                  style={{
                    padding: '18px 24px',
                    borderBottom: idx < DOWNLOADS_DATA.length - 1 ? '1px solid #E5E7EB' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#76b82a', flexShrink: 0 }}>
                      {item.category === 'Firmware' && <Cpu size={20} />}
                      {item.category === 'CAD' && <Box size={20} />}
                      {item.category === 'Wiring' && <Wrench size={20} />}
                      {item.category === 'Manuals' && <FileText size={20} />}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#15803D', backgroundColor: '#DCFCE7', padding: '2px 6px', borderRadius: '3px' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '12px', color: '#6B7280' }}>
                          {item.product} · {item.version}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', margin: 0 }}>
                        {item.title}
                      </h4>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ fontSize: '12.5px', color: '#6B7280', fontFamily: 'monospace' }}>
                      {item.fileSize}
                    </span>
                    <button
                      onClick={() => handleDownload(item)}
                      className="btn btn-primary"
                      style={{ padding: '8px 18px', fontSize: '12.5px' }}
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Technical Support Hotlines & Chat Information */}
        {activeTab === 'helpdesk' && (
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '24px', marginBottom: '32px' }}>
              
              <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Phone size={22} style={{ color: '#76b82a' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: 0 }}>Global Telephone Hotlines</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Reach our engineering team during business hours (NZST & EST):
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', fontWeight: 600 }}>
                  <div style={{ color: '#111827' }}>🇳🇿 New Zealand: <span style={{ color: '#15803D' }}>+64 9 415 2380</span></div>
                  <div style={{ color: '#111827' }}>🇺🇸 Americas Toll-Free: <span style={{ color: '#15803D' }}>+1 (800) 852-3088</span></div>
                  <div style={{ color: '#111827' }}>🇲🇾 SE Asia Desk: <span style={{ color: '#15803D' }}>+60 3-8023 2388</span></div>
                </div>
              </div>

              <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <Mail size={22} style={{ color: '#0284C7' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: 0 }}>Email Helpdesk</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.6, margin: '0 0 16px 0' }}>
                  Submit wiring schematics, photos of crop symptoms, or log files:
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div><strong>General Support:</strong> <a href="mailto:help@autogrow.com" style={{ color: '#0284C7' }}>help@autogrow.com</a></div>
                  <div><strong>Commercial Skids:</strong> <a href="mailto:engineering@autogrow.com" style={{ color: '#0284C7' }}>engineering@autogrow.com</a></div>
                  <div><strong>Operating Hours:</strong> Mon–Fri 11am–5pm NZST</div>
                </div>
              </div>

              <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#1E2421', color: '#FFFFFF', border: '1px solid #374151' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <MessageSquare size={22} style={{ color: '#76b82a' }} />
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>Grower Support Chatbox</h3>
                </div>
                <p style={{ fontSize: '13.5px', color: '#D1D5DB', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  Instant interactive diagnostics for sensor calibration, 24VAC valve lockout, RS-485 bus wiring, and replacement parts.
                </p>
                <button
                  onClick={onOpenSupportChat}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '13.5px' }}
                >
                  Launch Interactive Support Chat
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Commercial ROI Calculator */}
        {activeTab === 'roi' && (
          <div style={{ maxWidth: '980px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '36px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                  Facility Scale & Operational Expenditure
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
                  Model recurrent savings from closed-loop proportional injection and solar radiation steering.
                </p>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Acreage:</span>
                    <span style={{ color: '#15803D' }}>{hectares.toFixed(1)} Hectares ({(hectares * 10000).toLocaleString()} m²)</span>
                  </div>
                  <input 
                    type="range" min="0.5" max="20" step="0.5" value={hectares} 
                    onChange={(e) => setHectares(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: '#76b82a', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Annual Fertilizer Spend:</span>
                    <span style={{ color: '#15803D' }}>${fertilizerSpend.toLocaleString()} USD</span>
                  </div>
                  <input 
                    type="range" min="10000" max="500000" step="5000" value={fertilizerSpend} 
                    onChange={(e) => setFertilizerSpend(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: '#76b82a', cursor: 'pointer' }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                    <span>Annual Water Cost:</span>
                    <span style={{ color: '#0284C7' }}>${waterSpend.toLocaleString()} USD</span>
                  </div>
                  <input 
                    type="range" min="5000" max="200000" step="2500" value={waterSpend} 
                    onChange={(e) => setWaterSpend(Number(e.target.value))} 
                    style={{ width: '100%', accentColor: '#76b82a', cursor: 'pointer' }}
                  />
                </div>
              </div>

              <div style={{ backgroundColor: '#F9FAFB', padding: '32px', borderRadius: '12px', border: '1px solid #E5E7EB', textAlign: 'center' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#15803D', marginBottom: '6px' }}>
                  ESTIMATED RECURRENT ANNUAL SAVINGS
                </div>
                <div style={{ fontSize: '46px', fontWeight: 900, color: '#111827', fontFamily: 'monospace', lineHeight: 1 }}>
                  ${annualSavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '14px', color: '#6B7280', margin: '8px 0 24px' }}>
                  Recapturing ~22% nutrients & ~26% irrigation water.
                </div>
                <div style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#DCFCE7', color: '#15803D', fontWeight: 700, fontSize: '13px', marginBottom: '20px' }}>
                  ✓ Hardware payback typically amortized in 4.8 months
                </div>
                <button
                  onClick={() => setActiveTab('distributors')}
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                >
                  Request Facility Engineering Quote
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
