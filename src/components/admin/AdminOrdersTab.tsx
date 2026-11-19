import React, { useState, useEffect } from 'react';
import { ShoppingCart, CheckCircle2, Search, RefreshCw, Eye, Zap } from 'lucide-react';
import { fetchAllOrders, updateOrderStatus } from '../../services/orderService';
import type { CustomerOrder, OrderStatus } from '../../types/orders';

export const AdminOrdersTab: React.FC = () => {
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | OrderStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

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
      setActionSuccess(`Order status updated to ${newStatus}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const filteredOrders = orders.filter(o => {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Metric Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>
            Customer Quote & Equipment Orders
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            Real-time commercial cart orders submitted by registered greenhouse operators.
          </p>
        </div>

        <button
          onClick={loadOrders}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
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
          Refresh
        </button>
      </div>

      {actionSuccess && (
        <div style={{ padding: '10px 16px', backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '8px', color: '#15803D', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '10px', border: '1px solid #E5E7EB' }}>
        
        {/* Status Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {(['all', 'pending', 'processing', 'completed', 'cancelled'] as const).map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '12px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: statusFilter === st ? '#111827' : '#FFFFFF',
                color: statusFilter === st ? '#FFFFFF' : '#4B5563',
                boxShadow: statusFilter === st ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              {st === 'all' ? `All Orders (${orders.length})` : st.charAt(0).toUpperCase() + st.slice(1)}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search order #, customer, farm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 32px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '12.5px',
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid #E5E7EB', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px auto' }} />
          <p style={{ fontSize: '13px', margin: 0 }}>Loading verified orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px dashed #D1D5DB' }}>
          <ShoppingCart size={36} color="#9CA3AF" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', margin: '0 0 4px 0' }}>No Orders Found</h4>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search or status filter.' : 'When customers place cart inquiries in the online store, they will appear here in real time.'}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px' }}>Order Ref</th>
                <th style={{ padding: '12px 16px' }}>Customer / Company</th>
                <th style={{ padding: '12px 16px' }}>Equipment Items</th>
                <th style={{ padding: '12px 16px' }}>Total (USD)</th>
                <th style={{ padding: '12px 16px' }}>Voltage / Location</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => {
                const badge = getStatusBadge(order.status);
                const itemCount = order.items.reduce((acc, i) => acc + i.quantity, 0);

                return (
                  <tr key={order.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    
                    {/* Order Number */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontFamily: 'monospace', fontWeight: 800, color: '#111827' }}>
                        {order.order_number}
                      </div>
                      <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    {/* Customer */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{order.customer_name}</div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{order.customer_email}</div>
                      {order.company_name && (
                        <div style={{ fontSize: '11px', color: '#76b82a', fontWeight: 600 }}>{order.company_name}</div>
                      )}
                    </td>

                    {/* Items */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 600, color: '#374151' }}>
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                      </div>
                    </td>

                    {/* Amount */}
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontFamily: 'monospace', fontWeight: 800, color: '#15803D', fontSize: '14px' }}>
                        ${order.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>

                    {/* Voltage & Address */}
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, backgroundColor: '#F3F4F6', padding: '2px 6px', borderRadius: '4px', color: '#374151' }}>
                        <Zap size={10} color="#EAB308" />
                        {order.facility_voltage || 'Standard'}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6B7280', maxWidth: '160px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '3px' }}>
                        {order.shipping_address}
                      </div>
                    </td>

                    {/* Status Select */}
                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                          border: `1px solid ${badge.border}`,
                          borderRadius: '999px',
                          padding: '4px 10px',
                          fontSize: '11.5px',
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
                    </td>

                    {/* Actions */}
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#F3F4F6',
                          border: '1px solid #E5E7EB',
                          borderRadius: '6px',
                          fontSize: '11.5px',
                          fontWeight: 600,
                          color: '#374151',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <Eye size={12} />
                        View
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
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              maxWidth: '560px',
              width: '100%',
              padding: '28px',
              maxHeight: '90vh',
              overflowY: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '14px', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: '#111827' }}>
                  Order {selectedOrder.order_number}
                </h3>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                  Submitted on {new Date(selectedOrder.created_at).toLocaleString()}
                </span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 700, cursor: 'pointer', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>

            {/* Customer Details */}
            <div style={{ backgroundColor: '#F9FAFB', padding: '14px', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '18px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, marginBottom: '6px' }}>
                Customer & Commercial Farm
              </div>
              <div style={{ fontWeight: 700, color: '#111827' }}>{selectedOrder.customer_name}</div>
              <div style={{ fontSize: '12px', color: '#4B5563' }}>{selectedOrder.customer_email} {selectedOrder.customer_phone && `• ${selectedOrder.customer_phone}`}</div>
              {selectedOrder.company_name && (
                <div style={{ fontSize: '12px', color: '#76b82a', fontWeight: 600, marginTop: '2px' }}>{selectedOrder.company_name}</div>
              )}
              <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '6px' }}>
                <strong>Shipping Address:</strong> {selectedOrder.shipping_address}
              </div>
              {selectedOrder.facility_voltage && (
                <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>
                  <strong>Facility Voltage:</strong> {selectedOrder.facility_voltage}
                </div>
              )}
              {selectedOrder.notes && (
                <div style={{ fontSize: '12px', color: '#D97706', marginTop: '6px', fontStyle: 'italic' }}>
                  <strong>Special Instructions:</strong> {selectedOrder.notes}
                </div>
              )}
            </div>

            {/* Line Items */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 700, marginBottom: '8px' }}>
                Ordered Controllers & Parts
              </div>
              <div style={{ border: '1px solid #E5E7EB', borderRadius: '8px', overflow: 'hidden' }}>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', borderBottom: idx < selectedOrder.items.length - 1 ? '1px solid #F3F4F6' : 'none', fontSize: '13px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{item.name}</div>
                      <div style={{ fontSize: '11px', color: '#6B7280' }}>Quantity: {item.quantity} × ${item.price.toLocaleString()}</div>
                    </div>
                    <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#111827' }}>
                      ${(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800, color: '#111827', padding: '12px 0', borderTop: '2px solid #E5E7EB', marginBottom: '20px' }}>
              <span>Total Estimated Quote:</span>
              <span style={{ fontFamily: 'monospace', color: '#15803D' }}>
                ${selectedOrder.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
              </span>
            </div>

            {/* Status Selector */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#374151' }}>Update Status:</label>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as OrderStatus)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D1D5DB',
                  fontSize: '13px',
                  fontWeight: 600,
                  outline: 'none',
                  flex: 1
                }}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
