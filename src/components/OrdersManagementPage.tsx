import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  RefreshCw, 
  Search, 
  Eye, 
  Zap, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ShieldCheck, 
  DollarSign,
  ArrowRight
} from 'lucide-react';
import { fetchAllOrders, updateOrderStatus } from '../services/orderService';
import type { CustomerOrder, OrderStatus } from '../types/orders';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

interface OrdersManagementPageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
  onNavigateToStore?: () => void;
}

export const OrdersManagementPage: React.FC<OrdersManagementPageProps> = ({ onBackToHome, onNavigateToStore }) => {
  const { user, isAdmin } = useAuth();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (err) {
      console.error('Failed to load orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
      setActionSuccess(`Order #${orderId} marked as ${newStatus}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  // If visitor is not authenticated at all
  if (!user) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '36px 28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <ShoppingCart size={28} style={{ color: '#15803D' }} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>Grower Sign In Required</h2>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            Please sign in to your commercial account to view your purchase orders, dispatch tracking, and quotation records.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', justifyContent: 'center' }}
            >
              Sign In / Register Account
            </button>
            <button
              onClick={onBackToHome}
              style={{
                width: '100%',
                padding: '10px',
                background: 'none',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#4B5563',
                cursor: 'pointer'
              }}
            >
              Return to Homepage
            </button>
          </div>
        </div>
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // Filter orders: Admins see all orders; normal customers see only their own orders
  const displayedOrders = isAdmin
    ? orders
    : orders.filter(o => 
        (user.email && o.customer_email?.toLowerCase() === user.email.toLowerCase()) ||
        (user.id && o.user_id === user.id)
      );

  // Metrics
  const totalVolume = displayedOrders.reduce((sum, o) => sum + o.total_amount, 0);
  const pendingCount = displayedOrders.filter(o => o.status === 'pending').length;
  const processingCount = displayedOrders.filter(o => o.status === 'processing').length;

  const filteredOrders = displayedOrders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      o.order_number.toLowerCase().includes(q) ||
      o.customer_name.toLowerCase().includes(q) ||
      o.customer_email.toLowerCase().includes(q) ||
      (o.company_name && o.company_name.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return { bg: '#FEF3C7', text: '#D97706', border: '#FDE68A', label: 'Pending Review' };
      case 'processing':
        return { bg: '#DBEAFE', text: '#2563EB', border: '#BFDBFE', label: 'Processing Skid' };
      case 'completed':
        return { bg: '#DCFCE7', text: '#15803D', border: '#BBF7D0', label: 'Dispatched / Fulfilled' };
      case 'cancelled':
        return { bg: '#FEE2E2', text: '#DC2626', border: '#FECACA', label: 'Cancelled' };
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '40px', paddingBottom: '96px' }}>
      <div className="container">
        
        {/* Top Breadcrumb & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
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
              padding: 0
            }}
          >
            <ArrowLeft size={16} />
            Back to Public Website
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#F0FDF4', color: '#15803D', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
              <ShieldCheck size={14} />
              {isAdmin ? 'Operations Authority Active' : 'Verified Grower Account'}
            </div>
            <button
              onClick={loadOrders}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                backgroundColor: '#F3F4F6',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                cursor: 'pointer'
              }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Sync Orders
            </button>
          </div>
        </div>

        {/* Page Title & Mission */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#F3F4F6', color: '#374151', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            {isAdmin ? 'Commercial Operations Desk' : 'Grower Order History'}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#111827', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
            {isAdmin ? 'Commercial Orders & Fertigation Quotes' : 'My Orders & Commercial Quotes'}
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: '780px' }}>
            {isAdmin 
              ? 'Manage commercial hardware skids, controller quote submissions, and dispatch schedules received from registered greenhouse facilities worldwide.'
              : 'Review your commercial equipment orders, dispatch tracking, skid assemblies, and quotation records.'
            }
          </p>
        </div>

        {actionSuccess && (
          <div style={{ marginBottom: '24px', padding: '12px 18px', backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '10px', color: '#15803D', fontSize: '13.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* 4 Metric Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                {isAdmin ? 'Total Orders' : 'My Orders'}
              </span>
              <ShoppingCart size={18} color="#6B7280" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#111827', fontFamily: 'monospace' }}>
              {displayedOrders.length}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              {isAdmin ? 'All recorded facility carts' : 'Orders linked to your account'}
            </div>
          </div>

          <div style={{ backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#D97706' }}>Pending Review</span>
              <Clock size={18} color="#D97706" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#B45309', fontFamily: 'monospace' }}>
              {pendingCount}
            </div>
            <div style={{ fontSize: '12px', color: '#B45309', marginTop: '4px' }}>
              Awaiting voltage review
            </div>
          </div>

          <div style={{ backgroundColor: '#DBEAFE', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#2563EB' }}>Processing Skids</span>
              <Truck size={18} color="#2563EB" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#1D4ED8', fontFamily: 'monospace' }}>
              {processingCount}
            </div>
            <div style={{ fontSize: '12px', color: '#1D4ED8', marginTop: '4px' }}>
              In assembly & calibration
            </div>
          </div>

          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#15803D' }}>Total Quoted Value</span>
              <DollarSign size={18} color="#15803D" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#15803D', fontFamily: 'monospace' }}>
              ${totalVolume.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </div>
            <div style={{ fontSize: '12px', color: '#15803D', marginTop: '4px' }}>
              {isAdmin ? 'Gross commercial pipeline' : 'Your cumulative order total'}
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', backgroundColor: '#F9FAFB', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          
          {/* Status Filter Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: 700,
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: statusFilter === st ? '#111827' : '#FFFFFF',
                  color: statusFilter === st ? '#FFFFFF' : '#4B5563',
                  boxShadow: statusFilter === st ? 'none' : '0 1px 3px rgba(0,0,0,0.06)'
                }}
              >
                {st === 'all' ? `All Orders (${displayedOrders.length})` : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Search by order #, items, farm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '13.5px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Orders Table */}
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #E5E7EB', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px auto' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading verified orders...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ padding: '80px 24px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px dashed #D1D5DB' }}>
            <ShoppingCart size={44} color="#9CA3AF" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
              {isAdmin ? 'No Matching Orders Found' : 'No Commercial Orders Found'}
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 20px 0', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
              {isAdmin
                ? (searchQuery || statusFilter !== 'all' ? 'Try adjusting your search criteria or status filter.' : 'When customers place cart inquiries in the online store, they will appear here.')
                : 'You have not submitted any equipment quote or hardware purchase orders yet. Configure your commercial fertigation skid in our online store.'
              }
            </p>
            {!isAdmin && onNavigateToStore && (
              <button
                onClick={onNavigateToStore}
                className="btn btn-primary"
                style={{ padding: '10px 20px', fontSize: '13.5px' }}
              >
                Browse Online Store
                <ArrowRight size={14} />
              </button>
            )}
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 18px' }}>Order Reference</th>
                  <th style={{ padding: '14px 18px' }}>Customer & Greenhouse</th>
                  <th style={{ padding: '14px 18px' }}>Equipment Items</th>
                  <th style={{ padding: '14px 18px' }}>Total (USD)</th>
                  <th style={{ padding: '14px 18px' }}>Voltage / Specs</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => {
                  const badge = getStatusBadge(order.status);
                  const itemCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      
                      {/* Order Number */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#111827', fontSize: '14px' }}>
                          {order.order_number}
                        </div>
                        <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </td>

                      {/* Customer */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{order.customer_name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{order.customer_email}</div>
                        {order.company_name && (
                          <div style={{ fontSize: '12px', color: '#15803D', fontWeight: 600, marginTop: '2px' }}>{order.company_name}</div>
                        )}
                      </td>

                      {/* Items */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 600, color: '#374151' }}>
                          {itemCount} {itemCount === 1 ? 'unit' : 'units'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280', maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                          {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                        </div>
                      </td>

                      {/* Amount */}
                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#15803D', fontSize: '15px' }}>
                          ${order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </span>
                      </td>

                      {/* Voltage & Destination */}
                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '11.5px', fontWeight: 700, backgroundColor: '#F3F4F6', padding: '3px 8px', borderRadius: '5px', color: '#374151' }}>
                          <Zap size={11} color="#EAB308" />
                          {order.facility_voltage || 'Standard'}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#6B7280', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '4px' }}>
                          {order.shipping_address}
                        </div>
                      </td>

                      {/* Status Selector (Admin editable, Normal user read-only) */}
                      <td style={{ padding: '16px 18px' }}>
                        {isAdmin ? (
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.text,
                              border: `1px solid ${badge.border}`,
                              borderRadius: '999px',
                              padding: '5px 12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            style={{
                              backgroundColor: badge.bg,
                              color: badge.text,
                              border: `1px solid ${badge.border}`,
                              borderRadius: '999px',
                              padding: '4px 12px',
                              fontSize: '12px',
                              fontWeight: 700,
                              display: 'inline-block'
                            }}
                          >
                            {badge.label}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          style={{
                            padding: '7px 12px',
                            backgroundColor: '#F3F4F6',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} />
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '640px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#15803D' }}>
                    Commercial PO Documentation
                  </span>
                  <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: '4px 0 0 0' }}>
                    Order {selectedOrder.order_number}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9CA3AF' }}
                >
                  ✕
                </button>
              </div>

              {/* Customer & Farm Detail Card */}
              <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '16px', marginBottom: '20px', border: '1px solid #E5E7EB' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '13px' }}>
                  <div>
                    <span style={{ color: '#6B7280' }}>Customer Contact:</span>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{selectedOrder.customer_name}</div>
                    <div style={{ color: '#4B5563', fontSize: '12px' }}>{selectedOrder.customer_email}</div>
                    <div style={{ color: '#4B5563', fontSize: '12px' }}>{selectedOrder.customer_phone}</div>
                  </div>
                  <div>
                    <span style={{ color: '#6B7280' }}>Facility Destination:</span>
                    <div style={{ fontWeight: 700, color: '#111827' }}>{selectedOrder.company_name || 'Individual Commercial Facility'}</div>
                    <div style={{ color: '#4B5563', fontSize: '12px' }}>{selectedOrder.shipping_address}</div>
                  </div>
                </div>
                {selectedOrder.facility_voltage && (
                  <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #E5E7EB', fontSize: '12px', color: '#374151', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={14} color="#EAB308" />
                    <strong>Facility Power Wiring:</strong> {selectedOrder.facility_voltage}
                  </div>
                )}
                {selectedOrder.notes && (
                  <div style={{ fontSize: '13px', color: '#D97706', marginTop: '8px', padding: '8px 12px', backgroundColor: '#FEF3C7', borderRadius: '6px' }}>
                    <strong>Engineering Notes:</strong> {selectedOrder.notes}
                  </div>
                )}
              </div>

              {/* Item Lines */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 800, marginBottom: '8px' }}>
                  Bill of Materials / Ordered Units
                </div>
                <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', borderBottom: idx < selectedOrder.items.length - 1 ? '1px solid #F3F4F6' : 'none', fontSize: '13.5px' }}>
                      <div>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>Quantity: {item.quantity} × ${item.price.toLocaleString()} USD</div>
                      </div>
                      <div style={{ fontWeight: 800, fontFamily: 'monospace', color: '#111827' }}>
                        ${(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Quote Value */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 900, color: '#111827', padding: '14px 0', borderTop: '2px solid #E5E7EB', marginBottom: '24px' }}>
                <span>Total Quoted Amount:</span>
                <span style={{ fontFamily: 'monospace', color: '#15803D' }}>
                  ${selectedOrder.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                </span>
              </div>

              {/* Status Update Control (Admin only can change, normal user sees status) */}
              {isAdmin ? (
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>Order Status:</label>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                    style={{
                      padding: '9px 16px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '13px',
                      fontWeight: 700,
                      outline: 'none',
                      flex: 1
                    }}
                  >
                    <option value="pending">Pending Review</option>
                    <option value="processing">Processing Skid Assembly</option>
                    <option value="completed">Dispatched / Fulfilled</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>Current Order Status:</span>
                  {(() => {
                    const b = getStatusBadge(selectedOrder.status);
                    return (
                      <span style={{ backgroundColor: b.bg, color: b.text, border: `1px solid ${b.border}`, borderRadius: '999px', padding: '4px 12px', fontSize: '12px', fontWeight: 700 }}>
                        {b.label}
                      </span>
                    );
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
