import React from 'react';

function SVGPlanUpstairs(props) {
  // Set default width and height if not provided
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#000">
        {/* Room 4 (smaller, diagonal room on the very left) */}
        <polygon points="0,0 0,100 100,50 100,200" stroke="#000" strokeWidth="2" fill="none" />
        {/* Door to Room 4 from the corridor */}
        <rect x="50" y="50" width="20" height="6" fill="brown" />

        {/* Room 1 */}
        <rect x="106" y="50" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 1 and Room 2 */}
        <rect x="306" y="120" width="6" height="20" fill="brown" />

        {/* Room 2 */}
        <rect x="312" y="50" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 2 and Room 3 */}
        <rect x="512" y="120" width="6" height="20" fill="brown" />

        {/* Room 3 (taller) */}
        <rect x="518" y="0" width="200" height="200" stroke="#000" strokeWidth="2" />
        {/* Door to Corridor */}
        <rect x="100" y="25" width="6" height="20" fill="brown" />

        {/* Corridor starting from the taller room */}
        <rect x="518" y="0" width="20" height="50" stroke="#000" strokeWidth="2" />
        <rect x="100" y="0" width="412" height="50" stroke="#000" strokeWidth="2" />
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;





