import React from 'react';

function SVGPlanUpstairs(props) {
  // Set default width and height if not provided
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#000">
        {/* Room 1 Outline */}
        <rect x="0" y="0." width="320" height="150" stroke="#000" strokeWidth="2" />
        
        {/* Door at the bottom of Room 1 */}
        <rect x="125" y="134" width="15" height="3" fill="brown" />
        {/* Side door at Room 1 */}
        <rect x="250" y="80" width="3" height="15" fill="brown" />

        {/* New line from half way across x from the right side and a quarter way down y */}
        <line x1="150" y1="50" x2="150" y2="320" stroke="black" strokeWidth="2" />
        {/* New line from half way across x from the right side and a quarter way down y */}
        <line x1="150" y1="50" x2="250" y2="50" stroke="black" strokeWidth="2" />
        {/* New line from half way across x from the right side and a quarter way down y */}
        <line x1="250" y1="0" x2="250" y2="150" stroke="black" strokeWidth="2" />
        <line x1="200" y1="50" x2="200" y2="150" stroke="black" strokeWidth="2" />
        <line x1="150" y1="75" x2="100" y2="150" stroke="black" strokeWidth="2" />
        <line x1="100" y1="0" x2="100" y2="150" stroke="black" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;


