import React from 'react';

function SVGPlanSeminar(props) {
  return (
    <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 300 125" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -14.7)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          
          {/* Pillar 1 in Room 1 (slightly moved to the right) */}
          <rect x="120" y="80" width="20" height="30" fill="brown" />
          
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="134" width="20" height="5" fill="brown" />
          
          {/* Side door at Room 1 */}
          <rect x="177" y="70" width="5" height="20" fill="brown" /> {/* Adjusted y position */}
          
          {/* Corridor coming out of the right door */}
          <rect x="182" y="70" width="60" height="20" stroke="#000" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Connecting passage space (turns up) */}
          <rect x="242" y="40" width="40" height="60" stroke="#000" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Staircase 1 along the corridor */}
          <line x1="192" y1="75" x2="202" y2="75" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          <line x1="194" y1="80" x2="204" y2="80" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Staircase 2 along the corridor */}
          <line x1="192" y1="85" x2="202" y2="85" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          <line x1="194" y1="90" x2="204" y2="90" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
        </g>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;



