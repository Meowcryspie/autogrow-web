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
        height: 'clamp(600px, 52vw, 780px)',
        minHeight: '600px',
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
              objectPosition: 'center',
              transform: idx === currentSlide ? 'scale(1.02)' : 'scale(1.0)',
              transition: 'transform 7s ease',
            }}
          />
          {/* Subtle overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: s.isBannerOnly
                ? 'linear-gradient(90deg, rgba(14, 20, 16, 0.88) 0%, rgba(14, 20, 16, 0.6) 45%, rgba(14, 20, 16, 0.25) 100%), linear-gradient(to top, rgba(14, 20, 16, 0.75) 0%, transparent 40%)'
                : 'linear-gradient(90deg, rgba(14, 20, 16, 0.85) 0%, rgba(14, 20, 16, 0.55) 50%, rgba(14, 20, 16, 0.3) 100%)',
            }}
          />
        </div>
      ))}

      {/* Hero Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingBottom: '90px' }}>
        {active.isBannerOnly ? (
          <div style={{ maxWidth: '920px', padding: '20px 0' }}>
            {/* 3-line Autogrow Bold Uppercase Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 4.4rem)',
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                margin: '0 0 38px 0',
                color: '#FFFFFF',
                textTransform: 'uppercase',
                textShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
            >
              Growing Automation<br />
              Tailored to<br />
              Your Needs
            </h1>

            {/* 4 Commercial Operational Metrics with Green Hairline Bars */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(16px, 3vw, 40px)',
                maxWidth: '780px',
              }}
            >
              <div style={{ minWidth: '110px', flex: '1 1 0' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  31
                </div>
                <div style={{ fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 700, letterSpacing: '0.06em', color: '#D1D5DB', textTransform: 'uppercase', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  Years in Business
                </div>
                <div style={{ height: '2px', backgroundColor: '#76b82a', width: '100%', marginTop: '8px' }} />
              </div>

              <div style={{ minWidth: '110px', flex: '1 1 0' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  27
                </div>
                <div style={{ fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 700, letterSpacing: '0.06em', color: '#D1D5DB', textTransform: 'uppercase', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  Countries
                </div>
                <div style={{ height: '2px', backgroundColor: '#76b82a', width: '100%', marginTop: '8px' }} />
              </div>

              <div style={{ minWidth: '120px', flex: '1 1 0' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  75
                </div>
                <div style={{ fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 700, letterSpacing: '0.06em', color: '#D1D5DB', textTransform: 'uppercase', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  KM of Comms Cable
                </div>
                <div style={{ height: '2px', backgroundColor: '#76b82a', width: '100%', marginTop: '8px' }} />
              </div>

              <div style={{ minWidth: '110px', flex: '1 1 0' }}>
                <div style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1 }}>
                  5B
                </div>
                <div style={{ fontSize: 'clamp(10px, 1vw, 12px)', fontWeight: 700, letterSpacing: '0.06em', color: '#D1D5DB', textTransform: 'uppercase', marginTop: '6px', whiteSpace: 'nowrap' }}>
                  Data Points
                </div>
                <div style={{ height: '2px', backgroundColor: '#76b82a', width: '100%', marginTop: '8px' }} />
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
        className="d-none-mobile"
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
        className="d-none-mobile"
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
