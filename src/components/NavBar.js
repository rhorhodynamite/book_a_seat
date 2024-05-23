import React, { useContext, useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../context/AuthProvider';
import styled from 'styled-components';

const NavBarStyle = styled.div`
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

  .dropdown-toggle::after {
    display: none;
  }
`;

const NavBar = () => {
  const { token, setToken } = useContext(AuthContext);
  const user = (
    <span>
      {token.user}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <FontAwesomeIcon icon={faUser} transform="grow-5" />
    </span>
  );

  const logout = () => {
    setToken(null);
  };

  return (
    <NavBarStyle>
      <Navbar className="navbar navbar-light">
        <Container fluid>
          <Navbar.Brand href="#home">Book a desk!</Navbar.Brand>
          <Navbar.Collapse id="navbarScroll">
            <Nav>
              <NavDropdown title={user} id="navbarScrollingDropdown" align="end">
                <NavDropdown.Item href="#" onClick={logout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </NavBarStyle>
  );
};

export default NavBar;

