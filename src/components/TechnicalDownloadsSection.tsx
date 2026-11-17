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
  Search,
  Box
} from 'lucide-react';

export const TechnicalDownloadsSection: React.FC = () => {
  const [selectedCat, setSelectedCat] = useState<'All' | 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures' | 'CAD'>('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [downloadSuccessToast, setDownloadSuccessToast] = useState<string | null>(null);

  const categories: ('All' | 'Manuals' | 'Firmware' | 'Wiring' | 'Brochures' | 'CAD')[] = [
    'All',
    'Manuals',
    'Firmware',
    'CAD',
    'Wiring',
    'Brochures',
  ];

  const filteredItems = DOWNLOADS_DATA.filter((item: DownloadItem) => {
    const matchesCat = selectedCat === 'All' || item.category === selectedCat;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.product.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSimulateDownload = (item: DownloadItem) => {
    setDownloadSuccessToast(`Packaging ${item.title} (${item.fileSize})...`);
    setTimeout(() => {
      setDownloadSuccessToast(null);
    }, 3500);
  };

  return (
    <section 
      id="support" 
      style={{
        padding: '96px 0',
        background: 'var(--bg-primary)',
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
            <HardDriveDownload size={14} />
            Support & Documentation
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
            Technical Downloads, CAD & Firmware
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Direct access to production firmware binaries (v1.4.2), CAD 3D DXF schematics, relay snubber wiring guides, and CE/FCC compliance certificates.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div 
          className="panel-chassis"
          style={{
            maxWidth: '960px',
            padding: '14px 20px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            marginBottom: '24px',
          }}
        >
          {/* Category Tabs */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '2px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCat === cat 
                    ? '1px solid var(--color-green)' 
                    : '1px solid var(--border-subtle)',
                  background: selectedCat === cat 
                    ? 'rgba(0, 229, 117, 0.12)' 
                    : 'var(--bg-void)',
                  color: selectedCat === cat ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'all 0.14s ease',
                  textTransform: 'uppercase',
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
              background: 'var(--bg-void)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '2px',
              padding: '6px 12px',
            }}
          >
            <Search size={13} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text"
              placeholder="Search guides, firmware, CAD..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#FFFFFF',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                outline: 'none',
                width: '190px',
              }}
            />
          </div>
        </div>

        {/* Download Feedback Toast */}
        {downloadSuccessToast && (
          <div 
            style={{
              maxWidth: '960px',
              marginBottom: '16px',
              padding: '12px 18px',
              borderRadius: '3px',
              background: 'rgba(0, 229, 117, 0.12)',
              border: '1px solid var(--color-green)',
              color: 'var(--color-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '12px',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <CheckCircle2 size={15} />
            <span>{downloadSuccessToast}</span>
          </div>
        )}

        {/* Downloads Table List */}
        <div 
          className="panel-chassis"
          style={{
            maxWidth: '960px',
            overflow: 'hidden',
          }}
        >
          {filteredItems.map((item: DownloadItem, idx: number) => (
            <div 
              key={item.id}
              style={{
                padding: '16px 20px',
                borderBottom: idx < filteredItems.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'background 0.14s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div 
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '2px',
                    background: 'var(--bg-void)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: item.category === 'Firmware' ? 'var(--color-cyan)' : 'var(--color-green)',
                    flexShrink: 0,
                  }}
                >
                  {item.category === 'Firmware' && <Cpu size={18} />}
                  {item.category === 'Wiring' && <Wrench size={18} />}
                  {item.category === 'CAD' && <Box size={18} />}
                  {(item.category === 'Manuals' || item.category === 'Brochures') && <FileText size={18} />}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span className="decal-badge">
                      {item.category}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {item.product} · {item.version}
                    </span>
                  </div>
                  <h4 style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF', margin: 0 }}>
                    {item.title}
                  </h4>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
                <div className="hide-mobile" style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '11px', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>
                    {item.fileSize}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                    {item.date}
                  </div>
                </div>

                <button
                  onClick={() => handleSimulateDownload(item)}
                  className="btn-machine-primary"
                  style={{
                    padding: '6px 14px',
                    fontSize: '11px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Download size={13} />
                  Download
                </button>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div style={{ padding: '36px', textAlign: 'center', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              No technical documents match your filter.
            </div>
          )}
        </div>

      </div>
    </section>
  );
};