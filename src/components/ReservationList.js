import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from './Modal.js';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import moment from 'moment';
import axios from '../api/axios';
import utils from '../api/utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GET_URL = SERVER_URL + 'api/my_reservations';
const CONTENT_WIDTH = 650;

const ElementStyle = styled.div`
  .alert{
    position: absolute;
    top: 10px;
    right: 20px;
  }

  .div_date_list{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background-color: #f8f9fa;

    p{
      background-color: #007bff;
      color: white;
      margin: 0;
      padding: 12px;
      font-weight: bold;
      text-align: center;
    }

    .wrapper-scroll {
      background-color: #ffffff;
      overflow-y: auto;
      max-height: 300px;
      padding: 16px;
    }
  }

  .table {
    margin: 0;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 8px;

    th, td {
      padding: 12px;
      background: #ffffff;
      border: none;
    }

    th {
      background: #f1f3f5;
      font-weight: 600;
    }

    td {
      border-radius: 4px;
      transition: background 0.3s;
    }

    tr:hover td {
      background: #f1f3f5;
      cursor: pointer;
    }

    .sel-tr {
      background-color: #e9ecef;
    }
  }

  .btn {
    padding: 4px 8px;
    margin: 0 2px;
    border-radius: 4px;
    transition: background 0.3s;
    &:hover {
      background-color: #e2e6ea;
    }
  }

  .wrapper-plus {
    background-color: #007bff;
    text-align: right;
    padding: 8px;
    border-top: 1px solid #dee2e6;

    button {
      background-color: #28a745;
      border: none;
      color: white;
      padding: 8px 16px;
      margin: 8px;
      border-radius: 4px;
      transition: background 0.3s;
      &:hover {
        background-color: #218838;
      }
    }
  }
`;

function ReservationList(props) {
  const [isCalendarActive, setCalendarActive] = useState(false);
  const [selRow, setSelRow] = useState(null);
  const [childKey, setChildKey] = useState(0);
  const [idToDel, setIdToDel] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [showAlert2, setShowAlert2] = useState(null);
  const { token } = useContext(AuthContext);

  const [reservationData, setReservation] = useState([]);

  const currentDate = moment(new Date()).startOf('hour').add(1, 'hours').toDate();

  useEffect(() => {
    if (props.selSeat) loadData(props.selSeat);
  }, [props.selSeat]);

  function loadData(selSeat) {
    const params = { selSeat: selSeat };
    const callback = function (r) {
      const rslt = r.map((val) => {
        val.startDate = new Date(val.startDate);
        val.endDate = new Date(val.endDate);
        val.name = `Id${val.id}`;
        return val;
      });
      setReservation(rslt);
    };
    utils.getReservationDb(params, callback);
  }

  function onClickRow(_id) {
    setChildKey(_id);
    setCalendarActive(false);
    setSelRow(reservationData.find(item => item.id === _id));
  }

  function editRow(evt, _id) {
    evt.stopPropagation();
    setChildKey(_id);
    setCalendarActive(true);
    setSelRow(reservationData.find(item => item.id === _id));
  }

  function delRow(evt, _id, _startDate) {
    evt.stopPropagation();
    if (_startDate < currentDate) {
      setShowAlert2('Not possible to delete a booking that has already started');
    } else {
      setIdToDel(_id);
    }
  }

  function addRow() {
    const tomorrowAfternoon = moment(new Date()).startOf('date').add(42, 'hours').toDate();
    const newRow = { id: null, seatId: props.selSeat, user: token.user, startDate: currentDate, endDate: tomorrowAfternoon };
    setChildKey(null);
    setCalendarActive(true);
    setSelRow(newRow);
  }

  function checkIfDisabled(item) {
    return item.username !== token.user || item.endDate < currentDate;
  }

  const handleClose = () => setIdToDel(false);
  const handleDel = () => {
    const callback = () => {
      refresh(utils.MSG.del);
      setIdToDel(null);
    };

    setChildKey(null);
    setReservation(reservationData.filter(item => item.id !== idToDel));
    utils.delReservationDb(idToDel, callback);
  };

  function refresh(msg) {
    loadData(props.selSeat);
    setCalendarActive(false);
    setSelRow(null);
    setShowAlert(msg);
    setTimeout(() => { setShowAlert(null); }, 2500);
  }

  function check(dateInterval, id) {
    const errorData = reservationData.filter(item => {
      return (item.id !== id && (
        (dateInterval[0] > item.startDate && dateInterval[0] < item.endDate) ||
        (dateInterval[1] > item.startDate && dateInterval[1] < item.endDate) ||
        (dateInterval[0] <= item.startDate && dateInterval[1] >= item.endDate)
      ));
    });
    if (errorData.length === 0) return null;
    return (
      <div>
        {errorData.map((item, key) => (
          <p key={key}>
            ERROR: not possible to save selected reservation ({dateInterval[0].toLocaleDateString()} - {dateInterval[1].toLocaleDateString()})
            overlaps the existing one with {item.id ? `(id ${item.id})` : ""} ({item.startDate.toLocaleDateString()} - {item.endDate.toLocaleDateString()})
          </p>
        ))}
      </div>
    );
  }

  const tableContent = reservationData.map((val, key) => {
    const mStartDate = moment(val.startDate);
    const mEndDate = moment(val.endDate);
    const isDisabled = checkIfDisabled(val);
    return (
      <tr key={key} title="Show reservation" onClick={() => onClickRow(val.id)} className={selRow?.id === val.id ? 'sel-tr' : ''}>
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td>
          <span>from {mStartDate.format('DD.MM.yyyy (HH:mm)')}</span>
          <span> to {mEndDate.format('DD.MM.yyyy (HH:mm)')}</span>
        </td>
        <td>
          {isDisabled ? (
            <FontAwesomeIcon className="fa-disabled" icon={faPen} />
          ) : (
            <button className="btn" title="Edit booking" onClick={(evt) => editRow(evt, val.id)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
          )}
        </td>
        <td>
          {isDisabled ? (
            <FontAwesomeIcon className="fa-disabled" icon={faTrash} />
          ) : (
            <button className="btn" title="Delete booking" onClick={(evt) => delRow(evt, val.id, val.startDate)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          )}
        </td>
      </tr>
    );
  });

  return (
    <ElementStyle>
      <Alert show={showAlert ? true : false} msg={showAlert} variant="success" setShow={setShowAlert} />
      <Alert show={showAlert2 ? true : false} msg={showAlert2} variant="danger" setShow={setShowAlert2} />
      <Modal idToDel={idToDel} handleClose={handleClose} handleDel={handleDel} />
      <div className="div_date_list">
        <p>Reservation for desk {props.selSeat}</p>
        <div className="wrapper-scroll">
          {reservationData.length > 0 ? (
            <Table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Time Period</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{tableContent}</tbody>
            </Table>
          ) : (
            <h2>No bookings yet!</h2>
          )}
        </div>
        {props.selSeat && token.role === 'user' && (
          <div className="wrapper-plus">
            <Button className="plus" type="button" onClick={addRow}>
              Add <FontAwesomeIcon icon={faPlus} />
            </Button>
          </div>
        )}
      </div>
      {selRow && (
        <CalendarContainer
          isCalendarActive={isCalendarActive}
          setSelRow={setSelRow}
          selSeat={selRow}
          user={token.user}
          key={childKey}
          refreshFn={refresh}
          msg={utils.MSG}
          check={check}
          currentDate={currentDate}
        />
      )}
    </ElementStyle>
  );
}

export default ReservationList;

