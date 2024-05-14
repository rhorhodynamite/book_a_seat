import React from 'react';

function SVGPlanUpstairs(props) {
  // Set default width and height if not provided
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#000">
        {/* Room 1 */}
        <rect x="0" y="0" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door at the bottom of Room 1 */}
        <rect x="90" y="150" width="20" height="6" fill="brown" />

        {/* Room 2 */}
        <rect x="200" y="0" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 1 and Room 2 */}
        <rect x="200" y="70" width="6" height="20" fill="brown" />
        {/* Door at the bottom of Room 2 */}
        <rect x="290" y="150" width="20" height="6" fill="brown" />

        {/* Room 3 */}
        <rect x="400" y="0" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 2 and Room 3 */}
        <rect x="400" y="70" width="6" height="20" fill="brown" />
        {/* Door at the bottom of Room 3 */}
        <rect x="490" y="150" width="20" height="6" fill="brown" />

        {/* Corridor connecting Room 1, Room 2, and Room 3 */}
        <rect x="0" y="150" width="600" height="50" stroke="#000" strokeWidth="2" />
        
        {/* Room 4 (smaller, diagonal room) */}
        <polygon points="500,150 550,200 600,150 600,300 500,300" stroke="#000" strokeWidth="2" fill="none" />
        {/* Door to Room 4 from Room 3 */}
        <rect x="550" y="150" width="6" height="20" fill="brown" />
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;



