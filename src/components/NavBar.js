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
import SVGPlanSeminar from './SvgPlanSeminar'; // Import the new SVG component

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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
  const [keySeminarDiagram, setKeySeminarDiagram] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState(null);

  function setRoomSelectionHandler(room) {
    setSelectedRoom(room);
  }

  function onSelectChange(tabElName) {
    if(tabElName === 'reservation') {
      setSelSeat(null);
      setKeyDiagram(keyDiagram + 1);
    } else if(tabElName === 'upstairs') {
      setSelSeat(null);
      setKeyUpstairsDiagram(keyUpstairsDiagram + 1);
    } else if(tabElName === 'seminar') {
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
      <Navbar className='navbar navbar-light'>
        <Container fluid>
          <Navbar.Brand href="#home">Book a desk!</Navbar.Brand>
          
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <NavDropdown title={user} id="navbarScrollingDropdown" align="end" menuVariant='#e3f2fd'>
                <NavDropdown.Item href="#" onClick={()=>{logout();}}>Logout</NavDropdown.Item>
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
        <Tab eventKey="reservation" title="First Floor">
          <div>  
            <h2>{token.role === 'admin' ? "ADMIN - Add seats and chairs" : ""}</h2>
            {keyDiagram > 0 && (
              <div className='wrapper-dashboard' key={'diagram_' + keyDiagram}>
                <Diagram 
                    apiUrl={SERVER_URL + 'api/seats'} // Same endpoint for data
                    setSelSeat={setSelSeatHandler} 
                    svgType="main" // Prop to control SVG display
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
                />
                <ReservationList selSeat={selSeat}/>
              </div>
            )}
          </div>
        </Tab>
      <Tab eventKey="seminar" title="Seminarraum/Telefonbox">
          <div>
            <h2>{token.role === 'admin' ? "ADMIN - Manage Seminar Room/Phone Booth" : "Seminar Room/Phone Booth Plan"}</h2>
            {keySeminarDiagram > 0 && (
              <div className='wrapper-dashboard' key={'seminarDiagram_' + keySeminarDiagram}>
                <Diagram 
                    apiUrl={SERVER_URL + 'api/seats'} // Same endpoint for data
                    setSelSeat={setSelSeatHandler} 
                    svgType="seminar" // Prop to control SVG display
                />
                <ReservationList selSeat={selSeat}/>
              </div>
            )}
          </div>
        </Tab>
      </Tabs>
    </ElementStyle>
  );
}

export default NavBar;
