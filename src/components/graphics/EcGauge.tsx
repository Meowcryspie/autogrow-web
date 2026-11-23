import React from 'react';

interface EcGaugeProps {
  ec: number;
  target: number;
  lowLimit: number;
  highLimit: number;
  statusColor: 'green' | 'amber' | 'red' | 'grey';
  isOffline?: boolean;
}

export const EcGauge: React.FC<EcGaugeProps> = ({
  ec,
  target,
  lowLimit,
  highLimit,
  statusColor,
  isOffline = false,
}) => {
  const cx = 150;
  const cy = 150;
  const r = 118;
  const minVal = 1.0;
  const maxVal = 2.6;
  const range = maxVal - minVal;

  const getAngle = (val: number) => {
    const clamped = Math.max(minVal, Math.min(maxVal, val));
    return Math.PI * (1 - (clamped - minVal) / range);
  };

  const getPoint = (angle: number, radius: number) => {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy - radius * Math.sin(angle),
    };
  };

  const startBg = getPoint(Math.PI, r);
  const endBg = getPoint(0, r);
  const bgPath = `M ${startBg.x} ${startBg.y} A ${r} ${r} 0 0 1 ${endBg.x} ${endBg.y}`;

  const angleLow = getAngle(lowLimit);
  const angleHigh = getAngle(highLimit);
  const pSafeStart = getPoint(angleLow, r);
  const pSafeEnd = getPoint(angleHigh, r);
  const safeArc = `M ${pSafeStart.x} ${pSafeStart.y} A ${r} ${r} 0 0 1 ${pSafeEnd.x} ${pSafeEnd.y}`;

  const currentAngle = getAngle(ec);
  const endVal = getPoint(currentAngle, r);
  const valPath = `M ${startBg.x} ${startBg.y} A ${r} ${r} 0 0 1 ${endVal.x} ${endVal.y}`;

  const renderTick = (val: number, stroke: string, strokeWidth = 3, length = 14) => {
    const angle = getAngle(val);
    const pOuter = getPoint(angle, r + 5);
    const pInner = getPoint(angle, r - length);
    return (
      <line
        key={val}
        x1={pInner.x}
        y1={pInner.y}
        x2={pOuter.x}
        y2={pOuter.y}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    );
  };

  const colorMap = {
    green: '#15803D',
    amber: '#D97706',
    red: '#DC2626',
    grey: '#9CA3AF',
  };

  const activeColor = colorMap[statusColor];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <svg
        viewBox="0 0 300 178"
        width="100%"
        style={{ maxWidth: '280px', overflow: 'visible' }}
        role="img"
        aria-label={`EC Gauge: current reading ${ec.toFixed(2)} mS/cm, target ${target.toFixed(1)}`}
      >
        <defs>
          <filter id="ecGaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={activeColor} floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Track */}
        <path
          d={bgPath}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="14"
          strokeLinecap="round"
        />

        {/* Safe Operating Corridor */}
        <path
          d={safeArc}
          fill="none"
          stroke="#76b82a"
          strokeWidth="14"
          opacity="0.3"
        />

        {/* Active Arc */}
        <path
          d={valPath}
          fill="none"
          stroke={activeColor}
          strokeWidth="14"
          strokeLinecap="round"
          filter="url(#ecGaugeGlow)"
          style={{ transition: 'all 0.3s ease-out' }}
        />

        {/* Limits */}
        {renderTick(lowLimit, '#D97706', 3, 12)}
        {renderTick(highLimit, '#D97706', 3, 12)}
        {renderTick(target, '#111827', 4, 16)}

        <text x="24" y="165" fill="#9CA3AF" fontSize="11" fontWeight="600" fontFamily="monospace">1.0</text>
        <text x="264" y="165" fill="#9CA3AF" fontSize="11" fontWeight="600" fontFamily="monospace">2.6</text>

        <text
          x={cx}
          y={cy - 12}
          textAnchor="middle"
          fill={isOffline ? '#9CA3AF' : '#111827'}
          fontSize="42"
          fontWeight="800"
          fontFamily="monospace"
          letterSpacing="-1px"
        >
          {ec.toFixed(2)}
        </text>

        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="#6B7280"
          fontSize="12"
          fontWeight="700"
        >
          mS/cm
        </text>
      </svg>
    </div>
  );
};
