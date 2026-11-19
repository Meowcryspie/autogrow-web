import React, { useState, useEffect } from 'react';
import { Mail, MessageSquare, RefreshCw, CheckCircle2, Search, Eye } from 'lucide-react';
import { fetchAllInquiries, updateInquiryStatus } from '../../services/orderService';
import type { CustomerInquiry } from '../../types/orders';

export const AdminInquiriesTab: React.FC = () => {
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerInquiry['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadInquiries = async () => {
    setLoading(true);
    try {
      const data = await fetchAllInquiries();
      setInquiries(data);
    } catch (err) {
      console.error('Failed to load inquiries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: CustomerInquiry['status']) => {
    try {
      await updateInquiryStatus(id, newStatus, adminNoteInput || undefined);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, status: newStatus, admin_notes: adminNoteInput || i.admin_notes } : i));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus, admin_notes: adminNoteInput || prev.admin_notes } : null);
      }
      setActionSuccess(`Inquiry marked as ${newStatus}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to update inquiry status', err);
    }
  };

  const filtered = inquiries.filter(i => {
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      i.subject.toLowerCase().includes(q) ||
      i.message.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

  const getCategoryBadge = (cat: CustomerInquiry['category']) => {
    switch (cat) {
      case 'technical_support':
        return { label: 'Tech Support', bg: '#EFF6FF', text: '#1D4ED8' };
      case 'quote_inquiry':
        return { label: 'Quote Inquiry', bg: '#F0FDF4', text: '#15803D' };
      case 'feedback':
        return { label: 'Grower Feedback', bg: '#FAF5FF', text: '#7E22CE' };
      default:
        return { label: 'General Message', bg: '#F3F4F6', text: '#374151' };
    }
  };

  const getStatusBadge = (st: CustomerInquiry['status']) => {
    switch (st) {
      case 'new':
        return { label: 'New Unread', bg: '#FEF2F2', text: '#B91C1C', border: '#FECACA' };
      case 'read':
        return { label: 'Read', bg: '#F3F4F6', text: '#4B5563', border: '#E5E7EB' };
      case 'in_progress':
        return { label: 'In Progress', bg: '#EFF6FF', text: '#2563EB', border: '#BFDBFE' };
      case 'resolved':
        return { label: 'Resolved', bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' };
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>
            Customer Inquiries & Feedback Messages
          </h2>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            Support requests, commercial quotes, and feedback submitted by growers via contact forms.
          </p>
        </div>

        <button
          onClick={loadInquiries}
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
          {(['all', 'new', 'in_progress', 'resolved', 'read'] as const).map(st => (
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
              {st === 'all' ? `All Inquiries (${inquiries.length})` : st.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '10px', color: '#9CA3AF' }} />
          <input
            type="text"
            placeholder="Search name, email, subject..."
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

      {/* Table */}
      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: '#6B7280' }}>
          <div style={{ width: '32px', height: '32px', border: '3px solid #E5E7EB', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px auto' }} />
          <p style={{ fontSize: '13px', margin: 0 }}>Loading verified feedback...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '12px', border: '1px dashed #D1D5DB' }}>
          <MessageSquare size={36} color="#9CA3AF" style={{ margin: '0 auto 12px auto' }} />
          <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#374151', margin: '0 0 4px 0' }}>No Inquiries Found</h4>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>
            Customer inquiries and feedback messages will appear here.
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '11.5px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '12px 16px' }}>Date</th>
                <th style={{ padding: '12px 16px' }}>Sender</th>
                <th style={{ padding: '12px 16px' }}>Category</th>
                <th style={{ padding: '12px 16px' }}>Subject & Excerpt</th>
                <th style={{ padding: '12px 16px' }}>Status</th>
                <th style={{ padding: '12px 16px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(inq => {
                const cat = getCategoryBadge(inq.category);
                const st = getStatusBadge(inq.status);

                return (
                  <tr key={inq.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                    <td style={{ padding: '14px 16px', fontSize: '11.5px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{inq.name}</div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280' }}>{inq.email}</div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, backgroundColor: cat.bg, color: cat.text, padding: '3px 8px', borderRadius: '999px' }}>
                        {cat.label}
                      </span>
                    </td>

                    <td style={{ padding: '14px 16px', maxWidth: '280px' }}>
                      <div style={{ fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inq.subject}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inq.message}
                      </div>
                    </td>

                    <td style={{ padding: '14px 16px' }}>
                      <select
                        value={inq.status}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value as CustomerInquiry['status'])}
                        style={{
                          backgroundColor: st.bg,
                          color: st.text,
                          border: `1px solid ${st.border}`,
                          borderRadius: '999px',
                          padding: '4px 10px',
                          fontSize: '11.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="in_progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                        <option value="read">Read</option>
                      </select>
                    </td>

                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <button
                        onClick={() => {
                          setSelectedInquiry(inq);
                          setAdminNoteInput(inq.admin_notes || '');
                        }}
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
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
          onClick={() => setSelectedInquiry(null)}
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
                  {selectedInquiry.subject}
                </h3>
                <span style={{ fontSize: '12px', color: '#6B7280' }}>
                  From {selectedInquiry.name} ({selectedInquiry.email}) • {new Date(selectedInquiry.created_at).toLocaleString()}
                </span>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                style={{ background: 'none', border: 'none', fontSize: '18px', fontWeight: 700, cursor: 'pointer', color: '#6B7280' }}
              >
                ✕
              </button>
            </div>

            {/* Message Body */}
            <div style={{ backgroundColor: '#F9FAFB', padding: '16px', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '20px', whiteSpace: 'pre-wrap', fontSize: '13.5px', lineHeight: 1.6, color: '#1F2937' }}>
              {selectedInquiry.message}
            </div>

            {/* Status & Reply */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Internal Admin Notes:
                </label>
                <textarea
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record resolution notes, dispatch ticket ID, or customer call notes..."
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid #D1D5DB',
                    fontSize: '13px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)} (Autogrow Support)`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  <Mail size={14} />
                  Reply via Email
                </a>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => handleStatusChange(selectedInquiry.id, 'resolved')}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#15803D',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
