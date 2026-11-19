import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  RefreshCw, 
  CheckCircle2, 
  Search, 
  Eye, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { fetchAllInquiries, updateInquiryStatus } from '../services/orderService';
import type { CustomerInquiry } from '../types/orders';

interface FeedbackManagementPageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const FeedbackManagementPage: React.FC<FeedbackManagementPageProps> = ({ onBackToHome }) => {
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
      setActionSuccess(`Message updated to ${newStatus}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err) {
      console.error('Failed to update inquiry status', err);
    }
  };

  // Metrics
  const newCount = inquiries.filter(i => i.status === 'new').length;
  const resolvedCount = inquiries.filter(i => i.status === 'resolved').length;
  const techSupportCount = inquiries.filter(i => i.category === 'technical_support').length;

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
              Support Desk Active
            </div>
            <button
              onClick={loadInquiries}
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
              Sync Messages
            </button>
          </div>
        </div>

        {/* Page Title & Heading */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#F3F4F6', color: '#374151', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            Operations & Technical Desk
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#111827', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
            Grower Feedback & Technical Inquiries
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: '780px' }}>
            Review customer support inquiries, sensor drift questions, hardware calibration tickets, and grower feedback submitted through the website.
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
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>Total Inquiries</span>
              <MessageSquare size={18} color="#6B7280" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#111827', fontFamily: 'monospace' }}>
              {inquiries.length}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              All submitted messages
            </div>
          </div>

          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#B91C1C' }}>New Unread</span>
              <AlertCircle size={18} color="#B91C1C" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#B91C1C', fontFamily: 'monospace' }}>
              {newCount}
            </div>
            <div style={{ fontSize: '12px', color: '#B91C1C', marginTop: '4px' }}>
              Requires desk review
            </div>
          </div>

          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#1D4ED8' }}>Tech Support</span>
              <HelpCircle size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#1D4ED8', fontFamily: 'monospace' }}>
              {techSupportCount}
            </div>
            <div style={{ fontSize: '12px', color: '#1D4ED8', marginTop: '4px' }}>
              Sensor & hardware inquiries
            </div>
          </div>

          <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#15803D' }}>Resolved</span>
              <CheckCircle2 size={18} color="#15803D" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#15803D', fontFamily: 'monospace' }}>
              {resolvedCount}
            </div>
            <div style={{ fontSize: '12px', color: '#15803D', marginTop: '4px' }}>
              Completed responses
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', backgroundColor: '#F9FAFB', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          
          {/* Status Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['all', 'new', 'in_progress', 'resolved', 'read'] as const).map(st => (
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
                {st === 'all' ? `All Inquiries (${inquiries.length})` : st.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Search sender, email, subject, message..."
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

        {/* Table */}
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #E5E7EB', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px auto' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading customer inquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '80px 24px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px dashed #D1D5DB' }}>
            <MessageSquare size={44} color="#9CA3AF" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>No Inquiries Found</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              {searchQuery || statusFilter !== 'all' ? 'Try adjusting your search query or status filter.' : 'Grower feedback and technical support inquiries will appear here.'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 18px' }}>Date</th>
                  <th style={{ padding: '14px 18px' }}>Sender & Contact</th>
                  <th style={{ padding: '14px 18px' }}>Category</th>
                  <th style={{ padding: '14px 18px' }}>Subject & Excerpt</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inq => {
                  const cat = getCategoryBadge(inq.category);
                  const st = getStatusBadge(inq.status);

                  return (
                    <tr key={inq.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      <td style={{ padding: '16px 18px', fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{inq.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{inq.email}</div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ fontSize: '11.5px', fontWeight: 700, backgroundColor: cat.bg, color: cat.text, padding: '3px 9px', borderRadius: '999px' }}>
                          {cat.label}
                        </span>
                      </td>

                      <td style={{ padding: '16px 18px', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inq.subject}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6B7280', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginTop: '2px' }}>
                          {inq.message}
                        </div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <select
                          value={inq.status}
                          onChange={(e) => handleStatusChange(inq.id, e.target.value as CustomerInquiry['status'])}
                          style={{
                            backgroundColor: st.bg,
                            color: st.text,
                            border: `1px solid ${st.border}`,
                            borderRadius: '999px',
                            padding: '5px 12px',
                            fontSize: '12px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            outline: 'none'
                          }}
                        >
                          <option value="new">New Unread</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="read">Read</option>
                        </select>
                      </td>

                      <td style={{ padding: '16px 18px', textAlign: 'right' }}>
                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setAdminNoteInput(inq.admin_notes || '');
                          }}
                          style={{
                            padding: '7px 12px',
                            backgroundColor: '#F3F4F6',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            fontSize: '12px',
                            fontWeight: 600,
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <Eye size={13} />
                          Review
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Message Review Modal */}
        {selectedInquiry && (
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
              padding: '20px'
            }}
            onClick={() => setSelectedInquiry(null)}
          >
            <div 
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                maxWidth: '600px',
                width: '100%',
                padding: '32px',
                maxHeight: '90vh',
                overflowY: 'auto',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E5E7EB', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, margin: 0, color: '#111827' }}>
                    {selectedInquiry.subject}
                  </h3>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>
                    From {selectedInquiry.name} ({selectedInquiry.email}) • {new Date(selectedInquiry.created_at).toLocaleString()}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedInquiry(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', fontWeight: 700, cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>

              {/* Message Content */}
              <div style={{ backgroundColor: '#F9FAFB', padding: '18px', borderRadius: '10px', border: '1px solid #E5E7EB', marginBottom: '20px', whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.6, color: '#1F2937' }}>
                {selectedInquiry.message}
              </div>

              {/* Internal Notes & Response */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                    Internal Staff Notes:
                  </label>
                  <textarea
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Record troubleshooting steps, replacement probe serial numbers, or customer call notes..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '13.5px',
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
                      gap: '8px',
                      padding: '10px 18px',
                      backgroundColor: '#111827',
                      color: '#FFFFFF',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                  >
                    <Mail size={15} />
                    Direct Email Reply
                  </a>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleStatusChange(selectedInquiry.id, 'resolved')}
                      style={{
                        padding: '10px 18px',
                        backgroundColor: '#15803D',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13.5px',
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
    </div>
  );
};
