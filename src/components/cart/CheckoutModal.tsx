import React, { useState } from 'react';
import { X, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { createOrder } from '../../services/orderService';
import type { OrderItem } from '../../types/orders';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: { product: any; quantity: number }[];
  totalValue: number;
  onOrderSuccess: (orderNumber: string) => void;
  onRequireAuth: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalValue,
  onOrderSuccess,
  onRequireAuth
}) => {
  const { user, profile } = useAuth();

  const [customerName, setCustomerName] = useState(profile?.full_name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [facilityVoltage, setFacilityVoltage] = useState('220-240V (Standard Australasia/Europe)');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  // If user is not logged in, prompt to log in first
  if (!user) {
    return (
      <div 
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}
        onClick={onClose}
      >
        <div 
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '100%',
            padding: '32px',
            textAlign: 'center',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            position: 'relative'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>

          <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <ShieldCheck size={28} color="#15803D" />
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 8px' }}>
            Sign In to Complete Order
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 24px', lineHeight: 1.5 }}>
            To ensure genuine commercial warranty, direct engineering support, and order tracking, please sign in or register your farm.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => {
                onClose();
                onRequireAuth();
              }}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#76b82a',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Sign In / Register Account
            </button>
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: 'transparent',
                color: '#6B7280',
                border: 'none',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              Continue Browsing Store
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName.trim() || !customerEmail.trim() || !shippingAddress.trim()) {
      setError('Please provide your name, contact email, and facility delivery address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = `AG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const orderItems: OrderItem[] = cartItems.map(item => ({
        id: String(item.product.id),
        name: item.product.name,
        modelCode: item.product.modelCode,
        quantity: item.quantity,
        price: item.product.price,
        category: item.product.category
      }));

      await createOrder({
        order_number: orderNumber,
        user_id: user.id,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        customer_phone: customerPhone.trim() || undefined,
        company_name: companyName.trim() || undefined,
        facility_voltage: facilityVoltage,
        shipping_address: shippingAddress.trim(),
        total_amount: totalValue,
        items: orderItems,
        status: 'pending',
        notes: notes.trim() || undefined
      });

      setIsSubmitting(false);
      onOrderSuccess(orderNumber);
      onClose();
    } catch (err: any) {
      console.error('Failed to submit order', err);
      setError(err?.message || 'Failed to submit order. Please check your connection.');
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div 
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          padding: '32px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#F0FDF4', color: '#15803D', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '6px' }}>
            Commercial Skid & Parts Checkout
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: 0 }}>
            Dispatch Facility Order
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>
            Order routed to Autogrow Operations Desk. We review electrical compliance before dispatch.
          </p>
        </div>

        {error && (
          <div style={{ marginBottom: '16px', padding: '10px 14px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#B91C1C', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Customer Name *
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Marcus Vance"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Facility Work Email *
              </label>
              <input
                type="email"
                required
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="marcus@pacifichydro.nz"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Commercial Farm / Company
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Pacific Greens Ltd"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Phone Number (Dispatch Contact)
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+64 21 893 214"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Greenhouse Delivery Address *
            </label>
            <input
              type="text"
              required
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Building 4, Pukekohe Agri-Park, Auckland, New Zealand"
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Facility Electrical Voltage (Pump & Solenoid Coil Rating)
            </label>
            <select
              value={facilityVoltage}
              onChange={(e) => setFacilityVoltage(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
            >
              <option value="220-240V (Standard Australasia/Europe)">220-240V / 50Hz (Standard Australasia, UK, Europe)</option>
              <option value="110-120V (Standard North America)">110-120V / 60Hz (Standard North America, Canada)</option>
              <option value="24VAC Low Voltage Specialized">24VAC Low Voltage Irrigation Skid</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Special Engineering Notes / Fertilizer Types
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Acid injection pump needs Viton seals for concentrated nitric acid"
              rows={2}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Cart Summary Strip */}
          <div style={{ backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>
                {cartItems.length} product lines ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} total units)
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#111827' }}>
                Total: <span style={{ color: '#15803D' }}>${totalValue.toLocaleString()} USD</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#6B7280', textAlign: 'right' }}>
              Commercial Invoice<br />Generated on Submission
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '13px',
              backgroundColor: '#76b82a',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '14px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '6px'
            }}
          >
            {isSubmitting ? 'Transmitting Order to Ops Desk...' : 'Confirm & Transmit Commercial Order'}
          </button>
        </form>
      </div>
    </div>
  );
};
