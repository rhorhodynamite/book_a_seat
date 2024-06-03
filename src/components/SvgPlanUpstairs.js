import React from 'react';

function SVGPlanUpstairs(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';

  return (
    <svg width={width} height={height} viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.5" />
        </filter>
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#e0e0e0', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#bdbdbd', stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#8B4513', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#A0522D', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke="#000" strokeWidth="2" filter="url(#shadow)">
        {/* Room 4 */}
        <polygon points="0,200 0,100 100,50 100,200" fill="url(#roomGradient)" rx="10" ry="10" />
        <rect x="100" y="100" width="6" height="20" fill="url(#doorGradient)" rx="1" ry="1" />

        {/* Room 1 */}
        <rect x="106" y="50" width="200" height="150" fill="url(#roomGradient)" rx="10" ry="10" />
        <rect x="306" y="120" width="6" height="20" fill="url(#doorGradient)" rx="1" ry="1" />

        {/* Room 2 */}
        <rect x="312" y="50" width="200" height="150" fill="url(#roomGradient)" rx="10" ry="10" />
        <rect x="512" y="120" width="6" height="20" fill="url(#doorGradient)" rx="1" ry="1" />

        {/* Room 3 */}
        <rect x="518" y="0" width="200" height="200" fill="url(#roomGradient)" rx="10" ry="10" />
        <rect x="100" y="25" width="6" height="20" fill="url(#doorGradient)" rx="1" ry="1" />

        {/* Corridor */}
        <rect x="518" y="0" width="20" height="50" fill="none" stroke="#000" rx="5" ry="5" />
        <rect x="100" y="0" width="412" height="50" fill="none" stroke="#000" rx="5" ry="5" />
      </g>

       {/* Adding text labels for rooms */}
      <text x="5" y="225" fontFamily="Verdana" fontSize="10" fill="black">Camp 1</text>
      <text x="180" y="225" fontFamily="Verdana" fontSize="10" fill="black">Camp 2</text>
      <text x="380" y="225" fontFamily="Verdana" fontSize="10" fill="black">Camp 3</text>
      <text x="590" y="225" fontFamily="Verdana" fontSize="10" fill="black">Camp 4</text>

      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;




