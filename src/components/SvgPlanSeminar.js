import React from 'react';

function SVGPlanSeminar(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'Arial', fontSize: '14px', marginBottom: '10px' }}>
        Seminar Room
      </div>
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
          <pattern id="floorPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="10" height="10" fill="#f0f0f0" />
            <path d="M 0 10 L 10 0" stroke="#ddd" strokeWidth="1" />
          </pattern>
        </defs>
        <g transform="translate(0 -14.7)" filter="url(#shadow)">
          <g fill="none" stroke="#000">
            {/* Room 1 Outline */}
            <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" rx="8" ry="8" fill="url(#floorPattern)" />

            {/* Door at the bottom of Room 1 */}
            <rect x="125" y="134" width="20" height="5" fill="url(#pillarGradient)" rx="1" ry="1" />

            {/* Side door at Room 1 */}
            <rect x="177" y="80" width="5" height="20" fill="url(#pillarGradient)" rx="1" ry="1" />

            {/* Corridor coming out of the right door */}
            <rect x="182" y="80" width="60" height="20" stroke="#000" strokeWidth="2" rx="4" ry="4" fill="url(#corridorGradient)" />
            {/* Corridor turns up */}
            <rect x="242" y="20" width="60" height="80" stroke="#000" strokeWidth="2" rx="8" ry="8" fill="url(#corridorGradient)" />

            {/* Office phone box at the top of the rightmost corridor */}
            <rect x="270" y="22" width="25" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />
            <circle cx="282.5" cy="37" r="5" fill="#000" />

            {/* Detailed corridor elements */}
            <line x1="182" y1="90" x2="242" y2="90" stroke="#000" strokeWidth="2" />
            <line x1="242" y1="30" x2="302" y2="30" stroke="#000" strokeWidth="2" />

            {/* Detailed phone box elements */}
            <line x1="272" y1="22" x2="272" y2="52" stroke="#000" strokeWidth="1" />
            <line x1="270" y1="24" x2="295" y2="24" stroke="#000" strokeWidth="1" />
            

            {/* Large conference desk */}
            <rect x="30" y="30" width="120" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />

            {/* Smaller desks in a square formation */}
            <rect x="25" y="90" width="20" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />
            <rect x="55" y="90" width="20" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />

            {/* Chairs around large conference desk */}
            <circle cx="40" cy="45" r="4" fill="#8B4513" />
            <circle cx="70" cy="45" r="4" fill="#8B4513" />
            <circle cx="100" cy="45" r="4" fill="#8B4513" />
            <circle cx="130" cy="45" r="4" fill="#8B4513" />
            <circle cx="160" cy="45" r="4" fill="#8B4513" />

            {/* Plants in the room */}
            <circle cx="25" cy="130" r="6" fill="green" />
            <circle cx="165" cy="100" r="6" fill="green" />

            {/* Wall Art */}
            <rect x="15" y="100" width="20" height="15" fill="#ffcccb" />
            <rect x="140" y="100" width="20" height="15" fill="#ffcccb" />

            {/* Windows */}
            <rect x="15" y="105" width="30" height="3" fill="#87CEEB" />
            <rect x="135" y="105" width="30" height="3" fill="#87CEEB" />

            {/* Rug under the conference desk */}
            <rect x="25" y="25" width="130" height="40" fill="#D3D3D3" rx="8" ry="8" />

            {/* Ceiling lights */}
            <circle cx="40" cy="120" r="2" fill="#FFFFE0" />
            <circle cx="60" cy="120" r="2" fill="#FFFFE0" />
            <circle cx="140" cy="120" r="2" fill="#FFFFE0" />
            <circle cx="160" cy="120" r="2" fill="#FFFFE0" />

            {/* Clock on the wall */}
            <circle cx="250" cy="25" r="5" fill="#FFF" stroke="#000" strokeWidth="1" />
            <line x1="250" y1="25" x2="250" y2="21" stroke="#000" strokeWidth="1" />
            <line x1="250" y1="25" x2="258" y2="25" stroke="#000" strokeWidth="1" />

            {/* Kitchen area */}
            {/* Fridge */}
            <rect x="150" y="105" width="15" height="25" fill="#c0c0c0" rx="2" ry="2" />
            <line x1="150" y1="115" x2="155" y2="115" stroke="#000" strokeWidth="1" />
            {/* Sink */}
            <rect x="160" y="110" width="20" height="10" fill="#87CEEB" />
            <line x1="160" y1="115" x2="180" y2="115" stroke="#000" strokeWidth="1" />
            <line x1="165" y1="110" x2="165" y2="120" stroke="#000" strokeWidth="1" />
            {/* Stove */}
            <rect x="160" y="125" width="20" height="10" fill="#d3d3d3" />
            <circle cx="165" cy="130" r="2" fill="#000" />
            <circle cx="175" cy="130" r="2" fill="#000" />
            {/* Cabinets */}
            <rect x="150" y="135" width="40" height="5" fill="#8B4513" rx="2" ry="2" />
            <line x1="160" y1="135" x2="160" y2="140" stroke="#000" strokeWidth="1" />
            <line x1="140" y1="137.5" x2="180" y2="137.5" stroke="#000" strokeWidth="1" />
          </g>
        </g>
      </svg>
    </div>
  );
}

export default SVGPlanSeminar;

