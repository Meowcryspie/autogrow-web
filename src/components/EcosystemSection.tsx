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
        return { label: 'PRECISION SENSORY BUS', color: 'var(--color-cyan)' };
      case 'actuator':
        return { label: 'DOSING SKID & VALVES', color: 'var(--color-amber)' };
      case 'cloud':
        return { label: 'AGRONOMY AI & CLOUD', color: '#c084fc' };
      default:
        return { label: 'ECOSYSTEM NODE', color: 'var(--color-green)' };
    }
  };

  return (
    <section 
      id="ecosystem" 
      style={{
        padding: '96px 0',
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'relative',
      }}
    >
      <div className="container">
        
        {/* Section Header */}
        <div style={{ maxWidth: '820px', marginBottom: '40px' }}>
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
            <Network size={14} />
            Hardware & Bus Topology
          </div>
          <h2 
            className="font-display"
            style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: '#FFFFFF',
              margin: '0 0 16px 0',
            }}
          >
            Modular CEA Automation Architecture
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
            Similar to TrolMaster’s daisy-chain bus, Autogrow links central controllers, aspirated sensory pods, 
            high-volume fertigation skids, and FarmRoad agronomy AI into a singular, fail-safe nervous system.
          </p>

          {/* Filter Pills */}
          <div 
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '28px',
            }}
          >
            {[
              { id: 'all', label: 'All Architecture Nodes' },
              { id: 'brain', label: 'Master Controllers' },
              { id: 'sensor', label: 'Sensory Bus' },
              { id: 'actuator', label: 'Dosing Skids' },
              { id: 'cloud', label: 'Cloud & Yield AI' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedRole(tab.id as any)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '3px',
                  fontSize: '12px',
                  fontFamily: 'var(--font-mono)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em',
                  fontWeight: 600,
                  border: selectedRole === tab.id 
                    ? '1px solid var(--color-green)' 
                    : '1px solid var(--border-subtle)',
                  background: selectedRole === tab.id 
                    ? 'rgba(0, 229, 117, 0.12)' 
                    : 'var(--bg-surface)',
                  color: selectedRole === tab.id ? 'var(--color-green)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.14s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ecosystem Interactive Grid & Detail Panel */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
            alignItems: 'start',
          }}
        >
          {/* Node Cards List */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
            {filteredNodes.map((node: EcosystemNode) => {
              const isSelected = activeNode.id === node.id;
              const roleInfo = getRoleBadge(node.role);

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNode(node)}
                  className="panel-chassis"
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    background: isSelected ? 'var(--bg-surface-elevated)' : 'var(--bg-card)',
                    borderColor: isSelected ? 'var(--color-green)' : 'var(--border-subtle)',
                    transition: 'all 0.14s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div 
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '3px',
                        background: 'var(--bg-void)',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: roleInfo.color,
                      }}
                    >
                      {node.role === 'brain' && <Cpu size={20} />}
                      {node.role === 'sensor' && <Activity size={20} />}
                      {node.role === 'actuator' && <Zap size={20} />}
                      {node.role === 'cloud' && <Cloud size={20} />}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: roleInfo.color, fontWeight: 700 }}>
                          [{node.code}]
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {node.categoryTitle}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', margin: 0 }}>
                        {node.name}
                      </h4>
                    </div>
                  </div>

                  <ArrowRight 
                    size={16} 
                    style={{ 
                      color: isSelected ? 'var(--color-green)' : 'var(--text-muted)',
                      transform: isSelected ? 'translateX(3px)' : 'none',
                      transition: 'transform 0.14s ease',
                    }} 
                  />
                </div>
              );
            })}
          </div>

          {/* Active Node Detail Stage (TrolMaster Engineering Canvas) */}
          <div 
            className="panel-chassis"
            style={{
              padding: '32px',
              position: 'relative',
              background: 'var(--bg-surface)',
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
              <div>
                <span className="decal-badge" style={{ color: getRoleBadge(activeNode.role).color, marginBottom: '8px' }}>
                  {getRoleBadge(activeNode.role).label} · [{activeNode.code}]
                </span>
                <h3 className="font-display" style={{ fontSize: '24px', fontWeight: 800, color: '#FFFFFF', margin: 0 }}>
                  {activeNode.name}
                </h3>
              </div>

              <div 
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '3px',
                  background: 'var(--bg-void)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-green)',
                }}
              >
                {activeNode.role === 'brain' && <Cpu size={24} />}
                {activeNode.role === 'sensor' && <Activity size={24} />}
                {activeNode.role === 'actuator' && <Zap size={24} />}
                {activeNode.role === 'cloud' && <Cloud size={24} />}
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeNode.description}
            </p>

            {/* Tactical Protocol Specs */}
            <div 
              style={{
                background: 'var(--bg-void)',
                borderRadius: '3px',
                border: '1px solid var(--border-subtle)',
                padding: '16px',
                marginBottom: '24px',
              }}
            >
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', marginBottom: '6px' }}>
                Hardware Bus Signaling & Physical Topology
              </div>
              <div style={{ fontSize: '13px', color: '#FFFFFF', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                {activeNode.specs}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Hot-swappable modular bus with daisy-chain capability up to 1000m.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Isolated 2.5 kV galvanic barrier protecting against inductive pump spikes.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                <CheckCircle2 size={15} style={{ color: 'var(--color-green)', flexShrink: 0 }} />
                <span>Continuous cloud sync with on-device offline fail-safe logic preservation.</span>
              </div>
            </div>

            {/* Footer Specifications */}
            <div 
              style={{
                borderTop: '1px solid var(--border-subtle)',
                paddingTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={15} style={{ color: 'var(--color-green)' }} />
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Industrial IP66 / NEMA 4X Rated</span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-cyan)' }}>
                NEW ZEALAND ENGINEERED
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};