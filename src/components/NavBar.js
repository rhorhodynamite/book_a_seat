import React, { useContext, useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Diagram from './Diagram';
import ReservationList from './ReservationList';
import MyBooking from './MyBooking';
import axios from '../api/axios';
import moment from 'moment';

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const GET_URL = SERVER_URL + 'api/my_reservations';

const ElementStyle = styled.div`
  > div {
    width: 1000px;
  }
  .container-fluid {
    // background-color: #e3f2fd;
  }
  .navbar-collapse {
    justify-content: right;
  }
  .show .dropdown-toggle {
    background-color: #0d6efd;
  }
`;

const GradientBackground = styled.div`
  background: linear-gradient(to right, #ffecd2, #fcb69f); /* pastel peach to light coral */
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 15px;
`;


function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const user = <span>{token.user}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faUser} transform="grow-5" /></span>;

  const logout = function() {
    console.log('logout');
    setToken(null);
  };

  const [keyBooking, setKeyBooking] = useState(0);
  const [keyDiagram, setKeyDiagram] = useState((token.role === 'admin' ? 1 : 0));
  const [selSeat, setSelSeat] = useState(null);
  const [keyUpstairsDiagram, setKeyUpstairsDiagram] = useState(1);
  const [keySeminarDiagram, setKeySeminarDiagram] = useState(1);
  const [todayBookings, setTodayBookings] = useState([]);

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

      const today = moment().startOf('day');
      const todayBookings = rslt.filter(val =>
        moment(val.startDate).isSame(today, 'day') ||
        moment(val.endDate).isSame(today, 'day') ||
        (moment(val.startDate).isBefore(today, 'day') && moment(val.endDate).isAfter(today, 'day'))
      );
      setTodayBookings(todayBookings);
      console.log("Today Bookings:", todayBookings); // Debug log

    } catch (err) {
      console.log("ERROR loadData", err);
    }
  };
   const getSeatName = (seatId) => {
    const seatNames = {
      16: 'Telefonbox', 17: 'Meetingraum (OG)', 18: 'Meetingraum (OG) Schreibtisch 1', 19: 'Meetingraum (OG) Schreibtisch 2',
      1: 'Research Office', 2: 'Research Office', 3: 'Research Office', 4: 'Research Office', 5: 'Research Office',
      6: 'Research Office', 7: 'Research Office', 8: 'Research Office', 9: 'Research Office', 10: 'Research Office',
      11: 'Research Office', 12: 'Research Office', 13: 'Camp 1', 25: 'Camp 2', 23: 'Camp 2', 27: 'Camp 2',
      24: 'Camp 3', 28: 'Camp 3', 15: 'Camp 3', 20: 'Camp 4', 21: 'Camp 4', 22: 'Camp 4', 26: 'Camp 4',
      29: 'Nische Treppe', 30: 'KÃÂ¼che Rechts', 31: 'KÃÂ¼che Links'
    };
    return seatNames[seatId] || 'Unknown Seat';
  };
  useEffect(() => {
    loadData();
  }, []);

  function onSelectChange(tabElName) {
    if (tabElName === 'reservation') {
      setSelSeat(null);
      setKeyDiagram(keyDiagram + 1);
    } else if (tabElName === 'upstairs') {
      setSelSeat(null);
      setKeyUpstairsDiagram(keyUpstairsDiagram + 1);
    } else if (tabElName === 'seminar') {
      setSelSeat(null);
      setKeySeminarDiagram(keySeminarDiagram + 1);
    } else {
      setKeyBooking(keyBooking + 1);
    }
  }

  function setSelSeatHandler(id) {
    setSelSeat(id);
  }

  return (
    <ElementStyle>
      <GradientBackground>
        <Navbar className='navbar navbar-light'>
          <Container fluid>
            <Navbar.Brand href="#home">Book a desk!</Navbar.Brand>
            <Navbar.Collapse id="navbarScroll">
              <Nav>
                <NavDropdown title={user} id="navbarScrollingDropdown" align="end" menuVariant='#e3f2fd'>
                  <NavDropdown.Item href="#" onClick={() => { logout(); }}>Logout</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Tabs onSelect={(tabElName) => onSelectChange(tabElName)}
              defaultActiveKey={token.role === 'user' ? "booking" : "reservation"}
              className="mb-3">
          {token.role === 'user' && (
            <Tab eventKey="booking" title="Bookings">
              <div className='wrapper-dashboard'>  
                <MyBooking username={token.user} key={keyBooking} todayBookings={todayBookings} />
              </div>
            </Tab>
          )}
          <Tab eventKey="reservation" title="First Floor">
            <div>  
             <h2>{token.role === 'admin' ? "ADMIN - Manage First Floor" : "First Floor Plan"}</h2>
              {keyDiagram > 0 && (
                <div className='wrapper-dashboard' key={'diagram_' + keyDiagram}>
                  <Diagram 
                      apiUrl={SERVER_URL + 'api/seats'} // Same endpoint for data
                      setSelSeat={setSelSeatHandler} 
                      svgType="main" // Prop to control SVG display
                      bookings={todayBookings.map(booking => ({
                        seatId: booking.seatid,
                        date: moment(booking.startDate).format('YYYY-MM-DD')
                      }))}
                  />
                  <ReservationList selSeat={selSeat}/>
                </div>
              )}
            </div>
          </Tab>
          <Tab eventKey="upstairs" title="Upstairs">
            <div>
              <h2>{token.role === 'admin' ? "ADMIN - Manage Upstairs Area" : "Upstairs Office Plan"}</h2>
              {keyUpstairsDiagram > 0 && (
                <div className='wrapper-dashboard' key={'upstairsDiagram_' + keyUpstairsDiagram}>
                  <Diagram 
                      apiUrl={SERVER_URL + 'api/seats'} // Same endpoint for data
                      setSelSeat={setSelSeatHandler} 
                      svgType="upstairs" // Prop to control SVG display
                      bookings={todayBookings.map(booking => ({
                        seatId: booking.seatid,
                        date: moment(booking.startDate).format('YYYY-MM-DD')
                      }))}
                  />
                  <ReservationList selSeat={selSeat}/>
                </div>
              )}
            </div>
          </Tab>
        <Tab eventKey="seminar" title="Meeting Raum (OG)/Telefonbox">
            <div>
              <h2>{token.role === 'admin' ? "ADMIN - Manage Seminar Room/Phone Booth" : "Meeting Raum (OG)/Telefonbox Plan"}</h2>
              {keySeminarDiagram > 0 && (
                <div className='wrapper-dashboard' key={'seminarDiagram_' + keySeminarDiagram}>
                  <Diagram 
                      apiUrl={SERVER_URL + 'api/seats'} // Same endpoint for data
                      setSelSeat={setSelSeatHandler} 
                      svgType="seminar" // Prop to control SVG display
                      bookings={todayBookings.map(booking => ({
                        seatId: booking.seatid,
                        date: moment(booking.startDate).format('YYYY-MM-DD')
                      }))}
                  />
                  <ReservationList selSeat={selSeat}/>
                </div>
              )}
            </div>
          </Tab>
        </Tabs>
      </GradientBackground>
    </ElementStyle>
  );
}

export default NavBar;

