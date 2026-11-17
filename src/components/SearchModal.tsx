import React, { useState } from 'react';
import { products, DOWNLOADS_DATA, CROP_SOLUTIONS_DATA, DISTRIBUTORS_DATA, STORE_PRODUCTS, BLOG_POSTS } from '../data/mockProducts';
import type { ProductItem, CropSolution, DownloadItem, DistributorLocation, StoreProduct, BlogPost } from '../types';
import { Search, X, Cpu, ArrowRight, Sprout, MapPin, FileText, ShoppingBag, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: ProductItem) => void;
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToPage: (page: 'home' | 'about' | 'blog' | 'store') => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectProduct,
  onNavigateToSection,
  onNavigateToPage
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredProducts = searchTerm.trim() === '' ? [] : products.filter((p: ProductItem) => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.modelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStoreProducts = searchTerm.trim() === '' ? [] : STORE_PRODUCTS.filter((sp: StoreProduct) =>
    sp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sp.modelCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sp.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBlogPosts = searchTerm.trim() === '' ? [] : BLOG_POSTS.filter((bp: BlogPost) =>
    bp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bp.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bp.category.toLowerCase().includes(searchTerm.toLowerCase())
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
    dist.partnerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: 'rgba(17, 25, 19, 0.65)',
        backdropFilter: 'blur(8px)',
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
          width: '100%',
          maxWidth: '720px',
          overflow: 'hidden',
          borderRadius: '12px',
          background: '#FFFFFF',
          boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div 
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid #E5E7EB',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: '#FFFFFF',
          }}
        >
          <Search size={18} style={{ color: '#76b82a' }} />
          <input 
            type="text"
            autoFocus
            placeholder="Search controllers (MultiGrow), probes (pH Sense), blog articles, CAD..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              color: '#111827',
              fontSize: '15px',
              outline: 'none',
            }}
          />
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9CA3AF',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results Body */}
        <div style={{ maxHeight: '60vh', overflowY: 'auto', padding: '16px 20px', background: '#F9FAFB' }}>
          {searchTerm.trim() === '' ? (
            <div style={{ padding: '24px 0', textAlign: 'center', color: '#6B7280', fontSize: '13px' }}>
              <div style={{ marginBottom: '8px' }}>Type to search Autogrow hardware, store spares, blog guides, or distributors:</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
                {['MultiGrow', 'pH Sense', 'EC Toroidal', 'Monsoon Humidity', 'Distributors', 'CAD'].map((tag) => (
                  <span 
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    style={{
                      cursor: 'pointer',
                      padding: '4px 12px',
                      borderRadius: '9999px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#15803D',
                    }}
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
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Commercial Controller Systems ({filteredProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredProducts.map((p: ProductItem) => (
                      <div 
                        key={p.id}
                        onClick={() => { onSelectProduct(p); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Cpu size={15} style={{ color: '#76b82a' }} />
                          <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 700, fontFamily: 'monospace' }}>
                            [{p.modelCode}]
                          </span>
                          <span style={{ fontSize: '13.5px', color: '#111827', fontWeight: 600 }}>{p.name}</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#9CA3AF' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Store Product Spares */}
              {filteredStoreProducts.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Direct Parts & Probes Store ({filteredStoreProducts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredStoreProducts.map((sp: StoreProduct) => (
                      <div 
                        key={sp.id}
                        onClick={() => { onNavigateToPage('store'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <ShoppingBag size={15} style={{ color: '#15803D' }} />
                          <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 700, fontFamily: 'monospace' }}>
                            [{sp.modelCode}]
                          </span>
                          <span style={{ fontSize: '13.5px', color: '#111827', fontWeight: 600 }}>{sp.name}</span>
                          <span style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>${sp.price}</span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#15803D', fontWeight: 700 }}>In Store →</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grower Blog Articles */}
              {filteredBlogPosts.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Grower Blog Guides ({filteredBlogPosts.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredBlogPosts.map((bp: BlogPost) => (
                      <div 
                        key={bp.id}
                        onClick={() => { onNavigateToPage('blog'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <BookOpen size={15} style={{ color: '#0284C7' }} />
                          <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{bp.title}</span>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>({bp.category})</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#9CA3AF' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Crop Profiles */}
              {filteredCrops.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Crop Profiles & Steering ({filteredCrops.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredCrops.map((c: CropSolution) => (
                      <div 
                        key={c.id}
                        onClick={() => { onNavigateToSection('showcase'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Sprout size={15} style={{ color: '#76b82a' }} />
                          <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{c.name}</span>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>({c.scientificGroup})</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#9CA3AF' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Downloads Matches */}
              {filteredDownloads.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Technical Manuals & CAD ({filteredDownloads.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredDownloads.map((d: DownloadItem) => (
                      <div 
                        key={d.id}
                        onClick={() => { onNavigateToSection('where-to-buy'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <FileText size={15} style={{ color: '#0284C7' }} />
                          <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{d.title}</span>
                          <span style={{ fontSize: '11px', color: '#6B7280', fontFamily: 'monospace' }}>({d.fileSize})</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#9CA3AF' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Distributor Matches */}
              {filteredDistributors.length > 0 && (
                <div>
                  <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 700, letterSpacing: '0.05em' }}>
                    Distributors & Support ({filteredDistributors.length})
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {filteredDistributors.map((dist: DistributorLocation) => (
                      <div 
                        key={dist.id}
                        onClick={() => { onNavigateToSection('where-to-buy'); onClose(); }}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '8px',
                          background: '#FFFFFF',
                          border: '1px solid #E5E7EB',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <MapPin size={15} style={{ color: '#76b82a' }} />
                          <span style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{dist.partnerName}</span>
                          <span style={{ fontSize: '11px', color: '#6B7280' }}>({dist.country})</span>
                        </div>
                        <ArrowRight size={13} style={{ color: '#9CA3AF' }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
