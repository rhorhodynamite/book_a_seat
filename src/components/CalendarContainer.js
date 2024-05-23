import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import Times from './Times';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import utils from '../api/utils.ts';
import Alert from './Alert.js';
import CloseButton from 'react-bootstrap/CloseButton';

const ElementStyle = styled.div`
  .wrapper-date-edit {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-top: 20px;
    width: 368px;
    padding: 20px;
    background-color: #fff;
    position: absolute;
    top: 150px;
    right: 20px;
  }

  .disabled-all .react-calendar button {
    pointer-events: none;
  }

  .react-calendar {
    width: 100%;
    border: none;
    font-family: 'Roboto', sans-serif;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1rem;
    color: #333;
  }

  .btn-close {
    float: right;
    cursor: pointer;
  }

  button.btn {
    margin: 3px 0;
    width: 100%;
  }
`;

const CalendarContainer = (props) => {
  const selSeat = props.selSeat;
  const wrappeClassName = `wrapper-date-edit ${!props.isCalendarActive ? 'disabled-all' : ''}`;
  const [dateInterval, setDateInterval] = useState([selSeat.startDate, selSeat.endDate]);
  const [timeInterval, setTimeInterval] = useState([
    Math.max(utils.timeToDecimal(moment(selSeat.startDate).format('HH:mm')), 8),
    Math.min(utils.timeToDecimal(moment(selSeat.endDate).format('HH:mm')), 20)
  ]);
  const [showAlert2, setShowAlert2] = useState(false);
  const [msgAlert2, setMsgAlert2] = useState({});

  const setDateOnChange = (evt) => {
    setDateInterval(evt);
  };

  const setTimeOnChange = (evt) => {
    setTimeInterval(evt);
  };

  const check = (mode, dt) => {
    let errorData = null;
    if (mode === 'edit' && dt[1] < props.currentDate) {
      errorData = 'Not possible to modify values in the past';
    } else if (mode === 'add' && dt[0] < props.currentDate) {
      errorData = 'Not possible to start a new reservation in the past';
    } else {
      errorData = props.check(dt, selSeat.id);
    }
    if (errorData) {
      setShowAlert2(true);
      setMsgAlert2(errorData);
      return false;
    }
    return true;
  };

  const save = () => {
    console.log('Original start time interval:', timeInterval[0]);
    console.log('Original end time interval:', timeInterval[1]);

    const adjustedStartTime = moment(dateInterval[0])
      .hour(Math.floor(timeInterval[0]))
      .minute((timeInterval[0] - Math.floor(timeInterval[0])) * 60)
      .add(2, 'hours')
      .second(0)
      .utc()
      .format('YYYY-MM-DD HH:mm:ss');

    const adjustedEndTime = moment(dateInterval[1])
      .hour(Math.floor(timeInterval[1]))
      .minute((timeInterval[1] - Math.floor(timeInterval[1])) * 60)
      .add(2, 'hours')
      .second(0)
      .utc()
      .format('YYYY-MM-DD HH:mm:ss');

    console.log('Adjusted start time (UTC):', adjustedStartTime);
    console.log('Adjusted end time (UTC):', adjustedEndTime);

    if (check(selSeat.id ? 'edit' : 'add', [adjustedStartTime, adjustedEndTime])) {
      const params = {
        id: selSeat.id,
        seatId: selSeat.seatId,
        user: props.user,
        interval: [adjustedStartTime, adjustedEndTime]
      };

      console.log('Params being sent to backend:', params);

      const callback = (resp) => {
        if (resp && !resp.successfull) {
          setShowAlert2(true);
          setMsgAlert2(`In the same time ${params.interval.join(' - ')} the user has other reservations (desk ids: ${resp.rows.join(', ')})`);
        } else {
          props.refreshFn(selSeat.id ? props.msg.edit : props.msg.add);
        }
      };
      utils.insReservationDb(params, selSeat, callback);
    }
  };

  return (
    <ElementStyle>
      <Alert show={showAlert2} msg={msgAlert2} variant="danger" setShow={setShowAlert2} />
      <div className={wrappeClassName}>
        <CloseButton onClick={() => props.setSelRow(null)} />
        <div className="calendar-container">
          <Calendar
            onChange={setDateOnChange}
            showWeekNumbers={false}
            showNeighboringMonth={true}
            value={dateInterval}
            selectRange={true}
          />
        </div>
        <p>
          <span>from</span> {moment(dateInterval[0]).format('DD.MM.yyyy')} {utils.decimealToTime(timeInterval[0])}
          <span> to </span> {moment(dateInterval[1]).format('DD.MM.yyyy')} {utils.decimealToTime(timeInterval[1])}
        </p>
        {props.isCalendarActive && (
          <>
            <div>
              {dateInterval[0] && <Times timeInterval={timeInterval} setTimeOnChange={setTimeOnChange} />}
            </div>
            <Button type="button" onClick={() => props.setSelRow(null)} variant="secondary">
              Close
            </Button>
            <Button type="button" onClick={save} variant="primary">
              Save <FontAwesomeIcon icon={faSave} />
            </Button>
          </>
        )}
      </div>
    </ElementStyle>
  );
};

export default CalendarContainer;



