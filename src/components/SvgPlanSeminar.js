import React from 'react';

function SVGPlanSeminar(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';
  
  return (
    <svg width={width} height={height} viewBox="0 0 300 125" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eeeeee" />
          <stop offset="100%" stopColor="#d5d5d5" />
        </linearGradient>
      </defs>
      
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        {/* Main room */}
        <rect x="10" y="16.7" width="170" height="120" stroke="#ccc" strokeWidth="0.5" rx="10" ry="10" fill="url(#roomGradient)">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Side door */}
        <rect x="177" y="80" width="3" height="20" fill="#90A4AE" rx="1" ry="1" />
        
        {/* Corridors */}
        <rect x="182" y="80" width="60" height="20" stroke="#ccc" strokeWidth="0.5" rx="5" ry="5" fill="url(#corridorGradient)" />
        <rect x="242" y="20" width="60" height="80" stroke="#ccc" strokeWidth="0.5" rx="5" ry="5" fill="url(#corridorGradient)" />
        <rect x="242" y="100" width="60" height="30" stroke="#ccc" strokeWidth="0.5" rx="5" ry="5" fill="url(#corridorGradient)" />
        
        {/* Office phone box */}
        <rect x="270" y="22" width="25" height="30" fill="#BBDEFB" rx="4" ry="4" stroke="#90CAF9" strokeWidth="0.5" />
        
        {/* Large conference desk */}
        <rect x="30" y="30" width="120" height="30" fill="#BDBDBD" rx="4" ry="4" stroke="#9E9E9E" strokeWidth="0.5" />
        
        {/* Windows */}
        <rect x="115" y="135" width="30" height="2" fill="#81D4FA" />
        
        {/* Kitchen area */}
        <rect x="120" y="75" width="25" height="40" fill="#CFD8DC" rx="2" ry="2" stroke="#B0BEC5" strokeWidth="0.5" />
        <rect x="160" y="110" width="20" height="10" fill="#81D4FA" stroke="#4FC3F7" strokeWidth="0.5" />
        <line x1="160" y1="115" x2="180" y2="115" stroke="#4FC3F7" strokeWidth="0.5" />
        <line x1="165" y1="110" x2="165" y2="120" stroke="#4FC3F7" strokeWidth="0.5" />
        <rect x="160" y="125" width="20" height="10" fill="#E0E0E0" stroke="#BDBDBD" strokeWidth="0.5" />
        <circle cx="165" cy="130" r="1.5" fill="#757575" />
        <circle cx="175" cy="130" r="1.5" fill="#757575" />
      </g>
      
      {/* Text labels */}
      <g fontFamily="Arial, sans-serif" fontSize="6" fill="#424242">
        <text x="75" y="10">Meetingraum (OG)</text>
        <text x="260" y="120">Nische Treppe</text>
        <text x="265" y="45">Telefonbox</text>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;

