import React from 'react';
import styled from 'styled-components';

const ElementStyle = styled.div`
  > div {
    text-align: right;
    position: relative;
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
  }
  input[type=range]::-webkit-slider-runnable-track {
    background: #0d6efd;
    height: 5px;
    padding-top: -5px;
    border-radius: 5px;
  }
  input[type=range]::-webkit-slider-thumb {
    margin-top: -5px;
  }

  output {
    position: absolute;
    top: 18px;
    right: 0;
  }
`;

const MIN = 8; // Starting at 08:00
const MAX = 20; // Ending at 20:00

function Times(props) {
  const startValue = props.timeInterval[0];
  const endValue = props.timeInterval[1];

  const onStartChange = (val) => {
    props.setTimeOnChange([parseFloat(val), endValue]);
  };
  
  const onEndChange = (val) => {
    props.setTimeOnChange([startValue, parseFloat(val)]);
  };

  function getHhMm(val) {
    const hours = Math.floor(val);
    const minutes = (val - hours) === 0.5 ? '30' : '00';
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  return (
    <ElementStyle>
      <div>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={0.5}
          onChange={(e) => onStartChange(e.target.value)}
          value={startValue}
        />
        <output>{getHhMm(startValue)}</output>
      </div>
      <div>
        <input
          type="range"
          min={MIN}
          max={MAX}
          step={0.5}
          onChange={(e) => onEndChange(e.target.value)}
          value={endValue}
        />
        <output>{getHhMm(endValue)}</output>
      </div>
    </ElementStyle>
  );
}

export default Times;
