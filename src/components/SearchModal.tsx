import React, { useState } from 'react';
import { products, DOWNLOADS_DATA, CROP_SOLUTIONS_DATA, DISTRIBUTORS_DATA } from '../data/mockProducts';
import type { ProductItem, CropSolution, DownloadItem, DistributorLocation } from '../types';
import { Search, X, Cpu, FileText, ArrowRight, Sprout, MapPin } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectProduct,
  onNavigateToSection
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === '' ? [] : products.filter((p: ProductItem) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.modelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCrops = searchTerm.trim() === '' ? [] : CROP_SOLUTIONS_DATA.filter((c: CropSolution) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.scientificGroup.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDownloads = searchTerm.trim() === '' ? [] : DOWNLOADS_DATA.filter((d: DownloadItem) => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDistributors = searchTerm.trim() === '' ? [] : DISTRIBUTORS_DATA.filter((dist: DistributorLocation) =>
    dist.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dist.territory.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dist.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(4, 7, 5, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '80px',
        paddingLeft: '20px',
        paddingRight: '20px',
      }}
      onClick={onClose}
    >
      <div 
        className="panel-chassis"
        style={{
          width: '100%',
          maxWidth: '720px',
          overflow: 'hidden',
          borderRadius: '4px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div 
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Search size={18} style={{ color: 'var(--color-green)' }} />
          <input 
            type="text"
            autoFocus
            placeholder="Search controllers (MGC-Pro), crops (tomatoes), distributors, manuals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '15px',
              fontFamily: 'var(--font-mono)',
              outline: 'none',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px' }}>
          {searchTerm.trim() === '' ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              <div style={{ marginBottom: '8px' }}>Type to search Autogrow hardware, crops, distributors, or CAD schematics...</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '12px', flexWrap: 'wrap' }}>
                {['MGC-Pro', 'SatuGrow FertiX', 'Strawberries', 'Tomatoes', 'Distributors', 'CAD'].map((tag) => (
                  <span 
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="decal-badge"
                    style={{ cursor: 'pointer', color: 'var(--color-green)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Product Matches */}
              {filteredProducts.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Hardware Systems & Skids ({filteredProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredProducts.map((p: ProductItem) => (
                      <div 
                        key={p.id}
                        onClick={() => { onSelectProduct(p); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '2px',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.14s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-void)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Cpu size={14} style={{ color: 'var(--color-green)' }} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-green)', fontWeight: 700 }}>
                            [{p.modelCode}]
                          </span>
                          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>{p.name}</span>
                        </div>
                        <ArrowRight size={13} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crop Matches */}
              {filteredCrops.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Crop Profiles & Steering ({filteredCrops.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredCrops.map((c: CropSolution) => (
                      <div 
                        key={c.id}
                        onClick={() => { onNavigateToSection('crops'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '2px',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-void)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Sprout size={14} style={{ color: 'var(--color-green)' }} />
                          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>{c.name}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>({c.scientificGroup})</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>{c.targetVPD}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Distributor Matches */}
              {filteredDistributors.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Where to Buy (Distributors) ({filteredDistributors.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredDistributors.map((d: DistributorLocation) => (
                      <div 
                        key={d.id}
                        onClick={() => { onNavigateToSection('distributors'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '2px',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-void)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <MapPin size={14} style={{ color: 'var(--color-green)' }} />
                          <span style={{ fontSize: '13px', color: '#FFFFFF', fontWeight: 600 }}>{d.partnerName}</span>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>({d.country})</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>{d.supportPhone}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation Matches */}
              {filteredDownloads.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Technical Documentation & CAD ({filteredDownloads.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredDownloads.map((d: DownloadItem) => (
                      <div 
                        key={d.id}
                        onClick={() => { onNavigateToSection('support'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '2px',
                          background: 'var(--bg-void)',
                          border: '1px solid var(--border-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-elevated)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-void)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={14} style={{ color: 'var(--color-cyan)' }} />
                          <span style={{ fontSize: '13px', color: '#FFFFFF' }}>{d.title}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{d.fileSize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && filteredCrops.length === 0 && filteredDistributors.length === 0 && filteredDownloads.length === 0 && (
                <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
                  No matches found for "{searchTerm}".
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};