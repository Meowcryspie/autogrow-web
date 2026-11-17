import React from 'react';
import { ArrowLeft, Globe, Award, Shield, Users } from 'lucide-react';

interface AboutPageProps {
  onBackToHome: () => void;
  onNavigateToSection: (sectionId: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onBackToHome, onNavigateToSection }) => {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '40px', paddingBottom: '96px' }}>
      
      {/* Top Breadcrumb Header */}
      <div className="container" style={{ marginBottom: '36px' }}>
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
            padding: '6px 0',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#76b82a')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6B7280')}
        >
          <ArrowLeft size={16} />
          Back to Homepage
        </button>
      </div>

      {/* Hero Banner */}
      <div className="container" style={{ marginBottom: '64px' }}>
        <div style={{ maxWidth: '840px' }}>
          <div 
            style={{
              display: 'inline-block',
              backgroundColor: '#F0FDF4',
              color: '#15803D',
              border: '1px solid #BBF7D0',
              padding: '4px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '16px',
            }}
          >
            Pioneering AgTech Since 1994 · Auckland, New Zealand
          </div>

          <h1 
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 3.8rem)',
              fontWeight: 900,
              color: '#111827',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '24px',
            }}
          >
            Built for Real Growers.<br />
            <span style={{ color: '#76b82a' }}>Engineered with Precision.</span>
          </h1>

          <p style={{ fontSize: '18px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
            Autogrow started in a small workshop in Auckland, New Zealand with a simple, unwavering goal: 
            help commercial growers get better, more consistent crops with less waste, less manual labor, and zero guesswork.
          </p>
        </div>
      </div>

      {/* 4 Pillars Grid */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <Award size={28} style={{ color: '#76b82a', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              30+ Years of Field Pedigree
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              Over three decades refining climate algorithms and proportional fertigation in real commercial glasshouses across 45+ countries.
            </p>
          </div>

          <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <Shield size={28} style={{ color: '#0284C7', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Autonomous Fail-Safe Logic
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              Controllers execute heating, venting, and dosing recipes locally on hardware. No cloud outage ever endangers your crop.
            </p>
          </div>

          <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <Globe size={28} style={{ color: '#D97706', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Global Grower Footprint
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              Supported by factory-certified distributors, local agronomists, and parts stocking centers in Australasia, the Americas, Europe, and Asia.
            </p>
          </div>

          <div style={{ padding: '28px', borderRadius: '16px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
            <Users size={28} style={{ color: '#7C3AED', marginBottom: '16px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
              Grower-First Engineering
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              Designed with real terminal blocks, rugged NEMA 4X enclosures, and straightforward software built around grower workflows—not tech hype.
            </p>
          </div>

        </div>
      </div>

      {/* Historical Milestones Timeline */}
      <div className="container" style={{ marginBottom: '80px' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111827', marginBottom: '32px', textAlign: 'center' }}>
            Our Heritage & Journey
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', borderLeft: '3px solid #E5E7EB', paddingLeft: '32px', marginLeft: '16px' }}>
            
            {/* 1994 */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-42px', top: '4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#76b82a', border: '4px solid #FFFFFF', boxShadow: '0 0 0 2px #76b82a' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#76b82a', marginBottom: '4px' }}>1994 · FOUNDING IN AUCKLAND</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                Jeff Broad Founds Autogrow
              </h3>
              <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Jeff Broad began Autogrow while serving as a senior lecturer at the Manukau Institute of Technology (MIT) in Auckland, New Zealand. 
                Under his leadership, Autogrow developed its pioneering microprocessor-driven fertigation and environmental controllers, growing from a regional New Zealand innovator into an international supplier of protected cropping automation.
              </p>
            </div>

            {/* 2013-2020 */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-42px', top: '4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#0284C7', border: '4px solid #FFFFFF', boxShadow: '0 0 0 2px #0284C7' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#0284C7', marginBottom: '4px' }}>2013 – 2020 · CLOUD SCALING & AGRONOMY AI</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                MultiGrow Global Expansion & FarmRoad
              </h3>
              <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                With expanded engineering teams across North America and Australasia, Autogrow launched the MultiGrow Pro platform and incubated FarmRoad—a cloud platform pioneering crop yield forecasting and autonomous microclimate anomaly detection.
              </p>
            </div>

            {/* 2021 */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-42px', top: '4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#D97706', border: '4px solid #FFFFFF', boxShadow: '0 0 0 2px #D97706' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#D97706', marginBottom: '4px' }}>2021 · ALLIANCE WITH BLUELAB</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                Joining New Zealand Precision Measurement Leaders
              </h3>
              <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                Autogrow was acquired by longtime New Zealand competitor and measurement powerhouse Bluelab, sharing optical, electrochemical, and sensory R&D to strengthen probe longevity and measurement precision worldwide.
              </p>
            </div>

            {/* 2024 - Today */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '-42px', top: '4px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: '#76b82a', border: '4px solid #FFFFFF', boxShadow: '0 0 0 2px #76b82a' }} />
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#76b82a', marginBottom: '4px' }}>2024 & BEYOND · THE EXCEL SEEDS PARTNERSHIP</div>
              <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                Global Commercial Expansion & Next-Gen SatuGrow
              </h3>
              <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: 1.6, margin: 0 }}>
                In 2024, the commercial enterprise division serving small-to-medium and commercial greenhouse operations was acquired in partnership with longtime Malaysian distributor Excel Seeds. 
                Today, our core R&D and firmware engineering team remains firmly anchored in Auckland, New Zealand, supported by dedicated commercial and support staff in the USA and Southeast Asia.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Global Locations Strip */}
      <div className="container">
        <div style={{ backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '40px', border: '1px solid #E5E7EB' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', marginBottom: '20px', textAlign: 'center' }}>
            Autogrow Global Facilities
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#76b82a', marginBottom: '6px' }}>🇳🇿 Global Headquarters</h4>
              <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Autogrow Systems Ltd.<br />
                61 Constellation Drive, Rosedale<br />
                Auckland 0632, New Zealand<br />
                PH: +64 9 415 2380
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#0284C7', marginBottom: '6px' }}>🇲🇾 Southeast Asia Hub</h4>
              <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Excel Seeds Sdn Bhd<br />
                No 15, Jalan Industri USJ 1/3<br />
                47600 Subang Jaya, Selangor, Malaysia<br />
                PH: +60 3-8023 2388
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#D97706', marginBottom: '6px' }}>🇺🇸 Americas Integration Center</h4>
              <p style={{ fontSize: '13.5px', color: '#4B5563', lineHeight: 1.5, margin: 0 }}>
                Autogrow Americas Support<br />
                California & Michigan Field Engineering<br />
                United States & Canada<br />
                PH: +1 (800) 852-3088
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              onClick={() => onNavigateToSection('where-to-buy')}
              className="btn btn-primary"
              style={{ padding: '12px 32px' }}
            >
              Explore Where to Buy in Your Country
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
