import React from 'react';

function SVGPlan(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} version="1.1" viewBox="0 0 300 125" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        <g fill="url(#roomGradient)" stroke="#ccc" strokeWidth="1">
          {/* Room outlines */}
          <rect x="10" y="16.7" width="170" height="120" rx="10" ry="10">
            <animate attributeName="opacity" values="0.8;1;0.8" dur="4s" repeatCount="indefinite" />
          </rect>
          <rect x="180" y="60" width="120" height="20" rx="5" ry="5" />
          <rect x="180" y="80" width="60" height="57" rx="5" ry="5" />
          <rect x="240" y="80" width="60" height="57" rx="5" ry="5" />
          
          {/* Furniture */}
          <rect x="50" y="100" width="10" height="10" fill="#ddd" rx="2" ry="2" />
          <rect x="130" y="100" width="10" height="10" fill="#ddd" rx="2" ry="2" />
          <rect x="133" y="113" width="5" height="4" fill="#4CAF50" rx="1" ry="1" />
        </g>
        
        {/* Doors */}
        <g fill="#90A4AE" stroke="#78909C" strokeWidth="0.5">
          <rect x="110" y="134" width="20" height="3" rx="1" ry="1" />
          <rect x="177" y="45" width="3" height="20" rx="1" ry="1" />
          <rect x="220" y="63" width="15" height="3" rx="1" ry="1" />
          <rect x="270" y="63" width="15" height="3" rx="1" ry="1" />
        </g>
      </g>
      
      {/* Text labels */}
      <g fontFamily="Arial, sans-serif" fontSize="6" fill="#333">
        <text x="75" y="50">Research Raum</text>
        <text x="200" y="75">Küche links</text>
        <text x="260" y="75">Küche rechts</text>
      </g>
    </svg>
  );
}

export default SVGPlan;


