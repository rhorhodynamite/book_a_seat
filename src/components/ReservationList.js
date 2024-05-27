import React, { useState, useEffect, useContext } from 'react';
import Table from 'react-bootstrap/Table';
import Modal from './Modal';
import BModal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import moment from 'moment';
import axios from '../api/axios';
import utils from '../api/utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';
import CalendarContainer from './CalendarContainer';
import Alert from './Alert';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GET_URL = SERVER_URL + 'api/my_reservations';
const CONTENT_WIDTH = 650;

const ElementStyle = styled.div`
  // your styles here
`;

const currentDate = moment(new Date()).startOf('day').toDate();

function ReservationList(props) {
  const [isCalendarActive, setCalendarActive] = useState(false);
  const [selRow, setSelRow] = useState(null);
  const [childKey, setChildKey] = useState(0);
  const [idToDel, setIdToDel] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [showAlert2, setShowAlert2] = useState(null);
  const { token } = useContext(AuthContext);

  const [reservationData, setReservation] = useState([]);

  useEffect(() => {
    if (props.selSeat) loadData(props.selSeat);
  }, [props.selSeat]);

   useEffect(() => {
    // Update booked seats for today whenever reservationData changes
    const bookedSeats = getBookedSeatsForToday();
    props.setBookedSeatsForToday(bookedSeats);
  }, [reservationData]);

  function loadData(selSeat) {
    console.log('loadData reservation list', selSeat);
    const params = {
      selSeat: selSeat,
    };
    const callback = function (r) {
      const rslt = r.map((val, key) => {
        if (typeof val.startdate === 'string') {
          val.startDate = new Date(val.startdate);
        }
        if (typeof val.enddate === 'string') {
          val.endDate = new Date(val.enddate);
        }
        val.name = val.seatName;
        return val;
      });
      setReservation(rslt);
    };
    utils.getReservationDb(params, callback);
  }

    function getBookedSeatsForToday() {
    const today = moment().startOf('day');
    return reservationData.filter(reservation => {
      const startDate = moment(reservation.startDate);
      const endDate = moment(reservation.endDate);
      return today.isBetween(startDate, endDate, null, '[]');
    }).map(reservation => reservation.seatId);
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
      setShowAlert2('Not possible to delete a booking, which has already started');
    } else {
      setIdToDel(_id);
    }
  }

  function addRow() {
    const tomorrowAfternoon = moment(new Date()).startOf('date').add(42, 'hours').toDate();
    const newRow = {
      id: null, seatId: props.selSeat, user: token.user,
      startDate: currentDate, endDate: tomorrowAfternoon
    };
    setChildKey(null);
    setCalendarActive(true);
    setSelRow(newRow);
  }

  function checkIfDisabled(item) {
    let isDisabled = false;
    if (item.username !== token.user || item.endDate < currentDate) {
      isDisabled = true;
    }
    return isDisabled;
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
    const errorData = reservationData.filter(
      function (item) {
        return (item.id !== id && ((dateInterval[0] > item.startDate && dateInterval[0] < item.endDate)  // start inside existing dates
          || (dateInterval[1] > item.startDate && dateInterval[1] < item.endDate) // end inside existing dates
          || (dateInterval[0] <= item.startDate && dateInterval[1] >= item.endDate)));
      });
    if (errorData.length === 0)
      return null;
    const htmlData = errorData.map((item, key) => {
      const id = item.id ? "(id " + item.id + ")" : "";
      const errorMsg1 = `ERROR: not possible to save selected reservation (${dateInterval[0].toLocaleDateString()} - ${dateInterval[1].toLocaleDateString()})`;
      const errorMsg2 = `overlaps the existing one with ${id} (${item.startDate.toLocaleDateString()} - ${item.endDate.toLocaleDateString()})`;
      return (<p key={key}>{errorMsg1}<br />{errorMsg2}</p>);
    });
    return <div>{htmlData}</div>;
  }

  const tableContent = reservationData.map((val, key) => {
    const mStartDate = moment(val.startDate);
    const mEndDate = moment(val.endDate);
    const isDisabled = checkIfDisabled(val);
    return (
      <tr key={key} title="show reservation" onClick={() => onClickRow(val.id)} {...((selRow?.id === val.id) ? { className: 'sel-tr' } : {})} >
        <td>{val.name}</td>
        <td>{val.username}</td>
        <td><span>from</span>
          <span>
            &nbsp;{mStartDate.format('DD.MM.yyyy')}&nbsp;
            ({mStartDate.format('HH:mm')})
          </span>
          <span>&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;&nbsp;</span>
          <span>
            &nbsp;{mEndDate.format('DD.MM.yyyy')}&nbsp;
            ({mEndDate.format('HH:mm')})
          </span></td>
        {isDisabled ?
          <td title="Edit booking not possible" ><FontAwesomeIcon className="fa-disabled" icon={faPen} /></td>
          :
          <td onClick={(evt) => { editRow(evt, val.id); }}>
            <button className="btn" title="Edit booking" >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </td>
        }
        {isDisabled ?
          <td><FontAwesomeIcon className="fa-disabled" icon={faTrash} /></td>
          :
          <td onClick={(evt) => { delRow(evt, val.id, val.startDate) }}>
            <button className="btn" title="Delete booking"  >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </td>
        }
      </tr>
    );
  });

  return (
    <ElementStyle>
      <Alert show={showAlert ? true : false} msg={showAlert} variant="success" setShow={setShowAlert} />
      <Alert show={showAlert2 ? true : false} msg={showAlert2} variant="danger" setShow={setShowAlert2} />
      <Modal idToDel={idToDel} handleClose={handleClose} handleDel={handleDel} />
      <div className='div_date_list'>
        <p>Reservation for desk {props.selSeat}</p>
        <div className='wrapper-scroll'>
          {reservationData.length > 0 ?
            <Table>
              <tbody>
                {tableContent}
              </tbody>
            </Table> : <>No booking</>}
        </div>
        {props.selSeat && token.role === 'user' && <div className='wrapper-plus'>
          <Button className='plus' type="button" onClick={() => { addRow() }}>Add <FontAwesomeIcon icon={faPlus} /></Button>
        </div>}
      </div>
      {selRow && <CalendarContainer isCalendarActive={isCalendarActive} setSelRow={setSelRow} selSeat={selRow}
        user={token.user} key={childKey} refreshFn={refresh} msg={utils.MSG} check={check} currentDate={currentDate} />}
    </ElementStyle>
  );
}

export default ReservationList;

