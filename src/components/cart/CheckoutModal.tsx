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
  initialFarmDetails?: { facilityType?: string; area?: string; crop?: string };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  totalValue,
  onOrderSuccess,
  onRequireAuth,
  initialFarmDetails
}) => {
  const { user, profile } = useAuth();

  const [customerName, setCustomerName] = useState(profile?.full_name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [customerPhone, setCustomerPhone] = useState('');
  const [companyName, setCompanyName] = useState(profile?.facilityName || profile?.facility_name || '');
  const [shippingAddress, setShippingAddress] = useState('');
  const [facilityVoltage, setFacilityVoltage] = useState('220-240V / 50Hz (Standard Australasia/Europe/Malaysia)');
  const [farmArea, setFarmArea] = useState(initialFarmDetails?.area || '2,500 m² (~0.6 Acre)');
  const [cropType, setCropType] = useState(initialFarmDetails?.crop || 'Vine Crops (Tomatoes, Capsicums)');
  const [targetRegion, setTargetRegion] = useState('New Zealand & Australasia');
  const [notes, setNotes] = useState(initialFarmDetails?.facilityType ? `Facility Type: ${initialFarmDetails.facilityType}` : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  React.useEffect(() => {
    if (user?.email) {
      setCustomerEmail(user.email);
    }
    if (profile?.full_name) {
      setCustomerName(profile.full_name);
    }
    const fac = profile?.facilityName || profile?.facility_name;
    if (fac) {
      setCompanyName(fac);
    }
  }, [user, profile]);

  React.useEffect(() => {
    if (initialFarmDetails?.area) setFarmArea(initialFarmDetails.area);
    if (initialFarmDetails?.crop) setCropType(initialFarmDetails.crop);
    if (initialFarmDetails?.facilityType) setNotes(`Facility Type: ${initialFarmDetails.facilityType}`);
  }, [initialFarmDetails]);

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
            Sign In to Request Equipment Quote
          </h3>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 24px', lineHeight: 1.5 }}>
            Commercial CEA hardware is custom-quoted to your greenhouse dimensions and power grid. Sign in or register your farm to receive an itemized commercial quotation.
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
              Sign In / Register Farm Account
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
              Continue Browsing Equipment
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
      const orderNumber = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const orderItems: OrderItem[] = cartItems.map(item => ({
        id: String(item.product.id),
        name: item.product.name,
        modelCode: item.product.modelCode,
        quantity: item.quantity,
        price: item.product.price,
        category: item.product.category
      }));

      const fullNotes = [
        `[COMMERCIAL RFQ - QUOTE FOR ORDER]`,
        `Farm Footprint: ${farmArea}`,
        `Crop Category: ${cropType}`,
        `Target Delivery Region: ${targetRegion}`,
        notes.trim() ? `Grower Notes: ${notes.trim()}` : ''
      ].filter(Boolean).join(' | ');

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
        notes: fullNotes
      });

      setIsSubmitting(false);
      onOrderSuccess(orderNumber);
      onClose();
    } catch (err: any) {
      console.error('Failed to submit quote request', err);
      setError(err?.message || 'Failed to submit quote request. Please check your connection.');
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
          maxWidth: '580px',
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
          <div style={{ display: 'inline-block', backgroundColor: '#ECFDF5', color: '#065F46', fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '999px', textTransform: 'uppercase', marginBottom: '6px', border: '1px solid #A7F3D0' }}>
            REQUEST FOR QUOTE (RFQ) · TAILORED FARM PRICING
          </div>
          <h2 style={{ fontSize: '21px', fontWeight: 800, color: '#111827', margin: 0 }}>
            Request Equipment Quote
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0', lineHeight: 1.4 }}>
            Commercial CEA hardware is customized to your facility dimensions and voltage. Submit your equipment list to receive an official engineering quotation within 1 business day.
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
                Contact / Lead Grower *
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
                Farm / Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Pacific Greens Glasshouse Ltd"
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Phone / WhatsApp (For Rapid Quote)
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

          {/* Farm Sizing Specifics */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', marginBottom: '4px' }}>
                Farm Footprint / Area
              </label>
              <select
                value={farmArea}
                onChange={(e) => setFarmArea(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', backgroundColor: '#FFFFFF' }}
              >
                <option value="< 1,000 m² (Boutique / R&D)">Under 1,000 m² (&lt; 0.25 Acre)</option>
                <option value="1,000 – 5,000 m² (~1 Acre)">1,000 – 5,000 m² (~1 Acre)</option>
                <option value="5,000 – 20,000 m² (~2.5–5 Acres)">5,000 – 20,000 m² (2.5 – 5 Acres)</option>
                <option value="20,000+ m² (5+ Hectares)">20,000+ m² (5+ Hectares)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, color: '#1E293B', textTransform: 'uppercase', marginBottom: '4px' }}>
                Primary Crop Cultivation
              </label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '12.5px', backgroundColor: '#FFFFFF' }}
              >
                <option value="Vine Crops (Tomatoes, Capsicums, Cucumbers)">Vine Crops (Tomatoes, Peppers)</option>
                <option value="Leafy Greens (NFT Hydroponics, Herbs)">Leafy Greens (NFT / Hydroponics)</option>
                <option value="Soft Berries (Strawberries in Coir)">Soft Berries (Strawberries, Blueberries)</option>
                <option value="Medicinal & High-Value CEA">Medicinal & Specialty Crops</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Delivery Country / Region
              </label>
              <select
                value={targetRegion}
                onChange={(e) => setTargetRegion(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              >
                <option value="New Zealand & Australasia">New Zealand & Australasia</option>
                <option value="Malaysia & Southeast Asia">Malaysia & Southeast Asia</option>
                <option value="North America (USA & Canada)">North America (USA & Canada)</option>
                <option value="Europe & United Kingdom">Europe & United Kingdom</option>
                <option value="Global / Other International">Global / Other International</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                Facility Voltage & Frequency
              </label>
              <select
                value={facilityVoltage}
                onChange={(e) => setFacilityVoltage(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
              >
                <option value="220-240V / 50Hz (Standard Australasia/Europe/Malaysia)">220-240V / 50Hz (Australasia, Malaysia, UK)</option>
                <option value="110-120V / 60Hz (Standard North America)">110-120V / 60Hz (North America)</option>
                <option value="24VAC Low Voltage Irrigation Skid">24VAC Low Voltage Skid</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
              Facility Delivery Address *
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
              Engineering Requirements / Sensor Cable Lengths
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Need 15m cable lengths for pyranometer mast and Viton pump seals for nitric acid dosing"
              rows={2}
              style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13px', boxSizing: 'border-box' }}
            />
          </div>

          {/* Quote Basket Summary Strip */}
          <div style={{ backgroundColor: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>
                {cartItems.length} equipment line items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)} total units)
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                Estimated Hardware: <span style={{ color: '#16A34A' }}>${totalValue.toLocaleString()} USD</span>
              </div>
            </div>
            <span style={{ fontSize: '11px', color: '#64748B', textAlign: 'right' }}>
              Formal Itemized Quote<br />Issued via Email
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              padding: '13px',
              backgroundColor: '#16A34A',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '14.5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '6px',
              boxShadow: '0 2px 6px rgba(22, 163, 74, 0.25)'
            }}
          >
            {isSubmitting ? 'Transmitting Quote Request...' : 'Submit Equipment Quote Request (RFQ)'}
          </button>

          <div style={{ fontSize: '11px', color: '#64748B', textAlign: 'center', marginTop: '2px' }}>
            No payment required today. An official commercial quotation with regional freight and calibration will be emailed.
          </div>
        </form>
      </div>
    </div>
  );
};
