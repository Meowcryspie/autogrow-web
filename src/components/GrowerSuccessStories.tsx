import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export const GrowerSuccessStories: React.FC = () => {
  const stories = [
    {
      id: 'story-1',
      title: 'North Canterbury Vine Tomatoes',
      subtitle: 'A Commercial Acreage Facility Built on Solar Accumulator Steering',
      location: 'North Canterbury, New Zealand',
      excerpt: 'In the heart of Canterbury, this 12-hectare tomato glasshouse deployed MultiGrow Pro and SatuGrow FertiX to achieve 15% higher yields and 22% recurrent fertilizer recapture.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-2',
      title: 'Baja Desert Commercial Greenhouse',
      subtitle: 'Automation Made Simple in Arid Heat & Extreme VPD Conditions',
      location: 'Baja California, Mexico',
      excerpt: 'Facing intense summer heat spikes and variable water quality, this commercial facility automated multi-bay misting, ridge vents, and proportional EC injection without losing a single crop cycle.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    },
    {
      id: 'story-3',
      title: 'Ontario Tabletop Strawberry Facility',
      subtitle: 'Meeting the Challenges of High-Density Winter Production',
      location: 'Ontario, Canada',
      excerpt: 'Deploying FarmRoad Yield AI alongside IntelliDose and WCS substrate sensors, this operation perfected 24-hour vegetative dryback curves for premium day-neutral strawberries.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <section 
      id="stories"
      style={{
        padding: '96px 0',
        backgroundColor: '#F9FAFB',
        borderTop: '1px solid #E5E7EB',
        borderBottom: '1px solid #E5E7EB',
      }}
    >
      <div className="container">
        
        {/* TrolMaster Header */}
        <div style={{ maxWidth: '800px', marginBottom: '48px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#76b82a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Case Studies
          </p>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#111827', lineHeight: 1.1, margin: '0 0 16px 0' }}>
            Successes From Our Growers
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', margin: 0 }}>
            Helping every grower thrive—anywhere, in any space, and in any protected cropping climate.
          </p>
        </div>

        {/* 3 Story Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {stories.map((story) => (
            <div
              key={story.id}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                border: '1px solid #E5E7EB',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={story.image} 
                  alt={story.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: 'rgba(17, 24, 39, 0.85)',
                    backdropFilter: 'blur(4px)',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <MapPin size={12} style={{ color: '#76b82a' }} />
                  {story.location}
                </div>
              </div>

              {/* Text */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                    {story.title}
                  </h3>
                  <div style={{ fontSize: '12.5px', color: '#76b82a', fontWeight: 700, marginBottom: '12px' }}>
                    {story.subtitle}
                  </div>
                  <p style={{ fontSize: '13.5px', color: '#6B7280', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                    {story.excerpt}
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#111827',
                    fontWeight: 700,
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  Read grower study
                  <ArrowRight size={14} style={{ color: '#76b82a' }} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
