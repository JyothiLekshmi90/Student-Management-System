import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Nav, Navbar, Table, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AdminHome() {
  const [activeKey, setActiveKey] = useState('dashboard');

  return (
    <div className="d-flex" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      
    

      {/* MAIN MAIN CONTENT CONTAINER */}
      <div className="flex-grow-1">
        
        {/* 2. TOP GLOBAL NAVBAR */}
        <Navbar bg="white" expand="lg" className="shadow-sm px-4 mb-4">
          <Navbar.Brand className="fw-semibold">System Analytics Overview</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#notifications" className="position-relative me-3">
                🔔 <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle rounded-pill">3</Badge>
              </Nav.Link>
              <Navbar.Text className="fw-medium text-dark">Welcome, Administrator</Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Container fluid className="px-4">
          
          {/* 3. CORE PERFORMANCE METRICS */}
          <Row className="mb-4">
            <Col xl={3} sm={6} className="mb-3">
              <Card className="border-0 shadow-sm border-start border-primary border-4">
                <Card.Body>
                  <Card.Title className="display-6 fw-bold my-2">STUDENTS
                 <Nav className="nav-pills flex-column mb-auto">
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Studentlist' ? 'active' : ''}`}  
                  as={Link} 
                  to="/Studentlist"
                >
               
                </Nav.Link>
              </Nav.Item>
              </Nav>
                </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <Card className="border-0 shadow-sm border-start border-warning border-4">
                 <Card.Body>
                  <Card.Title className="display-6 fw-bold my-2">TEACHERS
                 <Nav className="nav-pills flex-column mb-auto">
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Teacherlist' ? 'active' : ''}`}  
                  as={Link} 
                  to="/Teacherlist"
                >
               
                </Nav.Link>
              </Nav.Item>
              </Nav>
                </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <Card className="border-0 shadow-sm border-start border-success border-4">
                <Card.Body>
                <Card.Title className="display-6 fw-bold my-2">ATTENDENCE
                 <Nav className="nav-pills flex-column mb-auto">
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Studentlist' ? 'active' : ''}`}  
                  as={Link} 
                  to="/Studentlist"
                >
               
                </Nav.Link>
              </Nav.Item>
              </Nav>
                </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col xl={3} sm={6} className="mb-3">
              <Card className="border-0 shadow-sm border-start border-info border-4">
                <Card.Body>
                  <Card.Title className="display-6 fw-bold my-2">NEWS & UPDATES
                 <Nav className="nav-pills flex-column mb-auto">
              <Nav.Item className="mb-1">
                <Nav.Link 
                  className={`text-white ${location.pathname === '/Studentlist' ? 'active' : ''}`}  
                  as={Link} 
                  to="/Studentlist"
                >
               
                </Nav.Link>
              </Nav.Item>
              </Nav>
                </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>

        </Container>
      </div>
    </div>
  );
}

export default AdminHome;
