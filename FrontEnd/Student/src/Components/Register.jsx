import { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function Register() {
  const [formData, setFormData] = useState({
    Name: '',
    Role: '',     
    Class: '',
    Division: '',
    Phone: '',    
    Email: '',
    Password: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setLoading(true);
    setMessage('');
    setIsError(false);

    let roleId = 0;
    if (formData.Role === 'Teacher') roleId = 1;
    if (formData.Role === 'Student') roleId = 2;

    const payload = {
      Role: roleId,
      Name: formData.Name,
      Class: formData.Class,
      Division: formData.Division,
      Phone: formData.Phone, 
      Email: formData.Email,
      Password: formData.Password
    };

    fetch('https://localhost:7254/api/Home/AddDetails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload) 
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error("❌ BACKEND VALIDATION DETAILS:", errorData);
          
          let errorMsg = `Server validation failed (Status: ${response.status})`;
          if (errorData && errorData.errors) {
            errorMsg = Object.values(errorData.errors).flat().join(" ");
          }
          throw new Error(errorMsg);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setMessage('Registration completed successfully!');
        setFormData({
          Name: '', Role: '', Class: '', Division: '', Phone: '', Email: '', Password: ''
        });
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        setMessage(`Failed to register: ${error.message}`);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          
          {/* ================= LEFT COLUMN: WELCOME IMAGE ================= */}
          <Col md={5} className="d-none d-md-block" style={{ position: 'relative' }}>
            <div style={{
              backgroundImage: `url('https://unsplash.com')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              width: '100%',
              position: 'absolute'
            }} />
            {/* Soft overlay tint to look highly professional */}
            <div style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              background: 'linear-gradient(135deg, rgba(33,37,41,0.8) 0%, rgba(13,110,253,0.4) 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '40px',
              color: '#ffffff'
            }}>
              <h3 className="fw-bold">Register Your Details</h3>
              <p style={{ opacity: 0.85, fontSize: '0.95rem' }}>Create your institutional profile account to manage classrooms, divisions, and grades smoothly.</p>
            </div>
          </Col>

          {/* ================= RIGHT COLUMN: REGISTRATION FORM ================= */}
          <Col md={7} sm={12} className="p-4 p-lg-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark">Register Here</h2>
              <p className="text-muted">Please fill in your authentic details to set up your account.</p>
            </div>

            {message && (
              <Alert variant={isError ? 'danger' : 'success'} className="border-0 rounded-3">
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-secondary fw-semibold small">Full Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter your name" 
                  name="Name"
                  value={formData.Name}
                  onChange={handleChange}
                  style={{ padding: '10px', borderRadius: '8px' }}
                  required
                />
              </Form.Group>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Role Type</Form.Label>
                    <Form.Select 
                      name="Role"
                      value={formData.Role}
                      onChange={handleChange}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="Teacher">Teacher</option>
                      <option value="Student">Student</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                
                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Class</Form.Label>
                    <Form.Select 
                      name="Class"
                      value={formData.Class}
                      onChange={handleChange}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      required
                    >
                      <option value="">...</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Division</Form.Label>
                    <Form.Select 
                      name="Division"
                      value={formData.Division}
                      onChange={handleChange}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      required
                    >
                      <option value="">...</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Phone Number</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="+1 (555) 000-0000" 
                      name="Phone"
                      value={formData.Phone}
                      onChange={handleChange}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      required
                    />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Email Address</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="name@example.com" 
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-4">
                <Form.Label className="text-secondary fw-semibold small">Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="••••••••" 
                  name="Password"
                  value={formData.Password}
                  onChange={handleChange}
                  style={{ padding: '10px', borderRadius: '8px' }}
                  required
                />
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 fw-bold border-0" 
                style={{ padding: '12px', borderRadius: '8px', backgroundColor: '#0d6efd', transition: 'all 0.2s' }}
                disabled={loading}
              >
                {loading ? 'Processing Registration...' : 'Create Account'}
              </Button>
            </Form>
          </Col>

        </Row>
      </Card>
    </Container>
  );
}

export default Register;
