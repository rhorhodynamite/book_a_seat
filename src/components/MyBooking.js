import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import axios from '../api/axios';
import utils from '../api/utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GET_URL = SERVER_URL + 'api/my_reservations';
const CONTENT_WIDTH = 650;

const StyledTableContainer = styled(TableContainer)`
  margin-top: 20px;
`;

const currentDate = moment(new Date()).startOf('day').toDate();

export default function MyBooking(props) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const [reservationList, setReservationList] = useState([]);
  const [reservationData, setReservation] = useState([]);
  const [idToDel, setIdToDel] = useState(null);
  const [showAlert, setShowAlert] = useState(null);
  const [todayBookings, setTodayBookings] = useState([]);

 const getSeatName = (seatId) => {
  if (seatId === 16) return 'Telefonbox';
  if (seatId === 17) return 'Meetingraum (OG)';
  if (seatId === 18) return 'Meetingraum (OG) Schreibtisch 1';
  if (seatId === 19) return 'Meetingraum (OG) Schreibtisch 2';
  if (seatId >= 1 && seatId <= 12) return 'Research Office';
  if (seatId === 13) return 'Camp 1';
  if (seatId === 25 || seatId === 23 || seatId === 27) return 'Camp 2';
  if (seatId === 24 || seatId === 28 || seatId === 15) return 'Camp 3';
  if (seatId === 20 || seatId === 21 || seatId === 22 || seatId === 26) return 'Camp 4';
  if (seatId === 29) return 'Nische Treppe';
  if (seatId === 30) return 'Küche Rechts';
  if (seatId === 31) return 'Küche Links';
  return 'Unknown Seat';
};



  function loadData() {
    console.log('load booking');

    const loadRequest = async () => {
      try {
        const response = await axios.get(GET_URL, {
          withCredentials: true,
        });
        const rslt = response.data?.rslt.map((val, key) => {
          if (typeof val.startdate === 'string') {
            val.startDate = new Date(val.startdate);
          }
          if (typeof val.enddate === 'string') {
            val.endDate = new Date(val.enddate);
          }
          val.mmtS = moment(val.startDate);
          val.startHour = parseFloat(val.mmtS.format('HH')) + parseFloat(val.mmtS.format('mm') / 60);
          val.startDay = parseInt(val.mmtS.format('D'));
          val.startMonth = parseInt(val.mmtS.format('M'));
          val.startYear = parseInt(val.mmtS.format('YYYY'));
          val.weekday = val.mmtS.format('ddd');

          val.mmtE = moment(val.endDate);
          val.endHour = parseInt(val.mmtE.format('HH')) + parseFloat(val.mmtE.format('mm') / 60);
          val.endDay = parseInt(val.mmtE.format('D'));
          val.endMonth = parseInt(val.mmtE.format('M'));
          val.endYear = parseInt(val.mmtE.format('YYYY'));
          val.weekday = val.mmtS.format('ddd');
          val.seatName = getSeatName(val.seatid);
          return val;
        });

        // Filter the reservations for the current user
        const userReservations = rslt.filter(val => val.username === props.username);

        const finalMap = [];
        userReservations.forEach(item => {
          let monthYearItem = finalMap.find(item2 => item2.year === item.startYear && item2.month === item.startMonth);
          if (!monthYearItem) {
            if (item.startDay === item.endDay) {
              monthYearItem = {
                year: item.startYear, month: item.startMonth, days: [{
                  day: item.startDay,
                  dayBook: [{ id: item.id, seatId: item.seatid, from: item.startHour, to: item.endHour }]
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
                monthYearItem.days.push({ day: item.startDay, dayBook: [{ id: item.id, seatId: item.seatid, from: item.startHour, to: item.endHour }] });
              } else {
                addMultiDays(item, finalMap);
              }
            } else {
              dayItem.dayBook.push({ id: item.id, seatId: item.seatid, from: item.startHour, to: item.endHour });
            }
          }
        });
        console.log('modify rslt', rslt);
        console.log('finalMap', finalMap);
        setReservation(finalMap);
        setReservationList(userReservations);

        // Get today's bookings for all users
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
    }
    loadRequest();
  }

  function addMultiDays(item, finalMap) {
    const currDate = item.mmtS.startOf('day');
    const lastDate = item.mmtE.startOf('day');
    let startHour = null;
    while (currDate.diff(lastDate) <= 0) {
      const day = parseInt(currDate.format('D'));
      const weekday = currDate.format('ddd');
      const month = parseInt(currDate.format('M'));
      const year = parseInt(currDate.format('YYYY'));
      startHour = startHour === null ? item.startHour : 0;
      const endHour = currDate.isSame(lastDate) ? item.endHour : 24;

      let monthYearItem = finalMap.find(item2 => item2.year === year && item2.month === month);
      if (!monthYearItem) {
        monthYearItem = {
          year: year, month: month, days: [{
            day, weekday,
            dayBook: [{ id: item.id, seatId: item.seatid, from: startHour, to: endHour }]
          }]
        }
        finalMap.push(monthYearItem);
      } else {
        const dayItem = monthYearItem.days.find(item3 => item3.day === day);
        if (!dayItem) {
          monthYearItem.days.push({
            day, weekday, dayBook: [{
              id: item.id, seatId: item.seatid, from: startHour, to: endHour
            }]
          });
        } else {
          dayItem.dayBook.push({ id: item.id, seatId: item.seatid, from: startHour, to: endHour });
        }
      }
      currDate.add(1, 'days');
    }
  }

  useEffect(() => {
    // only in dev mode is called 2 times 
    console.log('==============> user effect', props.loadBooking);
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
      const txtContent = `from  ${r.mmtS.format('HH:mm')} to ${fTime === '00:00' ? '24:00' : fTime}, desk id: ${val.seatId}`;
      const titleContent = `from ${r.mmtS.format('DD.MM.yyyy HH:mm')} to ${r.mmtE.add(-1, 'ss').format('DD.MM.yyyy HH:mm')}, desk id: ${val.seatId}`;
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
              {barEl(val.dayBook, val.day + '_' + item.month)}
              {isToday && <div className='today'>Today</div>}
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

  function delRow(evt, isDisabled, item) {
    evt.stopPropagation();
    if (isDisabled)
      return

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

  function refresh() {
    loadData();
    setShowAlert(utils.MSG.del);
    setTimeout(() => { setShowAlert(null); }, 2500);
  }

    return (

    <Container maxWidth="md">

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

  )

}
