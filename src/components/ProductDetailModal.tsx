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
        background: 'rgba(17, 25, 19, 0.65)',
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
          borderRadius: '6px',
          background: '#FFFFFF',
          boxShadow: 'var(--shadow-lg)',
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
            background: '#FFFFFF',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            width: '32px',
            height: '32px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            boxShadow: 'var(--shadow-sm)',
            transition: 'background 0.14s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-surface-subtle)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#FFFFFF')}
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
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(17, 25, 19, 0.1) 0%, rgba(17, 25, 19, 0.8) 100%)',
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
              <span className="decal-badge" style={{ background: 'var(--color-green-light)', color: 'var(--color-green-dark)', borderColor: '#86EFAC' }}>
                MODEL [{product.modelCode}]
              </span>
              {product.badge && (
                <span className="decal-badge" style={{ background: '#FFFFFF', color: 'var(--text-primary)', borderColor: 'var(--border-medium)' }}>
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
          
          <div style={{ fontSize: '12px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
            {product.tagline}
          </div>

          <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Technical Specifications Matrix */}
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
            Operating Tolerances & Technical Specifications
          </div>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '10px',
              background: 'var(--bg-surface-subtle)',
              padding: '16px',
              borderRadius: '4px',
              border: '1px solid var(--border-subtle)',
              marginBottom: '24px',
            }}
          >
            {product.specs.map((spec, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                  {spec.value}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                Hardware Bus Link
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {product.connectivity}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                Power Specification
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                {product.power}
              </div>
            </div>
          </div>

          {/* Terminal Block & Pinout Schematics (If Present) */}
          {product.terminalPinout && product.terminalPinout.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--color-green-dark)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
                <Terminal size={14} />
                Terminal Block & Wiring Pinout Breakdown
              </div>
              <div 
                style={{
                  background: 'var(--bg-surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '4px',
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
                      borderBottom: pIdx < (product.terminalPinout?.length || 0) - 1 ? '1px solid var(--border-subtle)' : 'none',
                      fontSize: '12px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    <span style={{ color: 'var(--color-green-dark)', fontWeight: 700 }}>{pin.terminal}</span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{pin.signal}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{pin.spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 700 }}>
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
              background: 'var(--bg-surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '4px',
              padding: '20px',
            }}
          >
            <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', margin: '0 0 10px 0', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              Request Direct Technical Wiring & Commercial Pricing
            </h4>
            
            {inquirySent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-green-dark)', padding: '16px 0' }}>
                <CheckCircle2 size={18} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600 }}>
                  Inquiry logged. An Autogrow technical field specialist will send the complete CAD schematics to your email within 1 business hour.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
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
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
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
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
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
