import React, { useState } from 'react';
import { Container, Row, Col, Offcanvas } from 'react-bootstrap';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <>
      <Navbar onToggleSidebar={() => setShowSidebar(true)} />
      <Container fluid>
        <Row>
          <Col md={2} className="d-none d-md-block bg-light vh-100 p-0 border-end">
            <Sidebar />
          </Col>

          <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} responsive="md">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Sidebar onLinkClick={() => setShowSidebar(false)} />
            </Offcanvas.Body>
          </Offcanvas>

          <Col md={10} xs={12} className="p-3">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Layout;
