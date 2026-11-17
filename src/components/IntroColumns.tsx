import React from 'react';

export const IntroColumns: React.FC = () => {
  return (
    <section 
      style={{
        padding: '80px 0 70px',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #F3F4F6',
      }}
    >
      <div className="container">
        <div style={{ maxWidth: '980px', margin: '0 auto', textAlign: 'center' }}>
          
          <p 
            style={{
              fontSize: 'clamp(1.15rem, 2.2vw, 1.45rem)',
              color: '#1F2937',
              lineHeight: 1.6,
              fontWeight: 500,
              marginBottom: '20px',
            }}
          >
            Autogrow, along with FarmRoad and SatuGrow, provides a flexible, modular smart farming ecosystem tailored to growers of all scales—from craft research chambers to commercial acreage facilities.
          </p>

          <p 
            style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
              color: '#4B5563',
              lineHeight: 1.65,
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Through advanced remote telemetry and autonomous fail-safe local logic, you can manage your lighting, airflow, fertigation, and environmental parameters effortlessly from anywhere, at any time.
          </p>

          <p 
            style={{
              fontSize: 'clamp(0.95rem, 1.6vw, 1.15rem)',
              color: '#6B7280',
              lineHeight: 1.65,
              fontWeight: 400,
              margin: 0,
            }}
          >
            Our comprehensive system delivers proven New Zealand engineering for closed-loop automation, crop steering, and data collection—empowering you to achieve maximum yields and consistent quality harvest after harvest.
          </p>

        </div>
      </div>
    </section>
  );
};
