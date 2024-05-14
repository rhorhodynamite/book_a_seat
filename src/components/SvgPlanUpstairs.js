import React from 'react';

function SVGPlanUpstairs(props) {
  // Set default width and height if not provided
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 640 300" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" stroke="#000">
        {/* Room 1 */}
        <rect x="0" y="50" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 1 and Room 2 */}
        <rect x="200" y="120" width="6" height="20" fill="brown" />

        {/* Room 2 */}
        <rect x="206" y="50" width="200" height="150" stroke="#000" strokeWidth="2" />
        {/* Door between Room 2 and Room 3 */}
        <rect x="406" y="120" width="6" height="20" fill="brown" />

        {/* Room 3 (taller) */}
        <rect x="412" y="50" width="200" height="200" stroke="#000" strokeWidth="2" />
        {/* Door to Corridor */}
        <rect x="490" y="50" width="20" height="6" fill="brown" />

        {/* Corridor connecting Room 3 to Rooms 1 and 2 */}
        <rect x="490" y="0" width="20" height="50" stroke="#000" strokeWidth="2" />
        <rect x="0" y="0" width="510" height="50" stroke="#000" strokeWidth="2" />
        
        {/* Room 4 (smaller, diagonal room accessible from Room 1) */}
        <polygon points="200,50 250,100 300,50 300,200 200,200" stroke="#000" strokeWidth="2" fill="none" />
        {/* Door to Room 4 from Room 1 */}
        <rect x="250" y="50" width="20" height="6" fill="brown" />
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;




