//components/Navbar.jsx
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';

const AppNavbar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="mb-3">
      <Container fluid>
        <Button variant="outline-light" className="d-md-none me-2" onClick={onToggleSidebar}>
          ☰
        </Button>
        <Navbar.Brand href="/">API Generator</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {user ? (
            <>
              <Navbar.Text className="me-3">
                Signed in as: <strong>{user.name || user.email}</strong>
              </Navbar.Text>
              <Button variant="outline-light" onClick={() => dispatch(logout())}>
                Logout
              </Button>
            </>
          ) : (
            <Nav>
              <LinkContainer to="/signin">
                <Nav.Link>Sign In</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
