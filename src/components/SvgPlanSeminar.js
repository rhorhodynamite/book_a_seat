
import React from 'react';

function SVGPlanSeminar(props) {
  return (
    <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 180 125" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -14.7)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          {/* Pillar 1 in Room 1 (slightly moved to the right) */}
          <rect x="120" y="80" width="20" height="30" fill="brown" />
          
          {/* Plants below Pillar 2 */}
          <rect x="153" y="113" width="5" height="4" fill="green" />
          <rect x="152" y="122" width="6" height="4" fill="green" />
          <rect x="154" y="129" width="4" height="3" fill="green" />
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="134" width="20" height="5" fill="brown" />
          {/* Side door at Room 1 */}
          <rect x="177" y="60" width="5" height="20" fill="brown" />
        </g>
      </g>
    </svg>
  );
}

export default SVGPlanSeminar;