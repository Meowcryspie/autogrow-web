import React, { useRef } from 'react';
import { Upload, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (newUrl: string) => void;
  aspectRatio?: 'video' | 'card' | 'square';
  placeholder?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  aspectRatio = 'video',
  placeholder = 'https://...',
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        alert('File size exceeds 4MB. For static browser storage, please choose an image under 4MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const sampleImages = [
    { label: 'Glasshouse', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Dosing Skid', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Nutrients', url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Substrate', url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '13px', fontWeight: 700, color: '#374151' }}>
        {label}
      </label>

      {/* Visual Preview Box */}
      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: aspectRatio === 'video' ? '180px' : aspectRatio === 'card' ? '150px' : '120px',
          backgroundColor: '#F3F4F6',
          borderRadius: '10px',
          border: '1px dashed #D1D5DB',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {value ? (
          <>
            <img 
              src={value} 
              alt={label} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <button
              type="button"
              onClick={() => onChange('')}
              title="Remove Image"
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                backgroundColor: 'rgba(17, 24, 39, 0.75)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <X size={15} />
            </button>
            <span 
              style={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                backgroundColor: 'rgba(0,0,0,0.65)',
                color: '#FFFFFF',
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                fontFamily: 'monospace',
              }}
            >
              {value.startsWith('data:') ? 'Uploaded File (Base64)' : 'External URL'}
            </span>
          </>
        ) : (
          <div style={{ textAlign: 'center', color: '#9CA3AF', padding: '16px' }}>
            <ImageIcon size={32} style={{ margin: '0 auto 6px', color: '#CBD5E1' }} />
            <div style={{ fontSize: '12.5px', fontWeight: 600 }}>No image selected</div>
            <div style={{ fontSize: '11px' }}>Upload a file or enter an image URL below</div>
          </div>
        )}
      </div>

      {/* Upload and URL Input Controls */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input 
          type="file" 
          ref={fileInputRef} 
          accept="image/*" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '8px 14px',
            backgroundColor: '#1E2421',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            fontSize: '12.5px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          <Upload size={14} style={{ color: '#76b82a' }} />
          Upload Image
        </button>

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <LinkIcon size={14} style={{ position: 'absolute', left: '10px', color: '#9CA3AF' }} />
          <input 
            type="text" 
            placeholder={placeholder}
            value={value.startsWith('data:') ? '(Uploaded Base64 Image File)' : value}
            onChange={(e) => onChange(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px 8px 30px',
              border: '1px solid #D1D5DB',
              borderRadius: '6px',
              fontSize: '12px',
              outline: 'none',
              fontFamily: value.startsWith('data:') ? 'inherit' : 'monospace',
              backgroundColor: value.startsWith('data:') ? '#F9FAFB' : '#FFFFFF',
            }}
          />
        </div>
      </div>

      {/* Preset Quick Select Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '10.5px', color: '#6B7280', fontWeight: 600 }}>Presets:</span>
        {sampleImages.map((s, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onChange(s.url)}
            style={{
              padding: '2px 8px',
              backgroundColor: '#F3F4F6',
              border: '1px solid #E5E7EB',
              borderRadius: '4px',
              fontSize: '10.5px',
              color: '#374151',
              cursor: 'pointer',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
};
