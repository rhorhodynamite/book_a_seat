import React, { useContext, useState } from 'react';
import Diagram from './Diagram';
import NavBar from './NavBar';
import ReservationList from './ReservationList';
import MyBooking from './MyBooking';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';

const ElementStyle = styled.div`
  background: #E7EAD4; /* Background color */
  min-height: 100vh; /* Ensure it covers the full height */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  justify-content: center; /* Center items vertically */

  .wrapper-dashboard {
    width: 80%;
    max-width: 1000px;
    margin: 20px 0;
    padding: 20px;
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .h2, h2 {
    font-size: 1.5rem;
    font-family: 'Playfair Display', serif; /* Art Nouveau style font */
    color: #333;
  }

  .ref-wrapper {
    margin-top: 2em;
    font-size: 15px;
    span {
      font-style: italic;
    }
  }

  .navbar {
    width: 100%;
    background: #333; /* Darker background for contrast */
    color: white;
    font-family: 'Playfair Display', serif; /* Art Nouveau style font */
    padding: 10px 0;
  }

  .navbar-brand {
    font-size: 1.5rem;
    font-weight: bold;
    margin-left: 20px;
  }

  .navbar-collapse {
    justify-content: flex-end;
    margin-right: 20px;
  }

  .tab-content {
    width: 100%;
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
  }

  .nav-tabs .nav-link {
    font-size: 1rem;
    font-family: 'Playfair Display', serif; /* Art Nouveau style font */
    color: #007bff;
    border-radius: 10px 10px 0 0;
  }

  .nav-tabs .nav-link.active {
    background-color: #007bff;
    color: white;
  }
`;

const Dashboard = () => {
  const { token } = useContext(AuthContext);
  const [selSeat, setSelSeat] = useState(null);

  const setSelSeatHandler = (id) => {
    setSelSeat(id);
  };

  return (
    <ElementStyle>
      <NavBar />
      <div className="wrapper-dashboard">
        {/* Add any other components or content here */}
        <Tabs defaultActiveKey="booking" className="mb-3">
          {token.role === 'user' && (
            <Tab eventKey="booking" title="Bookings">
              <MyBooking username={token.user} />
            </Tab>
          )}
          <Tab eventKey="reservation" title="First Floor">
            <h2>{token.role === 'admin' ? "ADMIN - Manage First Floor" : "First Floor Plan"}</h2>
            <Diagram apiUrl={`${SERVER_URL}api/seats`} setSelSeat={setSelSeatHandler} svgType="main" />
            <ReservationList selSeat={selSeat} />
          </Tab>
          <Tab eventKey="upstairs" title="Upstairs">
            <h2>{token.role === 'admin' ? "ADMIN - Manage Upstairs Area" : "Upstairs Office Plan"}</h2>
            <Diagram apiUrl={`${SERVER_URL}api/seats`} setSelSeat={setSelSeatHandler} svgType="upstairs" />
            <ReservationList selSeat={selSeat} />
          </Tab>
          <Tab eventKey="seminar" title="Meeting Raum (OG)/Telefonbox">
            <h2>{token.role === 'admin' ? "ADMIN - Manage Seminar Room/Phone Booth" : "Meeting Raum (OG)/Telefonbox Plan"}</h2>
            <Diagram apiUrl={`${SERVER_URL}api/seats`} setSelSeat={setSelSeatHandler} svgType="seminar" />
            <ReservationList selSeat={selSeat} />
          </Tab>
        </Tabs>
      </div>
    </ElementStyle>
  );
};

export default Dashboard;

