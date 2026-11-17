import React, { useState } from 'react';
import { products } from '../data/mockProducts';
import type { ProductItem, ProductCategory } from '../types';
import { ArrowUpRight, Cpu, Layers, Activity, Cloud, Check } from 'lucide-react';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p: ProductItem) => p.category === activeCategory);

  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Hardware Systems', icon: <Layers size={14} /> },
    { id: 'climate', label: 'Climate Controllers', icon: <Cpu size={14} /> },
    { id: 'dosing', label: 'Fertigation & Dosing', icon: <Cpu size={14} /> },
    { id: 'sensors', label: 'Sensory Probes', icon: <Activity size={14} /> },
    { id: 'cloud', label: 'Cloud & Telemetry', icon: <Cloud size={14} /> },
  ];

  return (
    <section 
      id="products" 
      style={{
        padding: '100px 0',
        background: 'var(--bg-main)',
        position: 'relative',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '50px' }}>
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
            <Cpu size={14} />
            Hardware Lineup
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
            Controllers, Dosing & Sensing
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '720px', lineHeight: 1.6 }}>
            Every controller is designed for 24/7 continuous operation in harsh greenhouse conditions, featuring industrial-grade galvanic isolation and fail-safe hardware overrides.
          </p>

          {/* Category Tabs */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '10px',
              marginTop: '30px',
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: activeCategory === cat.id 
                    ? 'rgba(0, 255, 136, 0.12)' 
                    : 'rgba(255, 255, 255, 0.02)',
                  color: activeCategory === cat.id ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProducts.map((product: ProductItem) => (
            <div 
              key={product.id}
              className="card-tactical"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
              }}
            >
              <div>
                {/* Product Image Frame */}
                <div 
                  style={{
                    position: 'relative',
                    height: '220px',
                    overflow: 'hidden',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.85) contrast(1.1)',
                      transition: 'transform 0.5s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />

                  {/* Gradient Overlay */}
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(6, 10, 8, 0.2) 0%, rgba(6, 10, 8, 0.9) 100%)',
                    }}
                  />

                  {/* Badges */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '14px',
                      left: '14px',
                      display: 'flex',
                      gap: '8px',
                    }}
                  >
                    <span 
                      style={{
                        padding: '4px 8px',
                        background: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(0, 255, 136, 0.4)',
                        color: 'var(--color-green)',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        borderRadius: '4px',
                      }}
                    >
                      {product.modelCode}
                    </span>
                    {product.badge && (
                      <span 
                        style={{
                          padding: '4px 8px',
                          background: 'rgba(0, 229, 255, 0.2)',
                          border: '1px solid rgba(0, 229, 255, 0.5)',
                          color: '#ffffff',
                          fontSize: '10px',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '24px' }}>
                  <h3 
                    style={{
                      fontSize: '20px',
                      fontWeight: 700,
                      color: '#ffffff',
                      marginBottom: '6px',
                    }}
                  >
                    {product.name}
                  </h3>
                  <div 
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-cyan)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '14px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.tagline}
                  </div>
                  <p 
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '20px',
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Quick Specs Matrix */}
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(0, 0, 0, 0.35)',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      marginBottom: '20px',
                    }}
                  >
                    {product.specs.slice(0, 4).map((spec: { label: string; value: string }, i: number) => (
                      <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {spec.label}
                        </span>
                        <span style={{ fontSize: '12px', color: '#ffffff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                    {product.keyFeatures.slice(0, 3).map((f: string, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <Check size={14} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div 
                style={{
                  padding: '16px 24px',
                  background: 'rgba(0, 0, 0, 0.25)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <button
                  onClick={() => onSelectProduct(product)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-green)',
                    fontSize: '13px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  SPECIFICATIONS & WIRING
                  <ArrowUpRight size={14} />
                </button>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  IP65 CEA
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};