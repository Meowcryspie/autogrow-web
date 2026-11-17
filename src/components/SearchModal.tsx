import React, { useState } from 'react';
import { products, DOWNLOADS_DATA } from '../data/mockProducts';
import type { ProductItem } from '../types';
import { Search, X, Cpu, FileText, ArrowRight } from 'lucide-react';

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

  const filteredDownloads = searchTerm.trim() === '' ? [] : DOWNLOADS_DATA.filter(d => 
    d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 3000,
        background: 'rgba(0, 0, 0, 0.85)',
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
        style={{
          background: '#090f0c',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '680px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 136, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div 
          style={{
            padding: '18px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <Search size={20} style={{ color: 'var(--color-green)' }} />
          <input 
            type="text"
            autoFocus
            placeholder="Search products, models (MGC-Pro, ICC-2), manuals, firmware..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '16px',
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
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 24px' }}>
          {searchTerm.trim() === '' ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
              <div style={{ marginBottom: '8px' }}>Type to search Autogrow hardware, sensors, firmware or schematics...</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px' }}>
                {['MGC-Pro', 'ICC-2', 'IntelliDose', 'SMS-Pro', 'Firmware'].map((tag) => (
                  <span 
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    style={{
                      padding: '4px 8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--color-green)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Product Matches */}
              {filteredProducts.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Hardware Systems ({filteredProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredProducts.map((p: ProductItem) => (
                      <div 
                        key={p.id}
                        onClick={() => { onSelectProduct(p); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 255, 136, 0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Cpu size={16} style={{ color: 'var(--color-green)' }} />
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-green)', fontWeight: 700 }}>
                            [{p.modelCode}]
                          </span>
                          <span style={{ fontSize: '13px', color: '#fff', fontWeight: 600 }}>{p.name}</span>
                        </div>
                        <ArrowRight size={14} style={{ color: 'var(--text-muted)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation Matches */}
              {filteredDownloads.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Technical Documentation ({filteredDownloads.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredDownloads.map(d => (
                      <div 
                        key={d.id}
                        onClick={() => { onNavigateToSection('support'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0, 229, 255, 0.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={16} style={{ color: 'var(--color-cyan)' }} />
                          <span style={{ fontSize: '13px', color: '#fff' }}>{d.title}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{d.fileSize}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {filteredProducts.length === 0 && filteredDownloads.length === 0 && (
                <div style={{ padding: '30px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13px' }}>
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