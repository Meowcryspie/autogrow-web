import React, { useState } from 'react';
import { DOWNLOADS_DATA } from '../data/mockProducts';
import type { DownloadItem } from '../types';
import { 
  FileText, 
  Download, 
  Cpu, 
  Wrench, 
  CheckCircle2, 
  HardDriveDownload, 
  Search
} from 'lucide-react';

export const TechnicalDownloadsSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<'All' | 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures'>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories: ('All' | 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures')[] = [
    'All',
    'Manuals',
    'Firmware',
    'Wiring',
    'Brochures',
  ];

  const filteredItems = DOWNLOADS_DATA.filter(item => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.product.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateDownload = (item: DownloadItem) => {
    setDownloadSuccessToast(`Downloading ${item.title} (${item.fileSize})...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  return (
    <section 
      id="support" 
      style={{
        padding: '100px 0',
        background: 'var(--bg-card)',
        position: 'relative',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
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
            <HardDriveDownload size={14} />
            Support & Documentation
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
            Technical Downloads & Firmware
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Access industrial schematics, high-voltage wiring diagrams, controller firmware binaries, and comprehensive engineering guides.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto 30px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            background: 'rgba(11, 18, 14, 0.7)',
            padding: '16px 20px',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCat === cat 
                    ? '1px solid var(--color-green)' 
                    : '1px solid rgba(255, 255, 255, 0.1)',
                  background: selectedCat === cat 
                    ? 'rgba(0, 255, 136, 0.15)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  color: selectedCat === cat ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '6px',
              padding: '6px 12px',
            }}
          >
            <Search size={14} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search guides, firmware..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                width: '180px',
              }}
            />
          </div>
        </div>

        {/* Download Feedback Toast */}
        {downloadSuccessToast && (
          <div 
            style={{
              maxWidth: '900px',
              margin: '0 auto 20px',
              padding: '12px 18px',
              borderRadius: '6px',
              background: 'rgba(0, 255, 136, 0.15)',
              border: '1px solid var(--color-green)',
              color: 'var(--color-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <CheckCircle2 size={16} />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Downloads Table List */}
        <div 
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            background: 'rgba(11, 18, 14, 0.8)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {filteredItems.map((item, idx) => (
            <div 
              key={item.id}
              style={{
                padding: '18px 24px',
                borderBottom: idx < filteredItems.length - 1 ? '1px solid rgba(255, 255, 255, 0.06)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div 
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.category === 'Firmware' ? 'var(--color-cyan)' : 'var(--color-green)',
                    flexShrink: 0,
                  }}
                >
                  {item.category === 'Firmware' && <Cpu size={20} />}
                  {item.category === 'Wiring' && <Wrench size={20} />}
                  {(item.category === 'Manuals' || item.category === 'Brochures') && <FileText size={20} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span 
                      style={{
                        padding: '2px 6px',
                        borderRadius: '3px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        fontSize: '10px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-green)',
                      }}
                    >
                      {item.category.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.product} · {item.version}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div className="hide-mobile" style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#fff', fontFamily: 'var(--font-mono)' }}>
                    {item.fileSize}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    Updated {item.date}
                  </div>
                </div>

                <button
                  onClick={() => handleSimulateDownload(item)}
                  className="btn-glow"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    background: 'var(--color-green)',
                    color: '#060a08',
                    fontWeight: 700,
                    fontSize: '12px',
                    fontFamily: 'var(--font-mono)',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No technical documents match your filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};