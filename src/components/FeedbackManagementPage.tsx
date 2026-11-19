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
  HelpCircle,
  Send,
  User
} from 'lucide-react';
import { fetchAllInquiries, updateInquiryStatus, submitInquiry } from '../services/orderService';
import type { CustomerInquiry } from '../types/orders';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from './auth/AuthModal';

interface FeedbackManagementPageProps {
  onBackToHome: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export const FeedbackManagementPage: React.FC<FeedbackManagementPageProps> = ({ onBackToHome }) => {
  const { user, profile, isAdmin } = useAuth();
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerInquiry['status']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [adminNoteInput, setAdminNoteInput] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Normal user feedback form state
  const [formCategory, setFormCategory] = useState<CustomerInquiry['category']>('technical_support');
  const [formSubject, setFormSubject] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleUserSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formSubject.trim() || !formMessage.trim() || !user) return;

    setSubmitting(true);
    try {
      const created = await submitInquiry({
        name: profile?.full_name || user.email?.split('@')[0] || 'Grower',
        email: user.email || '',
        subject: formSubject.trim(),
        category: formCategory,
        message: formMessage.trim(),
      });
      setInquiries(prev => [created, ...prev]);
      setFormSubject('');
      setFormMessage('');
      setActionSuccess('Your feedback / support inquiry has been submitted to Autogrow engineering team!');
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err) {
      console.error('Failed to submit inquiry', err);
    } finally {
      setSubmitting(false);
    }
  };

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

  // If visitor is not authenticated
  if (!user) {
    return (
      <div style={{ backgroundColor: '#FFFFFF', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ maxWidth: '440px', width: '100%', textAlign: 'center', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '36px 28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
            <MessageSquare size={28} style={{ color: '#1D4ED8' }} />
          </div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '0 0 8px 0' }}>Grower Sign In Required</h2>
          <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 24px 0', lineHeight: 1.5 }}>
            Please sign in to your commercial account to submit feedback, report agronomy challenges, or track existing support tickets.
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

  // Filter inquiries: Admin sees all; normal user sees only inquiries submitted by their email
  const displayedInquiries = isAdmin
    ? inquiries
    : inquiries.filter(i => user.email && i.email?.toLowerCase() === user.email.toLowerCase());

  // Metrics
  const newCount = displayedInquiries.filter(i => i.status === 'new').length;
  const resolvedCount = displayedInquiries.filter(i => i.status === 'resolved').length;
  const techSupportCount = displayedInquiries.filter(i => i.category === 'technical_support').length;

  const filtered = displayedInquiries.filter(i => {
    const matchesStatus = statusFilter === 'all' || i.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      i.name.toLowerCase().includes(q) ||
      i.email.toLowerCase().includes(q) ||
      i.subject.toLowerCase().includes(q) ||
      i.message.toLowerCase().includes(q);
    return matchesStatus && matchesQuery;
  });

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
              {isAdmin ? 'Support Desk Active' : 'Grower Desk Connected'}
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

        {/* Page Title & Mission */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'inline-block', backgroundColor: '#EFF6FF', color: '#1D4ED8', padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '10px' }}>
            {isAdmin ? 'Engineering Support Desk' : 'Grower Technical Feedback'}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: 800, color: '#111827', margin: '0 0 10px 0', letterSpacing: '-0.02em' }}>
            {isAdmin ? 'Grower Feedback & Technical Inquiries' : 'Give Feedback & Support Inquiries'}
          </h1>
          <p style={{ fontSize: '16px', color: '#4B5563', lineHeight: 1.6, margin: 0, maxWidth: '780px' }}>
            {isAdmin 
              ? 'Triage technical inquiries, calibration questions, commercial skid requests, and grower feedback from Auckland HQ and regional integration desks.'
              : 'Submit questions or feedback directly to our Auckland engineering team, report hardware calibration queries, or track your existing tickets.'
            }
          </p>
        </div>

        {actionSuccess && (
          <div style={{ marginBottom: '24px', padding: '12px 18px', backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', borderRadius: '10px', color: '#15803D', fontSize: '13.5px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={18} />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* If Normal User: Show Interactive "Give Feedback / Submit Ticket" Box */}
        {!isAdmin && (
          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '28px', marginBottom: '40px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#1E2421', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#86EFAC' }}>
                <Send size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#111827', margin: 0 }}>Submit Feedback or Technical Inquiry</h3>
                <p style={{ fontSize: '13px', color: '#6B7280', margin: 0 }}>Direct priority transmission to Autogrow engineering team</p>
              </div>
            </div>

            <form onSubmit={handleUserSubmitFeedback}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Inquiry Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as CustomerInquiry['category'])}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13.5px', outline: 'none', backgroundColor: '#FFFFFF' }}
                  >
                    <option value="technical_support">Agronomy & Technical Support</option>
                    <option value="quote_inquiry">Commercial Quote Inquiry</option>
                    <option value="feedback">Hardware / Software Feedback</option>
                    <option value="general">General Commercial Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Subject / Equipment Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MultiGrow v2.4 Sensor Calibration or Skid Sizing"
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>Detailed Message or Observation</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your equipment telemetry, probe readings, feature suggestions, or greenhouse configuration..."
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '13.5px', outline: 'none', boxSizing: 'border-box', backgroundColor: '#FFFFFF', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ fontSize: '12px', color: '#6B7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={13} />
                  Posting as <strong>{profile?.full_name || user.email}</strong>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn btn-primary"
                  style={{ padding: '10px 22px', fontSize: '13.5px' }}
                >
                  <Send size={14} />
                  {submitting ? 'Transmitting...' : 'Send Feedback / Ticket'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 4 Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '36px' }}>
          
          <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                {isAdmin ? 'Total Inquiries' : 'My Inquiries'}
              </span>
              <MessageSquare size={18} color="#6B7280" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#111827', fontFamily: 'monospace' }}>
              {displayedInquiries.length}
            </div>
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              {isAdmin ? 'All customer tickets' : 'Tickets submitted by your account'}
            </div>
          </div>

          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#B91C1C' }}>New Unread</span>
              <AlertCircle size={18} color="#B91C1C" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#991B1B', fontFamily: 'monospace' }}>
              {newCount}
            </div>
            <div style={{ fontSize: '12px', color: '#991B1B', marginTop: '4px' }}>
              Awaiting engineering review
            </div>
          </div>

          <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#1D4ED8' }}>Tech Support</span>
              <HelpCircle size={18} color="#1D4ED8" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#1E40AF', fontFamily: 'monospace' }}>
              {techSupportCount}
            </div>
            <div style={{ fontSize: '12px', color: '#1E40AF', marginTop: '4px' }}>
              Probe & Skid Technical Questions
            </div>
          </div>

          <div style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', color: '#047857' }}>Resolved</span>
              <CheckCircle2 size={18} color="#047857" />
            </div>
            <div style={{ fontSize: '28px', fontWeight: 900, color: '#065F46', fontFamily: 'monospace' }}>
              {resolvedCount}
            </div>
            <div style={{ fontSize: '12px', color: '#065F46', marginTop: '4px' }}>
              Answered by Autogrow specialists
            </div>
          </div>

        </div>

        {/* Filter and Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap', backgroundColor: '#F9FAFB', padding: '16px 20px', borderRadius: '12px', border: '1px solid #E5E7EB', marginBottom: '24px' }}>
          
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {(['all', 'new', 'read', 'in_progress', 'resolved'] as const).map(st => (
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
                {st === 'all' ? `All Messages (${displayedInquiries.length})` : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: '#9CA3AF' }} />
            <input
              type="text"
              placeholder="Search by topic, customer, message..."
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

        {/* Inquiries Table */}
        {loading ? (
          <div style={{ padding: '64px', textAlign: 'center', color: '#6B7280' }}>
            <div style={{ width: '36px', height: '36px', border: '3px solid #E5E7EB', borderTopColor: '#76b82a', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px auto' }} />
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Loading inquiries...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '80px 24px', textAlign: 'center', backgroundColor: '#F9FAFB', borderRadius: '16px', border: '1px dashed #D1D5DB' }}>
            <MessageSquare size={44} color="#9CA3AF" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>
              {isAdmin ? 'No Matching Inquiries Found' : 'No Submitted Inquiries Yet'}
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              {isAdmin 
                ? (searchQuery || statusFilter !== 'all' ? 'Try adjusting your search criteria or status filter.' : 'Customer tickets submitted from technical forms will appear here.')
                : 'Use the feedback form above to submit your first inquiry or equipment question.'
              }
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB', color: '#4B5563', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  <th style={{ padding: '14px 18px' }}>Date</th>
                  <th style={{ padding: '14px 18px' }}>Grower Contact</th>
                  <th style={{ padding: '14px 18px' }}>Category</th>
                  <th style={{ padding: '14px 18px' }}>Subject / Preview</th>
                  <th style={{ padding: '14px 18px' }}>Status</th>
                  <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inq => {
                  const catBadge = getCategoryBadge(inq.category);
                  const stBadge = getStatusBadge(inq.status);

                  return (
                    <tr key={inq.id} style={{ borderBottom: '1px solid #F3F4F6' }}>
                      
                      <td style={{ padding: '16px 18px', color: '#6B7280', fontSize: '12.5px', whiteSpace: 'nowrap' }}>
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{inq.name}</div>
                        <div style={{ fontSize: '12px', color: '#6B7280' }}>{inq.email}</div>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ backgroundColor: catBadge.bg, color: catBadge.text, padding: '4px 10px', borderRadius: '6px', fontSize: '11.5px', fontWeight: 700 }}>
                          {catBadge.label}
                        </span>
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#111827', marginBottom: '2px' }}>{inq.subject}</div>
                        <div style={{ fontSize: '12.5px', color: '#6B7280', maxWidth: '320px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {inq.message}
                        </div>
                        {inq.admin_notes && (
                          <div style={{ fontSize: '11.5px', color: '#15803D', marginTop: '4px', fontStyle: 'italic' }}>
                            Support update: {inq.admin_notes}
                          </div>
                        )}
                      </td>

                      <td style={{ padding: '16px 18px' }}>
                        <span style={{ backgroundColor: stBadge.bg, color: stBadge.text, border: `1px solid ${stBadge.border}`, padding: '4px 10px', borderRadius: '999px', fontSize: '11.5px', fontWeight: 700 }}>
                          {stBadge.label}
                        </span>
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
                            fontWeight: 700,
                            color: '#374151',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <Eye size={13} />
                          {isAdmin ? 'Review' : 'View Ticket'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Inquiry Detail / Review Modal */}
        {selectedInquiry && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', maxWidth: '620px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '32px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0284C7' }}>
                    {getCategoryBadge(selectedInquiry.category).label}
                  </span>
                  <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', margin: '4px 0 0 0' }}>
                    {selectedInquiry.subject}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#9CA3AF' }}
                >
                  ✕
                </button>
              </div>

              {/* Sender Details */}
              <div style={{ backgroundColor: '#F9FAFB', borderRadius: '10px', padding: '14px 16px', marginBottom: '20px', border: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#111827', fontSize: '14px' }}>{selectedInquiry.name}</div>
                  <div style={{ color: '#4B5563', fontSize: '12px' }}>{selectedInquiry.email}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: '#6B7280' }}>
                  {new Date(selectedInquiry.created_at).toLocaleString()}
                </div>
              </div>

              {/* Message Content */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 800, marginBottom: '8px' }}>
                  Grower Message
                </div>
                <div style={{ padding: '16px', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '8px', fontSize: '14px', lineHeight: 1.6, color: '#1F2937', whiteSpace: 'pre-wrap' }}>
                  {selectedInquiry.message}
                </div>
              </div>

              {/* If Admin: status changing controls & internal notes */}
              {isAdmin ? (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12.5px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                      Autogrow Engineering Notes / Support Response
                    </label>
                    <textarea
                      rows={3}
                      value={adminNoteInput}
                      onChange={(e) => setAdminNoteInput(e.target.value)}
                      placeholder="Add engineering notes, parts quoted, or resolution details..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        border: '1px solid #D1D5DB',
                        fontSize: '13px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'read')}
                        style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #D1D5DB', backgroundColor: '#FFFFFF', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Mark Read
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'in_progress')}
                        style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#DBEAFE', color: '#1D4ED8', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        In Progress
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, 'resolved')}
                        style={{ padding: '8px 14px', borderRadius: '6px', border: 'none', backgroundColor: '#DCFCE7', color: '#15803D', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Resolve & Close
                      </button>
                    </div>

                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Re: Autogrow Technical Support: ${encodeURIComponent(selectedInquiry.subject)}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '8px 16px',
                        backgroundColor: '#1E2421',
                        color: '#86EFAC',
                        borderRadius: '6px',
                        fontSize: '12.5px',
                        fontWeight: 700,
                        textDecoration: 'none'
                      }}
                    >
                      <Mail size={13} />
                      Direct Email Reply
                    </a>
                  </div>
                </>
              ) : (
                /* Normal User view of the ticket */
                <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E5E7EB' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#4B5563' }}>Ticket Status:</span>
                    {(() => {
                      const st = getStatusBadge(selectedInquiry.status);
                      return (
                        <span style={{ backgroundColor: st.bg, color: st.text, border: `1px solid ${st.border}`, padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700 }}>
                          {st.label}
                        </span>
                      );
                    })()}
                  </div>
                  {selectedInquiry.admin_notes && (
                    <div style={{ marginTop: '12px', padding: '12px 16px', backgroundColor: '#F0FDF4', borderRadius: '8px', border: '1px solid #BBF7D0' }}>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#15803D', textTransform: 'uppercase', marginBottom: '4px' }}>
                        Autogrow Support Response:
                      </div>
                      <div style={{ fontSize: '13.5px', color: '#166534', lineHeight: 1.5 }}>
                        {selectedInquiry.admin_notes}
                      </div>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
