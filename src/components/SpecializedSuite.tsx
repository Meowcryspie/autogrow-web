import React from 'react';
import type { ProductItem } from '../types';
import { products } from '../data/mockProducts';

interface SpecializedSuiteProps {
  onSelectProduct: (product: ProductItem) => void;
}

export const SpecializedSuite: React.FC<SpecializedSuiteProps> = ({ onSelectProduct }) => {
  const suiteCards = [
    {
      productId: 'mgc-pro',
      tag: 'MULTIGROW PRO SERIES',
      category: 'ENVIRONMENTAL CONTROL',
      description: 'Integrated Climate, Airflow, VPD & CO2 Enrichment for commercial glasshouse acreage.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Master Your Climate →',
    },
    {
      productId: 'fertix-100',
      tag: 'SATUGROW FERTIX SERIES',
      category: 'PRECISION IRRIGATION',
      description: 'Closed-loop proportional injection up to 100 m³/hr with drain fraction recapture.',
      image: 'https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Master Your Root Zone →',
    },
    {
      productId: 'id-400',
      tag: 'INTELLIDOSE SERIES',
      category: 'DOSING AUTOMATION',
      description: '8-channel peristaltic nutrient and pH micro-dosing for tabletop berries and NFT channels.',
      image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Master Your Nutrients →',
    },
    {
      productId: 'icc-200',
      tag: 'INTELLICLIMATE CEA',
      category: 'ALL-IN-ONE GREENHOUSE CONTROL',
      description: 'Aspirated canopy sensing, thermal screens, and automated ridge vent actuation.',
      image: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?auto=format&fit=crop&w=1200&q=80',
      actionText: 'Master Your Elements →',
    },
  ];

  const handleCardClick = (productId: string) => {
    const found = products.find(p => p.id === productId || p.modelCode === productId);
    if (found) {
      onSelectProduct(found);
    }
  };

  return (
    <section 
      id="suite"
      style={{
        padding: '96px 0',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div className="container">
        
        {/* TrolMaster Section Header */}
        <div style={{ maxWidth: '800px', marginBottom: '48px' }}>
          <p style={{ fontSize: '13px', fontWeight: 700, color: '#76b82a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Specialized Suite
          </p>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#111827', lineHeight: 1.1, margin: '0 0 16px 0' }}>
            The Right Tools for Every Grow
          </h2>
          <p style={{ fontSize: '16px', color: '#4B5563', margin: 0 }}>
            Autogrow offers specific setups tailored for every scale of commercial protected cropping:
          </p>
        </div>

        {/* 4-Card Responsive Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {suiteCards.map((card) => (
            <div
              key={card.productId}
              onClick={() => handleCardClick(card.productId)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                border: '1px solid #E5E7EB',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Image Container */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img 
                  src={card.image} 
                  alt={card.tag}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div 
                  style={{
                    position: 'absolute',
                    top: '14px',
                    left: '14px',
                    backgroundColor: '#111827',
                    color: '#FFFFFF',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {card.tag}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#111827', marginBottom: '8px' }}>
                    {card.category}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: 1.5, marginBottom: '20px' }}>
                    {card.description}
                  </p>
                </div>

                <div 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#76b82a',
                    fontWeight: 700,
                    fontSize: '13.5px',
                  }}
                >
                  {card.actionText}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
