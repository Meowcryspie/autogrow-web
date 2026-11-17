import React, { useState } from 'react';
import type { ProductItem } from '../types';
import { X, CheckCircle2, Send, Check } from 'lucide-react';

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
    targetCrops: 'Vine Crops / Berries',
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
        background: 'rgba(0, 0, 0, 0.82)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: '#090f0c',
          border: '1px solid rgba(0, 255, 136, 0.3)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 255, 136, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: '#fff',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)')}
        >
          <X size={18} />
        </button>

        {/* Modal Header Frame */}
        <div 
          style={{
            position: 'relative',
            height: '220px',
            overflow: 'hidden',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <img 
            src={product.image} 
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.75)',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(9, 15, 12, 0.3) 0%, rgba(9, 15, 12, 0.95) 100%)',
            }}
          />
          <div 
            style={{
              position: 'absolute',
              bottom: '20px',
              left: '28px',
            }}
          >
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span 
                style={{
                  padding: '4px 10px',
                  background: 'rgba(0, 255, 136, 0.15)',
                  border: '1px solid var(--color-green)',
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
                    padding: '4px 10px',
                    background: 'rgba(0, 229, 255, 0.15)',
                    border: '1px solid var(--color-cyan)',
                    color: '#fff',
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
            <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#fff', margin: 0, fontFamily: 'var(--font-display)' }}>
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          
          <div style={{ fontSize: '13px', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)', marginBottom: '12px', textTransform: 'uppercase' }}>
            {product.tagline}
          </div>

          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
            {product.description}
          </p>

          {/* Technical Specifications Matrix */}
          <h4 style={{ fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: 'var(--color-green)', marginBottom: '12px' }}>
            Technical Specifications & Operating Limits
          </h4>

          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '10px',
              background: 'rgba(0, 0, 0, 0.4)',
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              marginBottom: '24px',
            }}
          >
            {product.specs.map((spec, idx) => (
              <div key={idx}>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {spec.label}
                </div>
                <div style={{ fontSize: '13px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                  {spec.value}
                </div>
              </div>
            ))}
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Hardware Bus
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {product.connectivity}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Power Supply
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>
                {product.power}
              </div>
            </div>
          </div>

          {/* Key Architectural Features */}
          <h4 style={{ fontSize: '14px', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', color: '#fff', marginBottom: '12px' }}>
            Engineering Capabilities
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '28px' }}>
            {product.keyFeatures.map((feat, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <Check size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          {/* Quotation / Distributor Inquiry Form */}
          <div 
            style={{
              background: 'rgba(16, 25, 20, 0.7)',
              border: '1px solid rgba(0, 255, 136, 0.25)',
              borderRadius: '8px',
              padding: '20px',
            }}
          >
            <h4 style={{ fontSize: '15px', color: '#fff', margin: '0 0 10px 0', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              Request Commercial Quote / Distributor Wiring Spec
            </h4>
            
            {inquirySent ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-green)', padding: '16px 0' }}>
                <CheckCircle2 size={20} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '14px' }}>
                  Thank you! An Autogrow technical specialist will send the complete CAD wiring schematic to your email within 1 business hour.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
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
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
                    Business Email
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="grower@cea-farm.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <button
                    type="submit"
                    className="btn-glow"
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--color-green)',
                      color: '#060a08',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    <Send size={15} />
                    Request Technical Specification Package
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