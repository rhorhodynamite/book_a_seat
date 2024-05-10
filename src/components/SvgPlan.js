function SVGPlan(props) {
  return (
    <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 180 125" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(0 -14.7)">
        <g fill="none" stroke="#000">
          {/* Room 1 Outline */}
          <rect x="10" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          {/* Pillar 1 in Room 1 (slightly moved to the right) */}
          <rect x="50" y="100" width="10" height="10" fill="#000" />
          {/* Pillar 2 in Room 1 (significantly moved to the right) */}
          <rect x="150" y="100" width="10" height="10" fill="#000" />
          {/* Door at the bottom of Room 1 */}
          <rect x="125" y="130" width="20" height="5" fill="#000" />
          {/* Door at the bottom of Room 1 */}
          <rect x="179" y="60" width="5" height="20" fill="#000" />
          
        </g>
      </g>
    </svg>
  );
}

export default SVGPlan;

