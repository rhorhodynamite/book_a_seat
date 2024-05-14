import React from 'react';

function SVGPlanSeminar(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} version="1.1" viewBox="0 0 300 125" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#A0522D', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#d3d3d3', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#a9a9a9', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" rx="8" ry="8" />
          
          {/* Pillar 1 in Room 1 */}
          <rect x="120" y="80" width="20" height="30" fill="url(#pillarGradient)" rx="2" ry="2" />
          
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="134" width="20" height="5" fill="url(#pillarGradient)" rx="1" ry="1" />
          
          {/* Side door at Room 1 */}
          <rect x="177" y="80" width="5" height="20" fill="url(#pillarGradient)" rx="1" ry="1" />
          
          {/* Corridor coming out of the right door */}
          <rect x="182" y="80" width="60" height="20" stroke="#000" strokeWidth="2" rx="4" ry="4" fill="url(#corridorGradient)" />
          
          {/* Connecting passage space (turns up) */}
          <rect x="242" y="20" width="60" height="80" stroke="#000" strokeWidth="2" rx="8" ry="8" fill="url(#corridorGradient)" />
          
          {/* Staircase 1 along the corridor */}
          <path d="M192,85 L192,65 L194,65 L194,85 Z" fill="url(#corridorGradient)" />
          <path d="M194,85 L194,65 L196,65 L196,85 Z" fill="url(#corridorGradient)" />
          <path d="M196,85 L196,65 L198,65 L198,85 Z" fill="url(#corridorGradient)" />
          
          {/* Staircase 2 along the corridor */}
          <path d="M232,85 L232,65 L234,65 L234,85 Z" fill="url(#corridorGradient)" />
          <path d="M234,85 L234,65 L236,65 L236,85 Z" fill="url(#corridorGradient)" />
          <path d="M236,85 L236,65 L238,65 L238,85 Z" fill="url(#corridorGradient)" />
          
          {/* Office phone box at the top of the rightmost corridor */}
          <rect x="270" y="22" width="25" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />
          <circle cx="282.5" cy="37" r="5" fill="#000" />
        </g>
      </g>
      <g fontFamily="Arial" fontSize="14" fill="#000">
        <text x="150" y="14" textAnchor="middle">Seminar Room</text>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;

