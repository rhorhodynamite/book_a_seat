import React from 'react';

function SVGPlan(props) {
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
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#D2691E', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="plantGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#228B22', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#006400', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" rx="5" ry="4" />
           {/* corridor*/}
          <rect x="180" y="60" width="120" height="20" stroke="#000" strokeWidth="2" rx="4" ry="3" />
           {/* Room 2 Outline */}
          <rect x="180" y="80" width="60" height="57" stroke="#000" strokeWidth="2" rx="3" ry="2" />
           {/* Room 3 Outline */}
          <rect x="240" y="80" width="60" height="57" stroke="#000" strokeWidth="2" rx="3" ry="2" />
          
          {/* Pillar 1 in Room 1 */}
          <rect x="50" y="100" width="10" height="10" fill="url(#pillarGradient)" rx="2" ry="2" />
          
          {/* Pillar 2 in Room 1 */}
          <rect x="150" y="100" width="10" height="10" fill="url(#pillarGradient)" rx="2" ry="2" />
          
          {/* Plants below Pillar 2 */}
          <rect x="153" y="113" width="5" height="4" fill="url(#plantGradient)" rx="1" ry="1" />
          <rect x="152" y="122" width="6" height="4" fill="url(#plantGradient)" rx="1" ry="1" />
          <rect x="154" y="129" width="4" height="3" fill="url(#plantGradient)" rx="1" ry="1" />
          
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="134" width="20" height="5" fill="url(#doorGradient)" rx="1" ry="1" />
          
          {/* Side door at Room 1 */}
          <rect x="177" y="60" width="5" height="20" fill="url(#doorGradient)" rx="1" ry="1" />
        </g>
      </g>
    </svg>
  );
}

export default SVGPlan;


