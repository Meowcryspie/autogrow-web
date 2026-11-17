import React, { useState } from 'react';
import { ecosystemNodes } from '../data/mockProducts';
import type { EcosystemNode } from '../types';
import { 
  Cpu, 
  Activity, 
  Zap, 
  Cloud, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Network
} from 'lucide-react';

export const EcosystemSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'all' | 'brain' | 'sensor' | 'actuator' | 'cloud'>('all');
  const [activeNode, setActiveNode] = useState<EcosystemNode>(ecosystemNodes[0]);

  const filteredNodes = selectedRole === 'all' 
    ? ecosystemNodes 
    : ecosystemNodes.filter((n: EcosystemNode) => n.role === selectedRole);

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'brain':
        return { label: 'CENTRAL CONTROLLER', color: 'var(--color-green)' };
      case 'sensor':
        return { label: 'PRECISION SENSOR', color: 'var(--color-cyan)' };
      case 'actuator':
        return { label: 'ACTUATOR & PUMP', color: '#ffb703' };
      case 'cloud':
        return { label: 'CLOUD & TELEMETRY', color: '#a06cd5' };
      default:
        return { label: 'ECOSYSTEM NODE', color: 'var(--color-green)' };
    }
  };

  return (
    <section 
      id="ecosystem" 
      style={{
        padding: '100px 0',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
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
              marginBottom: '12px',
            }}
          >
            <Network size={14} />
            Modular CEA Architecture
          </div>
          <h2 
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '16px',
            }}
          >
            The Autogrow Ecosystem
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.6 }}>
            Similar to TrolMaster's daisy-chain topology, Autogrow links controllers, smart multi-variable sensors, 
            peristaltic dosing stations, and cloud analytics into a singular, fail-safe nervous system.
          </p>
        </div>

        {/* Filter Pills */}
        <div 
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px',
          }}
        >
          {[
            { id: 'all', label: 'All Architecture Nodes' },
            { id: 'brain', label: 'Master Controllers (Brain)' },
            { id: 'sensor', label: 'Sensory Probes' },
            { id: 'actuator', label: 'Dosing & Stations' },
            { id: 'cloud', label: 'IntelliGrow™ Cloud' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedRole(tab.id as any)}
              style={{
                padding: '8px 18px',
                borderRadius: '6px',
                fontSize: '12px',
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: 600,
                border: selectedRole === tab.id 
                  ? '1px solid var(--color-green)' 
                  : '1px solid rgba(255, 255, 255, 0.1)',
                background: selectedRole === tab.id 
                  ? 'rgba(0, 255, 136, 0.12)' 
                  : 'rgba(255, 255, 255, 0.03)',
                color: selectedRole === tab.id ? 'var(--color-green)' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Ecosystem Interactive Grid & Detail Panel */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start',
          }}
        >
          {/* Node Cards List */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '14px' }}>
            {filteredNodes.map((node: EcosystemNode) => {
              const isSelected = activeNode.id === node.id;
              const roleInfo = getRoleBadge(node.role);

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className={`card-tactical ${isSelected ? 'active' : ''}`}
                  style={{
                    padding: '20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(0, 255, 136, 0.05)' : 'rgba(16, 25, 20, 0.6)',
                    borderColor: isSelected ? 'var(--color-green)' : 'var(--border-color)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div 
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: roleInfo.color,
                      }}
                    >
                      {node.role === 'brain' && <Cpu size={22} />}
                      {node.role === 'sensor' && <Activity size={22} />}
                      {node.role === 'actuator' && <Zap size={22} />}
                      {node.role === 'cloud' && <Cloud size={22} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: roleInfo.color, fontWeight: 700 }}>
                          [{node.code}]
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {node.categoryTitle}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                        {node.name}
                      </h4>
                    </div>
                  </div>

                  <ArrowRight 
                    size={18} 
                    style={{ 
                      color: isSelected ? 'var(--color-green)' : 'var(--text-muted)',
                      transform: isSelected ? 'translateX(4px)' : 'none',
                      transition: 'transform 0.2s ease',
                    }} 
                  />
                </div>
              );
            })}
          </div>

          {/* Active Node Detail Stage (TrolMaster Specification Canvas) */}
          <div 
            style={{
              background: 'rgba(11, 18, 14, 0.85)',
              border: '1px solid var(--border-color)',
              borderRadius: '12px',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span 
                  style={{
                    display: 'inline-block',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: getRoleBadge(activeNode.role).color,
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginBottom: '10px',
                  }}
                >
                  {getRoleBadge(activeNode.role).label} · MODEL {activeNode.code}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                  {activeNode.name}
                </h3>
              </div>

              <div 
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '10px',
                  background: 'rgba(0, 255, 136, 0.08)',
                  border: '1px solid rgba(0, 255, 136, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)',
                }}
              >
                {activeNode.role === 'brain' && <Cpu size={26} />}
                {activeNode.role === 'sensor' && <Activity size={26} />}
                {activeNode.role === 'actuator' && <Zap size={26} />}
                {activeNode.role === 'cloud' && <Cloud size={26} />}
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeNode.description}
            </p>

            {/* Tactical Protocol Specs */}
            <div 
              style={{
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '16px',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Hardware Bus & Signaling
              </div>
              <div style={{ fontSize: '13px', color: '#fff', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                {activeNode.specs}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Hot-swappable modular bus with daisy-chain capability up to 1000m.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Isolated galvanic barrier protecting circuitry against inductive spikes.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={16} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Continuous cloud sync with on-device offline failsafe autonomy.</span>
              </div>
            </div>

            {/* Topology Diagram Graphic Box */}
            <div 
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-green)' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Industrial IP65 Rated Enclosure</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-cyan)' }}>
                NZ STANDARDS COMPLIANT
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};