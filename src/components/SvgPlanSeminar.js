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
      </defs>
      <g transform="translate(0 -14.7)" filter="url(#shadow)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" rx="10" ry="10" />
          
          {/* Pillar 1 in Room 1 */}
          <rect x="120" y="80" width="20" height="30" fill="brown" rx="3" ry="3" />
          
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="134" width="20" height="5" fill="brown" rx="1" ry="1" />
          
          {/* Side door at Room 1 */}
          <rect x="177" y="80" width="5" height="20" fill="brown" rx="1" ry="1" />
          
          {/* Corridor coming out of the right door */}
          <rect x="182" y="80" width="60" height="20" stroke="#000" strokeWidth="2" rx="5" ry="5" fill="lightgrey" />
          
          {/* Connecting passage space (turns up) */}
          <rect x="242" y="20" width="60" height="80" stroke="#000" strokeWidth="2" rx="10" ry="10" fill="lightgrey" />
          
          {/* Staircase 1 along the corridor */}
          <line x1="192" y1="65" x2="192" y2="75" stroke="black" strokeWidth="2" />
          <line x1="194" y1="70" x2="194" y2="80" stroke="black" strokeWidth="2" />
          
          {/* Staircase 2 along the corridor */}
          <line x1="232" y1="65" x2="232" y2="75" stroke="black" strokeWidth="2" />
          <line x1="234" y1="70" x2="234" y2="80" stroke="black" strokeWidth="2" />
        </g>
      </g>
      <g fontFamily="Arial" fontSize="12" fill="#000">
        <text x="85" y="75" textAnchor="middle">Room 1</text>
        <text x="270" y="60" textAnchor="middle">Passage</text>
        <text x="150" y="90" textAnchor="middle">Pillar</text>
        <text x="195" y="95" textAnchor="middle">Corridor</text>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;
