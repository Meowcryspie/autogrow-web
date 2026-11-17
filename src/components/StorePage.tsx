import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, CheckCircle2, Search } from 'lucide-react';
import { STORE_PRODUCTS } from '../data/mockProducts';
import type { StoreProduct } from '../types';

interface StorePageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const StorePage: React.FC<StorePageProps> = ({ onBackToHome, onNavigateToSection }) => {
  const [selectedCat, setSelectedCat] = useState<'all' | 'probes' | 'sensors' | 'parts' | 'calibration'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<{ product: StoreProduct; quantity: number }[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories: { id: 'all' | 'probes' | 'sensors' | 'parts' | 'calibration'; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'probes', label: 'pH & EC Probes' },
    { id: 'sensors', label: 'Sensory Pods & Meters' },
    { id: 'parts', label: 'Replacement Parts & Pumps' },
    { id: 'calibration', label: 'Calibration Standards' },
  ];

  const filteredProducts = STORE_PRODUCTS.filter(p => {
    const matchesCat = selectedCat === 'all' || p.category === selectedCat;
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.modelCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleAddToCart = (product: StoreProduct) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setToastMessage(`Added ${product.name} to quote cart`);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalCartValue = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '40px', paddingBottom: '96px' }}>
      
      {/* Top Breadcrumb & Cart Header */}
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '36px' }}>
        <button
          onClick={onBackToHome}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'none',
            border: 'none',
            color: '#6B7280',
            fontWeight: 600,
            fontSize: '14px',
            cursor: 'pointer',
            padding: '6px 0',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </button>

        {/* Cart Trigger Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#111827',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '10px 20px',
            fontWeight: 700,
            fontSize: '13.5px',
            cursor: 'pointer',
          }}
        >
          <ShoppingCart size={16} />
          Quote Cart ({totalCartCount})
          {totalCartCount > 0 && (
            <span style={{ backgroundColor: '#76b82a', color: '#FFFFFF', padding: '2px 8px', borderRadius: '999px', fontSize: '11px' }}>
              ${totalCartValue}
            </span>
          )}
        </button>
      </div>

      {/* Hero Header */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div style={{ maxWidth: '800px' }}>
          <div 
            style={{
              display: 'inline-block',
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            Direct Commercial AgTech Store
          </div>

          <h1 
            style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Sensors, Replacement Probes & Spares
          </h1>

          <p style={{ fontSize: '17px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
            Order genuine factory replacement sensors, peristaltic cartridges, toroidal conductivity probes, and NIST-traceable calibration standards with fast worldwide dispatch.
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="container" style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#DCFCE7', color: '#15803D', padding: '12px 18px', borderRadius: '8px', border: '1px solid #86EFAC', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} />
            {toastMessage}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="container" style={{ marginBottom: '40px' }}>
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            padding: '16px 20px',
            backgroundColor: '#F9FAFB',
            borderRadius: '12px',
            border: '1px solid #E5E7EB',
          }}
        >
          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: selectedCat === cat.id ? '1px solid #76b82a' : '1px solid #D1D5DB',
                  backgroundColor: selectedCat === cat.id ? '#F0FDF4' : '#FFFFFF',
                  color: selectedCat === cat.id ? '#15803D' : '#4B5563',
                  transition: 'all 0.15s',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FFFFFF', padding: '8px 14px', borderRadius: '8px', border: '1px solid #D1D5DB', width: '260px' }}>
            <Search size={14} style={{ color: '#9CA3AF' }} />
            <input 
              type="text" 
              placeholder="Search probes, parts, codes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', outline: 'none', fontSize: '13px', width: '100%', color: '#111827' }}
            />
          </div>
        </div>
      </div>

      {/* Store Products Grid */}
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px',
          }}
        >
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
              }}
            >
              {/* Product Image */}
              <div style={{ position: 'relative', height: '190px', backgroundColor: '#F9FAFB', overflow: 'hidden' }}>
                <img 
                  src={p.image} 
                  alt={p.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    letterSpacing: '0.04em',
                  }}
                >
                  [{p.modelCode}]
                </span>

                <span 
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: '#DCFCE7',
                    color: '#15803D',
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '4px',
                  }}
                >
                  IN STOCK
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                    {p.name}
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#6B7280', lineHeight: 1.5, margin: '0 0 12px 0' }}>
                    {p.description}
                  </p>
                  <div style={{ fontSize: '11.5px', color: '#15803D', fontFamily: 'monospace', fontWeight: 600, marginBottom: '16px' }}>
                    {p.specs}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F3F4F6', paddingTop: '14px' }}>
                  <div style={{ fontSize: '20px', fontWeight: 800, color: '#111827', fontFamily: 'monospace' }}>
                    ${p.price} <span style={{ fontSize: '12px', color: '#6B7280', fontWeight: 400 }}>USD</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    className="btn btn-primary"
                    style={{ padding: '8px 18px', fontSize: '12px' }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Commercial Skids Referral Strip */}
        <div style={{ marginTop: '56px', padding: '24px', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Looking for full commercial skid systems or turnkey automation?</h4>
            <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Explore our SatuGrow FertiX dosing rigs and multi-area greenhouse controllers.</p>
          </div>
          <button
            onClick={() => onNavigateToSection?.('suite')}
            className="btn btn-secondary"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Explore Master Controllers
          </button>
        </div>
      </div>

      {/* Cart Drawer Modal */}
      {isCartOpen && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3500,
            backgroundColor: 'rgba(17, 24, 39, 0.7)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div 
            style={{
              width: '100%',
              maxWidth: '460px',
              height: '100%',
              backgroundColor: '#FFFFFF',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  Commercial Quote Cart ({totalCartCount})
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '18px', fontWeight: 700 }}
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
                  <ShoppingCart size={40} style={{ margin: '0 auto 12px', color: '#D1D5DB' }} />
                  <p style={{ margin: 0 }}>Your cart is empty. Browse parts above.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '55vh', overflowY: 'auto' }}>
                  {cartItems.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #F3F4F6' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#111827' }}>{item.product.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>
                          ${item.product.price} × {item.quantity}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#111827' }}>
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '16px' }}>
                  <span>Total Estimated Cost:</span>
                  <span style={{ fontFamily: 'monospace' }}>${totalCartValue} USD</span>
                </div>
                <button
                  onClick={() => {
                    alert('Order inquiry dispatched! An Autogrow parts specialist will verify your facility voltage and shipping schedule within 1 business hour.');
                    setCartItems([]);
                    setIsCartOpen(false);
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '14px' }}
                >
                  Submit Commercial Parts Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
