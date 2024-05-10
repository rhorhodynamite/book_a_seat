function SVGPlan(props) {
  return (
    <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 350 250" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -14.7)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          {/* Pillar 1 in Room 1 (slightly moved to the right) */}
          <rect x="30" y="90" width="10" height="10" fill="#000" />
          {/* Pillar 2 in Room 1 (significantly moved to the right) */}
          <rect x="120" y="90" width="10" height="10" fill="#000" />

          {/* Room 2 Outline */}
          <rect x="180" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          {/* Large Rectangle in Room 2 (positioned in the bottom right half) */}
          <rect x="260" y="90" width="80" height="40" fill="#000" />
        </g>
      </g>
    </svg>
  );
}

export default SVGPlan;
