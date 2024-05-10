function SVGPlan(props) {
  return (
    <svg width={props.width} height={props.height} version="1.1" viewBox="0 0 175 125" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(70.8 -14.7)">
        <g fill="none" stroke="#000">
          {/* Room Outline */}
          <rect x="-68.8" y="16.7" width="170" height="120" stroke="#000" strokeWidth="2" />
          {/* Pillar 1 (Moved slightly to the right) */}
          <rect x="-18.8" y="90" width="10" height="10" fill="#000" />
          {/* Pillar 2 (Moved significantly to the right) */}
          <rect x="48.8" y="90" width="10" height="10" fill="#000" />
        </g>
      </g>
    </svg>
  );
}

export default SVGPlan;
