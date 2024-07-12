import React from 'react';

function SVGPlanUpstairs(props) {
  const width = props.width || '100%';
  const height = props.height || '100%';
  
  return (
    <svg width={width} height={height} viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.2" />
        </filter>
        <linearGradient id="roomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f5" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient id="corridorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eeeeee" />
          <stop offset="100%" stopColor="#d5d5d5" />
        </linearGradient>
      </defs>
      
      <g filter="url(#shadow)">
        {/* Room 4 */}
        <polygon points="0,200 0,100 100,50 100,200" fill="url(#roomGradient)" stroke="#ccc" strokeWidth="0.5">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </polygon>
        
        {/* Room 1 */}
        <rect x="106" y="50" width="200" height="150" fill="url(#roomGradient)" stroke="#ccc" strokeWidth="0.5" rx="10" ry="10">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Room 2 */}
        <rect x="312" y="50" width="200" height="150" fill="url(#roomGradient)" stroke="#ccc" strokeWidth="0.5" rx="10" ry="10">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Room 3 */}
        <rect x="518" y="0" width="200" height="200" fill="url(#roomGradient)" stroke="#ccc" strokeWidth="0.5" rx="10" ry="10">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </rect>
        
        {/* Corridor */}
        <rect x="518" y="0" width="20" height="50" fill="url(#corridorGradient)" stroke="#ccc" strokeWidth="0.5" rx="5" ry="5" />
        <rect x="100" y="0" width="412" height="50" fill="url(#corridorGradient)" stroke="#ccc" strokeWidth="0.5" rx="5" ry="5" />
        
        {/* Doors */}
        <rect x="100" y="100" width="6" height="20" fill="#90A4AE" rx="1" ry="1" />
        <rect x="306" y="120" width="6" height="20" fill="#90A4AE" rx="1" ry="1" />
        <rect x="512" y="120" width="6" height="20" fill="#90A4AE" rx="1" ry="1" />
        <rect x="100" y="25" width="6" height="20" fill="#90A4AE" rx="1" ry="1" />
      </g>
      
      {/* Text labels */}
      <g fontFamily="Arial, sans-serif" fontSize="12" fill="#424242">
        <text x="5" y="225">Camp 1</text>
        <text x="180" y="225">Camp 2</text>
        <text x="380" y="225">Camp 3</text>
        <text x="590" y="225">Camp 4</text>
      </g>
    </svg>
  );
}

export default SVGPlanUpstairs;


