import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// 1. Make sure 'Outlet' is imported from react-router-dom
import { Link, useLocation, Outlet } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();

  return (
    <>
      {/* Top Navbar */}
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand href="#home">Student Management System</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/Login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Grid Layout */}
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Left Column: Sidebar panel */}
          <Col md={3} lg={2} className="bg-dark min-vh-100 p-3 text-white">
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <i className="bi bi-person-badge me-2" style={{ fontSize: '1.5rem' }}></i>
              <span className="fs-4">Admin Panel</span>
            </div>
            <hr />

            <Nav className="nav-pills flex-column mb-auto">
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/AdminHome' ? 'active' : ''}`}  
                  as={Link} 
                  to="/AdminHome"
                >
                  <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Nav.Link>
              </Nav.Item>
              
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Teacherlist' ? 'active' : ''}`} 
                  as={Link} 
                  to="/Teacherlist"
                >
                  <i className="bi bi-table me-2"></i> Teacher Lists
                </Nav.Link>
              </Nav.Item>
              
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Studentlist' ? 'active' : ''}`} 
                  as={Link} 
                  to="/Studentlist"
                >
                  <i className="bi bi-grid me-2"></i> Student Lists
                </Nav.Link>
              </Nav.Item>
              
            </Nav>
            <hr />
          </Col>

          {/* Right Column: Dynamic Content Page Area */}
          <Col md={9} lg={10} className="p-4 bg-light">
            {/* 2. Added the Outlet tag here so your pages can render side-by-side with the menu */}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Sidebar;
