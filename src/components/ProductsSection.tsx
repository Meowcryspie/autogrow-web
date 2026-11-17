import React, { useState } from 'react';
import { products } from '../data/mockProducts';
import type { ProductItem, ProductCategory } from '../types';
import { ArrowUpRight, Cpu, Layers, Activity, Cloud, Check, Droplets } from 'lucide-react';

interface ProductsSectionProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onSelectProduct }) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((p: ProductItem) => p.category === activeCategory);

  const categories: { id: ProductCategory; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Equipment', icon: <Layers size={13} /> },
    { id: 'controllers', label: 'Master Controllers', icon: <Cpu size={13} /> },
    { id: 'dosing-skids', label: 'Fertigation & Skids', icon: <Droplets size={13} /> },
    { id: 'sensors', label: 'Precision Sensory Bus', icon: <Activity size={13} /> },
    { id: 'software', label: 'Agronomy Software', icon: <Cloud size={13} /> },
  ];

  return (
    <section 
      id="products" 
      style={{
        padding: '96px 0',
        background: 'var(--bg-void)',
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
            <Cpu size={14} />
            Horticultural Instrumentation Catalog
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
            Commercial Controllers, Dosing Skids & Sensors
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Every controller is engineered for 24/7 continuous duty in corrosive, high-humidity CEA environments. 
            Featuring 2.5 kV galvanic isolation, industrial terminal blocks, and fail-safe hardware overrides.
          </p>

          {/* Category Tabs */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '28px',
            }}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid var(--border-subtle)',
                  background: activeCategory === cat.id 
                    ? 'rgba(0, 229, 117, 0.12)' 
                    : 'var(--bg-surface)',
                  color: activeCategory === cat.id ? 'var(--color-green)' : 'var(--text-secondary)',
                  transition: 'all 0.14s ease',
                  textTransform: 'uppercase',
                }}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (TrolMaster Tactile Panels) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '20px',
          }}
        >
          {filteredProducts.map((product: ProductItem) => (
            <div 
              key={product.id}
              className="panel-chassis"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
              }}
            >
              <div>
                {/* Image Frame */}
                <div 
                  style={{
                    position: 'relative',
                    height: '210px',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.8) contrast(1.15)',
                    }}
                  />
                  <div 
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.1) 0%, rgba(7, 11, 8, 0.85) 100%)',
                    }}
                  />

                  {/* Decal Badges on Top */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      display: 'flex',
                      gap: '6px',
                    }}
                  >
                    <span className="decal-badge" style={{ color: 'var(--color-green)', borderColor: 'rgba(0, 229, 117, 0.4)' }}>
                      {product.modelCode}
                    </span>
                    {product.badge && (
                      <span className="decal-badge" style={{ color: '#FFFFFF' }}>
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {product.capacity && (
                    <div 
                      style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '12px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--color-cyan)',
                        fontWeight: 600,
                      }}
                    >
                      {product.capacity}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div style={{ padding: '22px' }}>
                  <h3 
                    className="font-display"
                    style={{
                      fontSize: '20px',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginBottom: '4px',
                    }}
                  >
                    {product.name}
                  </h3>

                  <div 
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--color-green)',
                      fontFamily: 'var(--font-mono)',
                      marginBottom: '12px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {product.tagline}
                  </div>

                  <p 
                    style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      marginBottom: '18px',
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Specs Matrix */}
                  <div 
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      padding: '12px',
                      background: 'var(--bg-void)',
                      borderRadius: '2px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '18px',
                    }}
                  >
                    {product.specs.slice(0, 4).map((spec: { label: string; value: string }, i: number) => (
                      <div key={i}>
                        <div style={{ fontSize: '9.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                          {spec.label}
                        </div>
                        <div style={{ fontSize: '12px', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {product.keyFeatures.slice(0, 3).map((f: string, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                        <Check size={13} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div 
                style={{
                  padding: '14px 22px',
                  background: 'var(--bg-void)',
                  borderTop: '1px solid var(--border-subtle)',
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
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-green)',
                    fontSize: '12px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    padding: 0,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  Wiring & Pinouts
                  <ArrowUpRight size={13} />
                </button>

                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  IP66 CEA RATED
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};