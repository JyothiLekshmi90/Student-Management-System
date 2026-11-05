import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
function HeaderNav(){
    return(
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Student Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
             <Nav.Link as={Link} to="/About">About us</Nav.Link>
           <Nav.Link as={Link} to="/Register">Register</Nav.Link>
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            
          </Nav>
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}
export default HeaderNav


