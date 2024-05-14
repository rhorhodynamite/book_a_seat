import React from 'react';

function SVGPlanUpstairs(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="roomGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#ffeb3b', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#fbc02d', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="roomGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8bc34a', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#689f38', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="roomGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#03a9f4', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#0288d1', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="roomGradient4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e91e63', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#c2185b', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#000" strokeWidth="2">
        {/* Room 4 */}
        <polygon points="0,200 0,100 100,50 100,200" fill="url(#roomGradient4)" />
        <rect x="100" y="100" width="6" height="20" fill="brown" />

        {/* Room 1 */}
        <rect x="106" y="50" width="200" height="150" fill="url(#roomGradient1)" />
        <rect x="306" y="120" width="6" height="20" fill="brown" />

        {/* Room 2 */}
        <rect x="312" y="50" width="200" height="150" fill="url(#roomGradient2)" />
        <rect x="512" y="120" width="6" height="20" fill="brown" />

        {/* Room 3 */}
        <rect x="518" y="0" width="200" height="200" fill="url(#roomGradient3)" />
        <rect x="100" y="25" width="6" height="20" fill="brown" />

        {/* Corridor */}
        <rect x="518" y="0" width="20" height="50" fill="none" stroke="#000" />
        <rect x="100" y="0" width="412" height="50" fill="none" stroke="#000" />
      </g>
      <g fontFamily="Arial" fontSize="14" fill="#000">
        <text x="50" y="150" textAnchor="middle">Room 4</text>
        <text x="206" y="125" textAnchor="middle">Room 1</text>
        <text x="412" y="125" textAnchor="middle">Room 2</text>
        <text x="618" y="100" textAnchor="middle">Room 3</text>
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;






