import React, { useState } from 'react';
import type { ProductItem } from '../types';
import { X, CheckCircle2, Send, Check, Terminal } from 'lucide-react';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    facilityType: 'Commercial Greenhouse',
    targetCrops: 'High-Wire Vine Crops',
  });

  if (!product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      onClose();
    }, 2800);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        background: 'rgba(4, 7, 5, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div 
        className="panel-chassis"
        style={{
          width: '100%',
          maxWidth: '860px',
          maxHeight: '92vh',
          overflowY: 'auto',
          position: 'relative',
          borderRadius: '4px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-subtle)',
            color: '#FFFFFF',
            width: '32px',
            height: '32px',
            borderRadius: '2px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.14s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)')}
        >
          <X size={16} />
        </button>

        {/* Modal Header Frame */}
        <div 
          style={{
            position: 'relative',
            height: '200px',
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
              filter: 'brightness(0.65) contrast(1.15)',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(7, 11, 8, 0.2) 0%, rgba(7, 11, 8, 0.95) 100%)',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '28px',
              right: '28px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="decal-badge" style={{ color: 'var(--color-green)', borderColor: 'rgba(0, 229, 117, 0.4)' }}>
                MODEL [{product.modelCode}]
              </span>
              {product.badge && (
                <span className="decal-badge" style={{ color: '#FFFFFF', borderColor: 'var(--border-medium)' }}>
                  {product.badge}
                </span>
              )}
            </div>
            <h2 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          
          <div style={{ fontSize: '12px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '12px', textTransform: 'uppercase' }}>
            {product.tagline}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Technical Specifications Matrix */}
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Operating Tolerances & Technical Specifications
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px',
              background: 'var(--bg-void)',
              padding: '16px',
              borderRadius: '3px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '24px',
            }}
          >
            {product.specs.map((spec, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {spec.value}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Hardware Bus Link
              </div>
              <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {product.connectivity}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Power Specification
              </div>
              <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {product.power}
              </div>
            </div>
          </div>

          {/* Terminal Block & Pinout Schematics (If Present) */}
          {product.terminalPinout && product.terminalPinout.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--color-green)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px' }}>
                <Terminal size={14} />
                Terminal Block & Wiring Pinout Breakdown
              </div>
              <div 
                style={{
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '3px',
                  overflow: 'hidden',
                }}
              >
                {product.terminalPinout.map((pin, pIdx) => (
                  <div 
                    key={pIdx}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 1fr 1fr',
                      gap: '12px',
                      padding: '10px 14px',
                      borderBottom: pIdx < (product.terminalPinout?.length || 0) - 1 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span style={{ color: 'var(--color-green)', fontWeight: 700 }}>{pin.terminal}</span>
                    <span style={{ color: '#FFFFFF' }}>{pin.signal}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{pin.spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px' }}>
            Engineering Capabilities
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '28px' }}>
            {product.keyFeatures.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Check size={14} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Quotation / Distributor Inquiry Form */}
          <div 
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderTop: '1px solid var(--border-chamfer)',
              borderRadius: '3px',
              padding: '20px',
            }}
          >
            <h4 style={{ fontSize: '14px', color: '#FFFFFF', margin: '0 0 10px 0', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Request Direct Technical Wiring & Commercial Pricing
            </h4>
            
            {inquirySent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-green)', padding: '16px 0' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  Inquiry logged. An Autogrow technical field specialist will send the complete CAD schematics to your email within 1 business hour.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                    Grower / Lead Engineer Name
                  </label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. Alex Campbell"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--bg-void)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '3px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                    Business Email
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="engineer@cea-facility.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'var(--bg-void)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '3px',
                      color: '#FFFFFF',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <button
                    type="submit"
                    className="btn-machine-primary"
                    style={{ width: '100%' }}
                  >
                    <Send size={14} />
                    Dispatch Technical Schematics Package
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};