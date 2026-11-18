import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface CategoryShowcaseProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onNavigateToSection }) => {
  const { activeContent } = useContent();
  const sections = activeContent.showcaseSections;

  return (
    <div id="showcase" style={{ display: 'flex', flexDirection: 'column' }}>
      {sections.map((sec, idx) => (
        <section
          key={sec.id}
          style={{
            position: 'relative',
            height: '620px',
            maxHeight: '75vh',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#111827',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <img 
              src={sec.image} 
              alt={sec.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* TrolMaster Dark Vignette Overlay */}
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                background: idx % 2 === 0
                  ? 'linear-gradient(90deg, rgba(14, 20, 16, 0.88) 0%, rgba(14, 20, 16, 0.6) 50%, rgba(14, 20, 16, 0.2) 100%)'
                  : 'linear-gradient(270deg, rgba(14, 20, 16, 0.88) 0%, rgba(14, 20, 16, 0.6) 50%, rgba(14, 20, 16, 0.2) 100%)',
              }}
            />
          </div>

          {/* Text Container */}
          <div className="container" style={{ position: 'relative', zIndex: 10 }}>
            <div 
              style={{ 
                maxWidth: '660px',
                marginLeft: idx % 2 === 0 ? '0' : 'auto',
                textAlign: 'left',
              }}
            >
              <h2 
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 800,
                  lineHeight: 1.12,
                  letterSpacing: '-0.02em',
                  color: '#FFFFFF',
                  marginBottom: '18px',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                }}
              >
                {sec.title}
              </h2>

              <p 
                style={{
                  fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
                  color: '#F3F4F6',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                  fontWeight: 400,
                }}
              >
                {sec.description}
              </p>

              <div>
                <button
                  onClick={() => onNavigateToSection(sec.targetSection)}
                  className="btn btn-primary"
                  style={{ padding: '12px 28px' }}
                >
                  {sec.buttonText}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>

        </section>
      ))}
    </div>
  );
};
