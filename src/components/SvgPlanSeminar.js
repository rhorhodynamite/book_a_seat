import React from 'react';

function SVGPlanSeminar(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 300 125" xmlns="http://www.w3.org/2000/svg">
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
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#bdbdbd', stopOpacity: 1 }} />
        </linearGradient>
        <pattern id="floorPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="10" height="10" fill="#f0f0f0" />
          <path d="M 0 10 L 10 0" stroke="#ddd" strokeWidth="1" />
        </pattern>
      </defs>
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="1" rx="10" ry="10" fill="url(#roomGradient)" />

          {/* Side door at Room 1 */}
          <rect x="177" y="80" width="5" height="20" fill="url(#pillarGradient)" rx="1" ry="1" />

          {/* Corridor coming out of the right door */}
          <rect x="182" y="80" width="60" height="20" stroke="#000" strokeWidth="1" rx="2" ry="2" fill="url(#corridorGradient)" />
          {/* Corridor turns up */}
          <rect x="242" y="20" width="60" height="80" stroke="#000" strokeWidth="1" rx="3" ry="3" fill="url(#corridorGradient)" />

          {/* Nische */}
          <rect x="242" y="100" width="60" height="30" stroke="#000" strokeWidth="1" rx="3" ry="3" fill="url(#corridorGradient)" />

          {/* Office phone box at the top of the rightmost corridor */}
          <rect x="270" y="22" width="25" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />


          {/* Large conference desk */}
          <rect x="30" y="30" width="120" height="30" fill="url(#corridorGradient)" rx="4" ry="4" />

       


       

          {/* Windows */}
        
          <rect x="115" y="135" width="30" height="3" fill="#87CEEB" />

      

          {/* Kitchen area */}
          {/* Fridge */}
          <rect x="130" y="95" width="15" height="25" fill="#c0c0c0" rx="2" ry="2" />
          <line x1="150" y1="115" x2="155" y2="115" stroke="#000" strokeWidth="1" />
          {/* Sink */}
          <rect x="160" y="110" width="20" height="10" fill="#87CEEB" />
          <line x1="160" y1="115" x2="180" y2="115" stroke="#000" strokeWidth="1" />
          <line x1="165" y1="110" x2="165" y2="120" stroke="#000" strokeWidth="1" />
          {/* Stove */}
          <rect x="160" y="125" width="20" height="10" fill="#d3d3d3" />
          <circle cx="165" cy="130" r="2" fill="#000" />
          <circle cx="175" cy="130" r="2" fill="#000" />
        </g>
      </g>
           
          <text x="75" y="10" fontFamily="Verdana" fontSize="5" fill="black"> Meetingraum (OG) </text>
          <text x="230" y="125" fontFamily="Verdana" fontSize="5" fill="black">Nische Treppe  </text>
          <text x="230" y="10" fontFamily="Verdana" fontSize="5" fill="black">Telefonbox </text>
            
    </svg>
  );
}

export default SVGPlanSeminar;

