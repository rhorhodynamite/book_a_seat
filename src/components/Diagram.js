
import React, { useContext, useState } from 'react';
import axios from '../api/axios';
import { useD3 } from '../use/useD3';
import SeatsAndTablesClass from './SeatsAndTablesClass';
import SvgPlan from './SvgPlan';
import Popup from './Popup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import BModal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SVG_WIDTH = "175mm";
const SVG_HEIGHT = "125mm";

const ElementStyle = styled.div`
  margin: 5px 10px;
  position: relative;

  button, label, input[type='text'] {
    font-size: 12px;
  }

  .wrapper-mngr-diagram, .wrapper-btn-save {
    display: flex;
    justify-content: normal;
    gap: 5px;
    align-items: flex-start;

    button {
      margin: 4px;
    }
  }

  .wrapper-btn-save button {
    margin-top: 15px;
  }

  .wrapper-svg {
    position: relative;

    svg {
      position: absolute;
      left: 0;
      top: 0;
    }
  }
`;

function Diagram(props) {
  const { token } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(null);
  const ref = useD3((svg) => {
    loadData(svg);
  }, []);

  let chairsMng = null;
  const DIAGRAM_URL = props.apiUrl || `${SERVER_URL}api/seats`;

  async function loadData(svg) {
    try {
      const response = await axios.get(DIAGRAM_URL, { withCredentials: true });
      if (!chairsMng) {
        chairsMng = new SeatsAndTablesClass(svg, response.data, token.role, props.setSelSeat);
      }
    } catch (err) {
      console.error("ERROR loadData", err);
    }
  }

  async function save() {
    try {
      const params = { seats: chairsMng.seatData, tables: chairsMng.tableData };
      const response = await axios.post(DIAGRAM_URL, params, {
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
      {token.role === 'admin' && (
        <div className='wrapper-mngr-diagram'>
          <Button className='save' onClick={() => chairsMng.addSeat()}>Add a chair <FontAwesomeIcon icon={faSave}/></Button>
          <Button className='save' onClick={() => chairsMng.addTable()}>Add a table <FontAwesomeIcon icon={faSave}/></Button>
          <div className="form-group">
            <Form.Label htmlFor="table-width">Width:</Form.Label>
            <Form.Control type="input" id="table-width" />
            <Form.Label htmlFor="table-height">Height:</Form.Label>
            <Form.Control type="input" id="table-height" />
          </div>
        </div>
      )}
      <div className="wrapper-svg">
        <SvgPlan width={SVG_WIDTH} height={SVG_HEIGHT} />
        <svg ref={ref} id="svg_draw" width={SVG_WIDTH} height={SVG_HEIGHT} xmlns="http://www.w3.org/2000/svg" />
      </div>
      {token.role === 'admin' && (
        <div className='wrapper-btn-save'>
          <BModal show={showAlert} size='sm' centered backdrop="static">
            <BModal.Body>{showAlert}</BModal.Body>
            <BModal.Footer>
              <Button variant="secondary" onClick={() => setShowAlert(null)}>Close</Button>
            </BModal.Footer>
          </BModal>
          <Button className='save' onClick={save}>Save <FontAwesomeIcon icon={faSave}/></Button>
        </div>
      )}
      <Popup />
    </ElementStyle>
  );
}

export default Diagram;
