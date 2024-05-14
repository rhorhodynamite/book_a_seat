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
          <rect x="177" y="80" width="5" height="20" fill="brown" /> {/* Adjusted y position */}
          
          {/* Corridor coming out of the right door */}
          <rect x="182" y="80" width="60" height="20" stroke="#000" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Connecting passage space (turns up) */}
          <rect x="242" y="20" width="60" height="80" stroke="#000" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Staircase 1 along the corridor */}
          <line x1="192" y1="65" x2="192" y2="75" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          <line x1="194" y1="70" x2="194" y2="80" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          
          {/* Staircase 2 along the corridor */}
          <line x1="232" y1="65" x2="232" y2="75" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
          <line x1="234" y1="70" x2="234" y2="80" stroke="black" strokeWidth="2" /> {/* Adjusted y position */}
        </g>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;



