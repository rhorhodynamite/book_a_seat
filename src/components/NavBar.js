import React, { useContext, useState } from 'react';
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
import RoomList from './RoomList'; // Assuming RoomList is a separate component
import SVGPlan from './SvgPlan'; // Ensure SVGPlan is imported if used
import SVGPlanUpstairs from './SvgPlanUpstairs';

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

function NavBar() {
  const { token, setToken } = useContext(AuthContext);
  const user = <span>{token.user}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faUser} transform="grow-5" /></span>;

  const logout = function(){
    console.log('logout');
    setToken(null);
  };

  const [keyBooking, setKeyBooking] = useState(0);
  const [keyDiagram, setKeyDiagram] = useState((token.role === 'admin' ? 1 : 0));
  const [selSeat, setSelSeat] = useState(null);
  const [keyUpstairsDiagram, setKeyUpstairsDiagram] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  function setRoomSelectionHandler(room) {
    setSelectedRoom(room);
  }

  function onSelectChange(tabElName) {
    if(tabElName === 'reservation') {
      setSelSeat(null);
      setKeyDiagram(keyDiagram + 1);
    } else {
      setKeyBooking(keyBooking + 1);
    }
  }

  function setSelSeatHandler(id) {
    setSelSeat(id); 
  }

  return (
    <ElementStyle>
      <Navbar className='navbar navbar-light'>
        <Container fluid>
          <Navbar.Brand href="#home">Book a desk!</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <NavDropdown title={user} id="navbarScrollingDropdown" align="end" menuVariant='#e3f2fd'>
                <NavDropdown.Item href="#" onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Tabs onSelect={(tabElName) => onSelectChange(tabElName)}
            defaultActiveKey={token.role === 'user' ? "booking" : "reservation"}
            className="mb-3">
        {token.role === 'user' && (
          <Tab eventKey="booking" title="My booking">
            <div className='wrapper-dashboard'>  
              <MyBooking username={token.user} key={keyBooking} />
            </div>
          </Tab>
        )}
        <Tab eventKey="reservation" title="New Reservation">
          <div>  
            <h2>
              {token.role === 'admin' ? "ADMIN - Add seats and chairs" : ""}
            </h2>
            {keyDiagram > 0 && (
              <div className='wrapper-dashboard' key={'diagram_' + keyDiagram}>
                <Diagram setSelSeat={setSelSeatHandler}  />
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
                {/* Use Diagram component for upstairs with specific props */}
                <Diagram 
                  apiUrl={REACT_APP_SERVER_URL + 'api/upstairs_seats'}  // Different endpoint for upstairs
                  setSelSeat={setRoomSelectionHandler}  // Use the same or a different handler if needed
                />
                <RoomList selectedRoom={selectedRoom} />
              </div>
            )}
          </div>
        </Tab>

      </Tabs>
            
    </ElementStyle>
  );
}

export default NavBar;
