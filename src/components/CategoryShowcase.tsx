import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onNavigateToSection: (sectionId: string) => void;
}

interface FeatureSection {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  targetSection: string;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onNavigateToSection }) => {
  const sections: FeatureSection[] = [
    {
      id: 'indoor-elevated',
      title: 'Commercial Environmental Control Elevated',
      description: 'Achieve precision indoor growing with MultiGrow controls, IntelliClimate, and EnviroSensors working in harmony. Automate every detail from ventilation to VPD for healthier plants, higher yields, and unmatched consistency.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2000&q=80',
      buttonText: 'Learn more',
      targetSection: 'suite',
    },
    {
      id: 'greenhouse-smarter',
      title: 'Greenhouse Growing Smarter, Stronger',
      description: 'Unlock the full potential of your commercial greenhouse with complete multi-compartment automation. From ridge vents and thermal screens to CO2 enrichment and supplemental lighting, everything works together for higher yields, lower costs, and peace of mind.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=2000&q=80',
      buttonText: 'Learn more',
      targetSection: 'suite',
    },
    {
      id: 'irrigation-smarter',
      title: 'The Fertigation is Smarter with Absolute Ease',
      description: 'Say goodbye to guesswork and complex timers. Our "feed-on-demand" proportional injection measures return drain EC and substrate moisture to deliver precise, automated irrigation with absolute ease.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=2000&q=80',
      buttonText: 'Learn more',
      targetSection: 'suite',
    },
    {
      id: 'safe-compliant',
      title: 'Safe, Compliant & Fail-Safe Protection',
      description: 'Autogrow gives large-scale commercial facilities peace of mind. Galvanic isolation, industrial IP66 die-cast enclosures, and instant alert relays ensure your facility stays protected 24/7.',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=2000&q=80',
      buttonText: 'Learn more',
      targetSection: 'where-to-buy',
    },
  ];

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
