import { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Button,
  Typography, Box, Container
} from '@mui/material';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import axios from '../api/axios';
import utils from '../api/utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import '../styles.css'; // Ensure this imports your stylesheet

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GET_URL = SERVER_URL + 'api/my_reservations';
const CONTENT_WIDTH = 650;

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  backgroundColor: '#E7EAD4', // Updated background color
}));


const StyledBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  backgroundColor: '#E7EAD4', // Updated background color
  '& .today-pointer': {
    position: 'absolute',
    top: 0,
    left: '-20px',
    background: theme.palette.primary.main,
    color: '#fff',
    padding: '4px 8px',
    borderRadius: '4px',
    transform: 'rotate(-45deg)',
    transformOrigin: 'left bottom',
  },
}));

const currentDate = moment().startOf('day').toDate();

const MyBooking = (props) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const [reservationList, setReservationList] = useState([]);
  const [reservationData, setReservation] = useState([]);
  const [idToDel, setIdToDel] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [todayBookings, setTodayBookings] = useState([]);

  const getSeatName = (seatId) => {
    const seatNames = {
      16: 'Telefonbox', 17: 'Meetingraum (OG)', 18: 'Meetingraum (OG) Schreibtisch 1', 19: 'Meetingraum (OG) Schreibtisch 2',
      1: 'Research Office', 2: 'Research Office', 3: 'Research Office', 4: 'Research Office', 5: 'Research Office',
      6: 'Research Office', 7: 'Research Office', 8: 'Research Office', 9: 'Research Office', 10: 'Research Office',
      11: 'Research Office', 12: 'Research Office', 13: 'Camp 1', 25: 'Camp 2', 23: 'Camp 2', 27: 'Camp 2',
      24: 'Camp 3', 28: 'Camp 3', 15: 'Camp 3', 20: 'Camp 4', 21: 'Camp 4', 22: 'Camp 4', 26: 'Camp 4',
      29: 'Nische Treppe', 30: 'Küche Rechts', 31: 'Küche Links'
    };
    return seatNames[seatId] || 'Unknown Seat';
  };

  const loadData = async () => {
    try {
      const response = await axios.get(GET_URL, { withCredentials: true });
      const rslt = response.data?.rslt.map((val) => {
        if (typeof val.startdate === 'string') val.startDate = new Date(val.startdate);
        if (typeof val.enddate === 'string') val.endDate = new Date(val.enddate);
        val.mmtS = moment(val.startDate);
        val.startHour = parseFloat(val.mmtS.format('HH')) + parseFloat(val.mmtS.format('mm') / 60);
        val.startDay = parseInt(val.mmtS.format('D'));
        val.startMonth = parseInt(val.mmtS.format('M'));
        val.startYear = parseInt(val.mmtS.format('YYYY'));
        val.weekday = val.mmtS.format('ddd');
        val.mmtE = moment(val.endDate);
        val.endHour = parseFloat(val.mmtE.format('HH')) + parseFloat(val.mmtE.format('mm') / 60);
        val.endDay = parseInt(val.mmtE.format('D'));
        val.endMonth = parseInt(val.mmtE.format('M'));
        val.endYear = parseInt(val.mmtE.format('YYYY'));
        val.seatName = getSeatName(val.seatid);
        return val;
      });

      const userReservations = rslt.filter(val => val.username === props.username);

      const finalMap = [];
      userReservations.forEach(item => {
        let monthYearItem = finalMap.find(item2 => item2.year === item.startYear && item2.month === item.startMonth);
        if (!monthYearItem) {
          if (item.startDay === item.endDay) {
            monthYearItem = {
              year: item.startYear, month: item.startMonth, days: [{
                day: item.startDay,
                weekday: item.weekday,
                dayBook: [{ id: item.id, seatId: item.seatid, seatName: item.seatName, from: item.startHour, to: item.endHour }]
              }]
            };
            finalMap.push(monthYearItem);
          } else {
            addMultiDays(item, finalMap);
          }
        } else {
          const dayItem = monthYearItem.days.find(item3 => item3.day === item.startDay);
          if (!dayItem) {
            if (item.startDay === item.endDay) {
              monthYearItem.days.push({ day: item.startDay, weekday: item.weekday, dayBook: [{ id: item.id, seatId: item.seatid, seatName: item.seatName, from: item.startHour, to: item.endHour }] });
            } else {
              addMultiDays(item, finalMap);
            }
          } else {
            dayItem.dayBook.push({ id: item.id, seatId: item.seatid, seatName: item.seatName, from: item.startHour, to: item.endHour });
          }
        }
      });

      setReservation(finalMap);
      setReservationList(userReservations);

      const today = moment().startOf('day');
      const todayBookings = rslt.filter(val =>
        moment(val.startDate).isSame(today, 'day') ||
        moment(val.endDate).isSame(today, 'day') ||
        (moment(val.startDate).isBefore(today, 'day') && moment(val.endDate).isAfter(today, 'day'))
      );
      setTodayBookings(todayBookings);

    } catch (err) {
      console.log("ERROR loadData", err);
    }
  };

  const addMultiDays = (item, finalMap) => {
    const currDate = item.mmtS.startOf('day');
    const lastDate = item.mmtE.startOf('day');
    let startHour = null;
    while (currDate.diff(lastDate) <= 0) {
      const day = parseInt(currDate.format('D'));
      const weekday = currDate.format('ddd');
      const month = parseInt(currDate.format('M'));
      const year = parseInt(currDate.format('YYYY'));
      startHour = startHour === null ? item.startHour : 8;
      const endHour = currDate.isSame(lastDate) ? item.endHour : 18;

      let monthYearItem = finalMap.find(item2 => item2.year === year && item2.month === month);
      if (!monthYearItem) {
        monthYearItem = {
          year: year, month: month, days: [{
            day, weekday,
            dayBook: [{ id: item.id, seatId: item.seatid, seatName: item.seatName, from: startHour, to: endHour }]
          }]
        }
        finalMap.push(monthYearItem);
      } else {
        const dayItem = monthYearItem.days.find(item3 => item3.day === day);
        if (!dayItem) {
          monthYearItem.days.push({
            day, weekday, dayBook: [{
              id: item.id, seatId: item.seatid, seatName: item.seatName, from: startHour, to: endHour
            }]
          });
        } else {
          dayItem.dayBook.push({ id: item.id, seatId: item.seatid, seatName: item.seatName, from: startHour, to: endHour });
        }
      }
      currDate.add(1, 'days');
    }
  };

  useEffect(() => {
    loadData();
  }, [props.loadBooking]);

  const barEl = (dayBook, dayMonthKey) => {
    return dayBook.map((val, key) => {
      const colorId4SeatId = val.seatId % 4;
      const widthBar = (val.to - val.from) / 24 * CONTENT_WIDTH;    // 24hh
      const left = val.from / 24 * CONTENT_WIDTH;
      const style = { width: (widthBar + 'px'), left: left + 'px', backgroundColor: COLORS[colorId4SeatId] };
      const fTDayMonthKey = val.from + '_' + val.to + '_' + dayMonthKey;
      const r = reservationList.find(item2 => val.id === item2.id);
      const fTime = r.mmtE.format('HH:mm');
      const txtContent = `from ${r.mmtS.format('HH:mm')} to ${fTime === '00:00' ? '24:00' : fTime}, desk id: ${val.seatId} (${val.seatName})`;
      const titleContent = `from ${r.mmtS.format('DD.MM.yyyy HH:mm')} to ${r.mmtE.format('DD.MM.yyyy HH:mm')}, desk id: ${val.seatId} (${val.seatName})`;
      return (
        <div key={fTDayMonthKey} className="div_bar" style={style} title={titleContent}  >
          {(widthBar > 250) ? txtContent : ''}
        </div>
      )
    })
  }

  const days4Month = (item) => {
    return item.days
      .filter(val => {
        const selDay = new Date(item.year, item.month - 1, val.day, 0, 0, 0);
        return selDay >= currentDate;
      })
      .map((val, key) => {
        const selDay = new Date(item.year, item.month - 1, val.day, 0, 0, 0);
        const startDate = reservationList.find(item2 => val.dayBook.at(-1).id === item2.id).startDate;
        const isDisabled = (startDate <= currentDate) ? true : false;
        const isToday = (selDay.getTime() === currentDate.getTime()) ? true : false;
        const titleText = 'Delete booking' + (isDisabled ? ' not possible. In the past' : '');
        return (
          <TableRow key={item.month + '_' + key} {...(isToday ? { className: 'today' } : {})}>
            <TableCell>{val.day} {val.weekday}</TableCell>
            <TableCell>
              <StyledBox>
                {barEl(val.dayBook, val.day + '_' + item.month)}
                {isToday && <div className='today-pointer'>Today</div>}
              </StyledBox>
            </TableCell>
            <TableCell>
              <Button variant="text" title={titleText} onClick={(evt) => { delRow(evt, isDisabled, val) }}>
                <FontAwesomeIcon {...(isDisabled ? { className: 'fa-disabled' } : {})} icon={faTrash} />
              </Button>
            </TableCell>
          </TableRow>
        )
      });
  }

  const tableContent = reservationData.map((val, key) => {
    return (
      <div key={'div_' + key} className='wrapper_table' >
        <Typography variant="h6" className='wrapper_month'>{moment(val.month, 'M').format('MMMM')} {val.year}</Typography>
        <StyledTableContainer component={Paper}>
          <Table>
            <TableBody>
              {days4Month(val)}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </div>
    )
  })

  const delRow = (evt, isDisabled, item) => {
    evt.stopPropagation();
    if (isDisabled) return;
    setIdToDel(item.dayBook.at(-1).id);
  }

  const handleClose = () => setIdToDel(false);
  const handleDel = () => {
    const callback = () => {
      refresh();
      setIdToDel(null);
    }
    utils.delReservationDb(idToDel, callback);
  }

  const refresh = () => {
    loadData();
    setShowAlert(utils.MSG.del);
    setTimeout(() => { setShowAlert(null); }, 2500);
  }

  return (
    <div>
      <div className="art-nouveau-left"></div>
      <div className="art-nouveau-right"></div>
      <Container className="my-bookings-container" maxWidth="md">
        <Dialog open={!!showAlert} onClose={() => setShowAlert(null)}>
          <DialogTitle>Success</DialogTitle>
          <DialogContent>
            <DialogContentText>{showAlert}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowAlert(null)} color="primary">Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={!!idToDel} onClose={handleClose}>
          <DialogTitle>Delete Reservation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this reservation?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDel} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h4" gutterBottom>Today's Bookings</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Seat Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayBookings.map((booking, index) => (
                <TableRow key={index}>
                  <TableCell>{booking.username}</TableCell>
                  <TableCell>{moment(booking.startDate).format('HH:mm')}</TableCell>
                  <TableCell>{moment(booking.endDate).format('HH:mm')}</TableCell>
                  <TableCell>{booking.seatName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" gutterBottom>My Bookings</Typography>
        {reservationData.length > 0 ? tableContent : <Typography variant="h6">No reservations until now!</Typography>}
      </Container>
    </div>
  );
}

export default MyBooking;

