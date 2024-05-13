
import { useD3 } from '../use/useD3';
import SvgPlan from './SvgPlan';
import SVGPlanUpstairs from './SvgPlanUpstairs';
import SeatsAndTablesClass from './SeatsAndTablesClass';
import Popup from './Popup';
import axios from '../api/axios';
import React, { useState, useContext}  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/AuthProvider';
import Form from 'react-bootstrap/Form';
import BModal from 'react-bootstrap/Modal';
import styled from 'styled-components';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const DIAGRAM_URL = SERVER_URL + 'api/seats';
const SVG_WIDTH = "175mm";
const SVG_HEIGHT = "125mm";

const ElementStyle = styled.div`  
  {
    margin: 5px 10px;
    position: relative;
  }

  button, label, input[type='text'] {
    font-size: 12px;
  }

  .wrapper-mngr-diagram, .wrapper-btn-save{
    display: flex;
    justify-content: normal;
    gap: 5px;
    align-items: flex-start;

    button{
      margin: 4px;
    }
  }

  .wrapper-mngr-diagram{
    text-align: left;
    margin: 5px 0;
  }

  .wrapper-btn-save{
    button{
      margin-top: 15px;
    }
  }

  .wrapper-svg{
    position: relative;

    svg {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

function Diagram({ apiUrl = DIAGRAM_URL, setSelSeat, svgType, data, setData }) {
  const { token } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(null);
  let chairsMng = null;

  const ref = useD3((svg) => {
    if (!data) {
      loadData(svg);
    } else {
      renderData(svg, data);
    }
  }, [data]);

  const divStyle = {
    width: SVG_WIDTH,
    height: SVG_HEIGHT,
  };

  async function loadData(svg) {
    try {
      const response = await axios.get(apiUrl, { withCredentials: true });
      setData(response.data, svgType);  // Update state in the parent component
    } catch (err) {
      console.error("ERROR loadData", err);
    }
  }

  function renderData(svg, data) {
    if (!chairsMng) {
      chairsMng = new SeatsAndTablesClass(svg, data, token.role, setSelSeat);
    }
  }

  const save = async () => {
    try {
      const params = { seats: chairsMng.seatData, tables: chairsMng.tableData };
      const response = await axios.post(apiUrl, params, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setShowAlert('Row has been successfully saved!');
      setTimeout(() => { setShowAlert(null); }, 2500);
    } catch (err) {
      console.error("ERROR save diagram", err);
    }
  }

  return (
    <ElementStyle>
      {token.role === 'admin' && <div className='wrapper-mngr-diagram'>
        <Button className='save' onClick={() => chairsMng.addSeat()}>Add a chair <FontAwesomeIcon icon={faSave} /></Button>
        <Button className='save' onClick={() => chairsMng.addTable()}>Add a table <FontAwesomeIcon icon={faSave} /></Button>
        <div className="form-group">
          <Form.Label htmlFor="table-width">Width:</Form.Label>
          <Form.Control type="input" id="table-width"/>
        </div>
        <div className="form-group">
          <Form.Label htmlFor="table-height">Height:</Form.Label>
          <Form.Control type="input" id="table-height"/>
        </div>
      </div>}
      <div className="wrapper-svg" style={divStyle}>
        <SvgPlan width={SVG_WIDTH} height={SVG_HEIGHT} />
        <svg ref={ref} id="svg_draw" width={SVG_WIDTH} height={SVG_HEIGHT} version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
      {token.role === 'admin' && <div className='wrapper-btn-save'>
        <BModal show={!!showAlert} size='sm' centered backdrop="static">
          <BModal.Body>{showAlert}</BModal.Body>
          <BModal.Footer>
            <Button variant="secondary" onClick={() => setShowAlert(null)}>Close</Button>
          </BModal.Footer>
        </BModal>
        <Button className='save' onClick={save}>Save <FontAwesomeIcon icon={faSave} /></Button>
      </div>}
      <Popup />
    </ElementStyle>
  );
}

export default Diagram;
