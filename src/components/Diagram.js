import moment from 'moment';
import { useD3 } from '../use/useD3';
import * as d3 from 'd3';
import SvgPlan from './SvgPlan';
import SeatsAndTablesClass from './SeatsAndTablesClass';
import Popup from './Popup';
import axios from '../api/axios';
import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/AuthProvider';
import Form from 'react-bootstrap/Form';
import BModal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import SVGPlanUpstairs from './SvgPlanUpstairs';
import SVGPlanSeminar from './SvgPlanSeminar';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const SVG_WIDTH = "300mm";
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

function Diagram({ apiUrl = `${SERVER_URL}api/seats`, setSelSeat = () => {}, svgType = "main", data, setData, bookings = [] }) {
  const { token } = useContext(AuthContext);
  const [internalData, setInternalData] = useState(null);
  const effectiveData = data || internalData;
  const [showAlert, setShowAlert] = useState(null);
  const chairsMng = useRef(null);
  const divStyle = { width: SVG_WIDTH, height: SVG_HEIGHT };
  const tableWidthRef = useRef(null);
  const tableHeightRef = useRef(null);
  const SvgComponent = svgType === "upstairs" 
    ? SVGPlanUpstairs 
    : svgType === "seminar" 
    ? SVGPlanSeminar 
    : SvgPlan;

  const renderData = useCallback((svg, dataToRender, bookings) => {
    if (chairsMng.current) {
      chairsMng.current.svg.selectAll("*").remove();
    }
    chairsMng.current = new SeatsAndTablesClass(
      svg,
      dataToRender,
      token.role,
      setSelSeat,
      bookings,
      tableWidthRef.current,
      tableHeightRef.current
    );
  }, [token.role, setSelSeat]);

  const ref = useD3((svg) => {
    if (!effectiveData) {
      loadData(svg);
    } else {
      renderData(svg, effectiveData, bookings);
    }
  }, [effectiveData, bookings, renderData]);

  useEffect(() => {
    if (chairsMng.current) {
      chairsMng.current.tableWidth = tableWidthRef.current;
      chairsMng.current.tableHeight = tableHeightRef.current;
    }
  }, [chairsMng]);

  useEffect(() => {
    if (effectiveData && bookings.length > 0) {
      const svg = d3.select(ref.current);
      renderData(svg, effectiveData, bookings);
    }
  }, [effectiveData, bookings, renderData, ref]);

  const loadData = useCallback(async (svg) => {
    if (!data) {
      try {
        const response = await axios.get(apiUrl, {
          params: { svgType },
          withCredentials: true,
        });
        const newData = response.data;
        setData ? setData(newData, svgType) : setInternalData(newData);
      } catch (err) {
        console.error("ERROR loadData", err);
      }
    }
  }, [apiUrl, data, setData, svgType]);

  useEffect(() => {
    if (!effectiveData) {
      const svg = d3.select(ref.current);
      loadData(svg);
    }
  }, [effectiveData, loadData, ref]);

  async function save() {
    try {
      const params = { seats: chairsMng.current.seatData, tables: chairsMng.current.tableData };
      await axios.post(apiUrl, params, {
        params: { svgType },
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setShowAlert('Row has been successfully saved!');
      setTimeout(() => setShowAlert(null), 2500);
    } catch (err) {
      console.error("ERROR save diagram", err);
    }
  }

  return (
    <ElementStyle>
      {token.role === 'admin' && (
        <div className='wrapper-mngr-diagram'>
          <Button className='save' onClick={() => chairsMng.current.addSeat()}>Add a chair <FontAwesomeIcon icon={faSave} /></Button>
          <Button className='save' onClick={() => chairsMng.current.addTable()}>Add a table <FontAwesomeIcon icon={faSave} /></Button>
          <div className="form-group">
            <Form.Label htmlFor="table-width">width:</Form.Label>
            <Form.Control type="input" id="table-width" ref={tableWidthRef}/>
          </div>
          <div className="form-group">
            <Form.Label htmlFor="table-height">height:</Form.Label>
            <Form.Control type="input" id="table-height" ref={tableHeightRef}/>
          </div>
        </div>
      )}
      <div className="wrapper-svg" style={divStyle}>
        <SvgComponent width={SVG_WIDTH} height={SVG_HEIGHT} />
        <svg ref={ref} id="svg_draw" width={SVG_WIDTH} height={SVG_HEIGHT} version="1.1" xmlns="http://www.w3.org/2000/svg" />
      </div>
      {token.role === 'admin' && (
        <div className='wrapper-btn-save'>
          <BModal show={!!showAlert} size='sm' centered backdrop="static">
            <BModal.Body>{showAlert}</BModal.Body>
            <BModal.Footer>
              <Button variant="secondary" onClick={() => setShowAlert(null)}>Close</Button>
            </BModal.Footer>
          </BModal>
          <Button className='save' onClick={save}>Save <FontAwesomeIcon icon={faSave} /></Button>
        </div>
      )}
      <Popup />
    </ElementStyle>
  );
}

export default Diagram;

