import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

interface HeroSliderProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onNavigateToSection }) => {
  const { activeContent } = useContent();
  const slides = activeContent.heroSlides;

  const [currentSlide, setCurrentSlide] = useState(0);

  // Keep slide index in bounds
  useEffect(() => {
    if (currentSlide >= slides.length) {
      setCurrentSlide(0);
    }
  }, [slides.length, currentSlide]);

  // Auto advance slides every 6 seconds
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const active = slides[currentSlide] || slides[0];
  if (!active) return null;

  return (
    <section 
      id="hero"
      style={{
        position: 'relative',
        height: 'clamp(540px, 46vw, 720px)',
        width: '100%',
        backgroundColor: '#111827',
        color: '#FFFFFF',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Background Images with Fade Transition */}
      {slides.map((s, idx) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: 1,
          }}
        >
          <img 
            src={s.image} 
            alt={s.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: s.id === 'autogrow-banner' ? '25% center' : 'center',
              transform: idx === currentSlide ? 'scale(1.01)' : 'scale(1.0)',
              transition: 'transform 7s ease',
            }}
          />
          {/* Subtle overlay */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: s.isBannerOnly
                ? 'linear-gradient(to bottom, rgba(10, 14, 12, 0.2) 0%, rgba(10, 14, 12, 0.0) 40%, rgba(10, 14, 12, 0.5) 100%)'
                : 'linear-gradient(90deg, rgba(14, 20, 16, 0.85) 0%, rgba(14, 20, 16, 0.55) 50%, rgba(14, 20, 16, 0.3) 100%)',
            }}
          />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '70px' }}>
        {active.isBannerOnly ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', minHeight: '360px' }}>
            <div 
              style={{ 
                maxWidth: '300px', 
                backgroundColor: 'rgba(15, 23, 42, 0.72)', 
                backdropFilter: 'blur(12px)', 
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '14px',
                padding: '16px 18px',
                boxShadow: '0 16px 36px rgba(0,0,0,0.45)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#86EFAC',
                  fontSize: '11px',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Commercial CEA Systems
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => onNavigateToSection('suite')}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '10px 14px', fontSize: '13px', justifyContent: 'center' }}
                >
                  Explore
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => onNavigateToSection('where-to-buy')}
                  className="btn btn-outline-white"
                  style={{ flex: 1, padding: '10px 12px', fontSize: '13px', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.08)' }}
                >
                  Dealers
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: '780px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#A3E635',
                marginBottom: '18px',
              }}
            >
              AUTOGROW FLAGSHIP SYSTEMS · NZ ENGINEERED
            </div>

            <h1 
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                margin: '0 0 16px 0',
                color: '#FFFFFF',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
              }}
            >
              {active.title}
            </h1>

            <p 
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                color: '#E5E7EB',
                lineHeight: 1.5,
                margin: '0 0 32px 0',
                maxWidth: '680px',
                fontWeight: 400,
              }}
            >
              {active.subtitle}
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigateToSection(active.targetSection)}
                className="btn btn-primary"
                style={{ padding: '14px 32px', fontSize: '15px' }}
              >
                {active.buttonText}
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => onNavigateToSection('where-to-buy')}
                className="btn btn-outline-white"
                style={{ padding: '14px 28px', fontSize: '15px' }}
              >
                Where to Buy
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={() => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)}
        aria-label="Previous Slide"
        style={{
          position: 'absolute',
          left: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
      >
        <ChevronLeft size={22} />
      </button>

      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % slides.length)}
        aria-label="Next Slide"
        style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          background: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: '#FFFFFF',
          width: '46px',
          height: '46px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.7)')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.4)')}
      >
        <ChevronRight size={22} />
      </button>

      {/* TrolMaster Bottom Slide Selector Tabs */}
      <div 
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          backgroundColor: 'rgba(10, 14, 12, 0.6)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {slides.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  background: 'transparent',
                  border: 'none',
                  borderTop: idx === currentSlide ? '3px solid #76b82a' : '3px solid transparent',
                  color: idx === currentSlide ? '#FFFFFF' : '#9CA3AF',
                  fontWeight: idx === currentSlide ? 700 : 500,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                <div style={{ fontSize: '11px', color: idx === currentSlide ? '#76b82a' : '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Series 0{idx + 1}
                </div>
                {s.tag}
              </button>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
