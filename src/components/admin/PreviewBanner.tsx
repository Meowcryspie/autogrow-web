import React from 'react';
import { Eye, Check, X, ArrowLeft } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

interface PreviewBannerProps {
  onReturnToAdmin: () => void;
}

export const PreviewBanner: React.FC<PreviewBannerProps> = ({ onReturnToAdmin }) => {
  const { isPreviewMode, setPreviewMode, publishDraft, isDraftModified } = useContent();

  if (!isPreviewMode) return null;

  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 9999,
        backgroundColor: '#1E2421',
        color: '#FFFFFF',
        borderBottom: '2px solid #76b82a',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#DCFCE7',
            color: '#15803D',
            padding: '3px 10px',
            borderRadius: '9999px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          <Eye size={13} />
          Live Preview Mode
        </span>
        <span style={{ fontSize: '13px', color: '#D1D5DB' }}>
          {isDraftModified 
            ? 'Viewing unpublished draft changes. Test navigation and layouts before committing.' 
            : 'Previewing saved site state.'}
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button
          onClick={() => {
            setPreviewMode(false);
            onReturnToAdmin();
          }}
          style={{
            padding: '6px 14px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: '#FFFFFF',
            border: '1px solid rgba(255,255,255,0.2)',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <ArrowLeft size={14} />
          Return to Admin Editor
        </button>

        {isDraftModified && (
          <button
            onClick={() => {
              publishDraft();
              alert('Draft changes successfully published and saved to local storage!');
            }}
            className="btn btn-primary"
            style={{ padding: '6px 16px', fontSize: '12.5px' }}
          >
            <Check size={14} />
            Publish Changes Now
          </button>
        )}

        <button
          onClick={() => setPreviewMode(false)}
          title="Dismiss Preview Mode"
          style={{
            background: 'none',
            border: 'none',
            color: '#9CA3AF',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '4px',
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
