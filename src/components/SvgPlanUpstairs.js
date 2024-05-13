import React from 'react';

function SVGPlanUpstairs(props) {
  // Set default width and height if not provided
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#000">
        {/* Room 1 Outline */}
        <rect x="10" y="16.7" width="300" height="120" stroke="#000" strokeWidth="2" />
        
        {/* Door at the bottom of Room 1 */}
        <rect x="125" y="134" width="20" height="5" fill="brown" />
        {/* Side door at Room 1 */}
        <rect x="250" y="80" width="3" height="20" fill="brown" />

        {/* New line from half way across x from the right side and a quarter way down y */}
        <line x1="150" y1="37.5" x2="50" y2="320" stroke="black" strokeWidth="2" />
        {/* New line from half way across x from the right side and a quarter way down y */}
        <line x1="150" y1="0" x2="150" y2="150" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;


