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
    { id: 'all', label: 'All Equipment', icon: <Layers size={14} /> },
    { id: 'controllers', label: 'Master Controllers', icon: <Cpu size={14} /> },
    { id: 'dosing-skids', label: 'Fertigation & Skids', icon: <Droplets size={14} /> },
    { id: 'sensors', label: 'Sensory Bus & Probes', icon: <Activity size={14} /> },
    { id: 'software', label: 'Agronomy Software', icon: <Cloud size={14} /> },
  ];

  return (
    <section 
      id="products" 
      style={{
        padding: '96px 0',
        background: '#FFFFFF',
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
              fontSize: '11.5px',
              color: 'var(--color-green-dark)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              fontWeight: 700,
            }}
          >
            <Cpu size={15} color="var(--color-green)" />
            Commercial Hardware & Dosing Catalog
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              margin: '0 0 16px 0',
            }}
          >
            Controllers, Inline Skids & Sensor Networks
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Every controller is built for 24/7 continuous duty in commercial greenhouses and vertical farms. 
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
                  padding: '9px 18px',
                  borderRadius: '4px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: activeCategory === cat.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid var(--border-subtle)',
                  background: activeCategory === cat.id 
                    ? 'var(--color-green-light)' 
                    : 'var(--bg-surface-subtle)',
                  color: activeCategory === cat.id ? 'var(--color-green-text)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  boxShadow: activeCategory === cat.id ? '0 1px 2px rgba(22, 163, 74, 0.2)' : 'none',
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
              className="panel-chassis"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                background: '#FFFFFF',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div>
                {/* Image Frame */}
                <div 
                  style={{
                    position: 'relative',
                    height: '220px',
                    overflow: 'hidden',
                    borderBottom: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface-subtle)',
                  }}
                >
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'contrast(1.05)',
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
                    <span 
                      style={{ 
                        padding: '3px 8px', 
                        borderRadius: '3px', 
                        background: '#FFFFFF', 
                        color: 'var(--color-green-dark)', 
                        fontFamily: 'var(--font-mono)', 
                        fontSize: '11px', 
                        fontWeight: 700,
                        border: '1px solid var(--border-subtle)',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                    >
                      {product.modelCode}
                    </span>
                    {product.badge && (
                      <span 
                        style={{ 
                          padding: '3px 8px', 
                          borderRadius: '3px', 
                          background: 'rgba(255, 255, 255, 0.92)', 
                          color: 'var(--text-primary)', 
                          fontSize: '10px', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
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
                        fontSize: '11.5px',
                        fontFamily: 'var(--font-mono)',
                        color: '#FFFFFF',
                        fontWeight: 700,
                        background: 'rgba(17, 25, 19, 0.75)',
                        padding: '2px 8px',
                        borderRadius: '3px',
                      }}
                    >
                      {product.capacity}
                    </div>
                  )}
                </div>

                {/* Body Content */}
                <div style={{ padding: '24px' }}>
                  <h3 
                    className="font-display"
                    style={{
                      fontSize: '22px',
                      fontWeight: 800,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {product.name}
                  </h3>

                  <div 
                    style={{
                      fontSize: '12px',
                      color: 'var(--color-green-dark)',
                      fontWeight: 700,
                      marginBottom: '12px',
                    }}
                  >
                    {product.tagline}
                  </div>

                  <p 
                    style={{
                      fontSize: '13.5px',
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
                      background: 'var(--bg-surface-subtle)',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '18px',
                    }}
                  >
                    {product.specs.slice(0, 4).map((spec: { label: string; value: string }, i: number) => (
                      <div key={i}>
                        <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                          {spec.label}
                        </div>
                        <div style={{ fontSize: '12.5px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Features Bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {product.keyFeatures.slice(0, 3).map((f: string, i: number) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        <Check size={14} color="var(--color-green)" style={{ flexShrink: 0 }} />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div 
                style={{
                  padding: '14px 24px',
                  background: 'var(--bg-surface-subtle)',
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
                    color: 'var(--color-green-dark)',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Wiring & Technical Specs
                  <ArrowUpRight size={14} />
                </button>

                <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600 }}>
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