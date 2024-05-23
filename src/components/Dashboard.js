import React, { useContext, useState } from 'react';
import Diagram from './Diagram';
import NavBar from './NavBar';
import ReservationList from './ReservationList';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';

const ElementStyle = styled.div`
  {
    position: relative;
    background: #E7EAD4; /* Updated background color */
    min-height: 100vh; /* Ensure it covers the full height */
    display: flex;
    flex-direction: column;
    align-items: center; /* Center the items horizontally */
    justify-content: center; /* Center the items vertically */
  }

  .h2, h2 {
    font-size: 1.5rem;
  }

  .ref-wrapper {
    margin-top: 2em;
    font-size: 15px;
    span {
      font-style: italic;
    }
  }
`;

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const [selSeat, setSelSeat] = useState(null);

  function setSelSeatHandler(id){
    setSelSeat(id); 
  }

  return (
    <ElementStyle>
      <NavBar />
      {/* Add any other components or content here */}
      <Diagram />
      <ReservationList />
    </ElementStyle>
  );
}

