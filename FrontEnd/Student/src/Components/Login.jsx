import { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// ✅ FIXED: Imported the Redux hooks and your authSlice action
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Components/Redux/AuthSlice'; 
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

   const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      // Standard native browser request configuration block
      const response = await fetch('https://localhost:7254/api/Home/Log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          Username: email,
          Password: password
        })
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // If the backend drops with a 401 or 400 validation error
        throw new Error(data?.message || `Server responded with status: ${response.status}`);
      }

      setSuccessMessage("Login Successful!");
      console.log("Verified Backend payload stream:", data);
      localStorage.clear();
      localStorage.setItem("userEmail", email); 
      
      const authenticatedUser = {
        email: data?.email || email,
        id:data?.id || id,
        role: data?.role || (email.toLowerCase().includes("teacher") ? "Teacher" : "Student")
      };

      // Dispatch directly to your Redux state module
      dispatch(loginSuccess(authenticatedUser));
      
      // Dynamic navigation pipeline matching account properties
      setTimeout(() => {
        if (authenticatedUser.role === "Teacher") navigate('/TeacherHome');
        else if (authenticatedUser.role === "Student") navigate('/StudentHome');
        else if (authenticatedUser.role === "Admin") navigate('/AdminHome');
        else navigate('/');
      }, 1200);

    } catch (error) {
      console.error("Authentication Stream Failure Details:", error);
      setErrorMessage(error.message || "Failed to make contact with authentication servers.");
    }
  };


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card style={{ width: '100%', maxWidth: '450px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Login Here..</h2>
          
          {/* Status Message Alerts */}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label column sm="3">Email</Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="email" 
                  placeholder="Enter email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPassword">
              <Form.Label column sm="3">Password</Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Col>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign In
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
