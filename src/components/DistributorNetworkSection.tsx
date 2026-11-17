import React, { useState } from 'react';
import { DISTRIBUTORS_DATA } from '../data/mockProducts';
import type { DistributorLocation } from '../types';
import { Globe, Phone, Mail } from 'lucide-react';

export const DistributorNetworkSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const regions = ['All', 'Australasia (Global HQ)', 'North America', 'Europe', 'Latin America', 'Asia-Pacific'];

  const filteredDistributors = selectedRegion === 'All'
    ? DISTRIBUTORS_DATA
    : DISTRIBUTORS_DATA.filter((d: DistributorLocation) => d.region.includes(selectedRegion) || selectedRegion.includes(d.region));

  return (
    <section 
      id="distributors"
      style={{
        padding: '96px 0',
        background: 'var(--bg-void)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Header */}
        <div style={{ maxWidth: '800px', marginBottom: '40px' }}>
          <div 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--color-green)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Globe size={14} />
            Where to Buy & Global Engineering Support
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              lineHeight: 1.08,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Certified Autogrow Global Distribution Network
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Deploy with confidence. Autogrow controllers, skids, and sensory arrays are backed by factory-trained integration partners and 24/7 technical hotlines across 45+ countries.
          </p>
        </div>

        {/* Region Filter Tabs */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '32px',
          }}
        >
          {regions.map((region) => (
            <button
              key={region}
              onClick={() => setSelectedRegion(region)}
              style={{
                padding: '8px 16px',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                border: selectedRegion === region ? '1px solid var(--color-green)' : '1px solid var(--border-subtle)',
                background: selectedRegion === region ? 'rgba(0, 229, 117, 0.12)' : 'var(--bg-surface)',
                color: selectedRegion === region ? 'var(--color-green)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.14s ease',
              }}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Distributor Cards Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '16px',
          }}
        >
          {filteredDistributors.map((dist) => (
            <div 
              key={dist.id}
              className="panel-chassis"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span className="decal-badge" style={{ color: 'var(--color-green)', borderColor: 'rgba(0, 229, 117, 0.3)' }}>
                    {dist.region}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {dist.country}
                  </span>
                </div>

                <h4 style={{ fontSize: '17px', fontWeight: 700, color: '#FFFFFF', marginBottom: '6px' }}>
                  {dist.partnerName}
                </h4>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '18px' }}>
                  <strong>Territory:</strong> {dist.territory}
                </div>
              </div>

              <div 
                style={{
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Phone size={13} style={{ color: 'var(--color-green)' }} />
                  <span>{dist.supportPhone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)' }}>
                  <Mail size={13} style={{ color: 'var(--color-cyan)' }} />
                  <a href={`mailto:${dist.email}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    {dist.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};