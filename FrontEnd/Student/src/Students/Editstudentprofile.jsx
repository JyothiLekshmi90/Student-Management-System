import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'; // direct path avoids class constructor compilation errors
import { useParams, useNavigate } from 'react-router-dom';

function Editstudentprofile() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // 1. Initializing state with safe defaults prevents "Cannot read properties of null" errors
  const [formData, setFormData] = useState({
    Name: '',
    Role: '',     
    Class: '',
    Division: '',
    Phone: '',    
    Email: '',
    Password: ''
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ================= STAGE 1: FETCH & PRE-FILL OLD DATA =================
  useEffect(() => {
    const loadProfileData = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`https://localhost:7254/api/Student/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Could not find profile details for ID: ${id}`);
        }

        const data = await response.json();
        
        // Maps old database values straight into the form elements state
        setFormData({
          Name: data.name || data.Name || '',
          Role: data.role === 1 || data.Role === 1 ? 'Teacher' : 'Student',
          Class: (data.class || data.Class || '').toString(),
          Division: data.division || data.Division || '',
          Phone: data.phone || data.Phone || '',
          Email: data.email || data.Email || ''
         
        });
      } catch (err) {
        setIsError(true);
        setMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadProfileData();
    }
  }, [id]);

  // ================= STAGE 2: SUBMIT REVISED FORM =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setIsError(false);

    let roleId = formData.Role === 'Teacher' ? 1 : 2;

    const payload = {
      Id: parseInt(id),
      Role: roleId,
      Name: formData.Name,
      Class: formData.Class,
      Division: formData.Division,
      Phone: formData.Phone, 
      Email: formData.Email,
      Password: formData.Password
    };

    try {
      const response = await fetch(`https://localhost:7254/api/Student/UpdatestudentProfile/${id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server failed to save updated profile changes.");
      }

      setMessage("Profile modified successfully! Returning to portal...");
      setIsError(false);
      
      setTimeout(() => {
        navigate(-1); 
      }, 2000);

    } catch (err) {
      setIsError(true);
      setMessage(err.message);
      setSubmitting(false);
    }
  };

  // 2. Returning a loading spinner prevents the form from loading empty values prematurely
  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="mt-3 text-secondary fw-semibold">Loading profile data...</div>
      </Container>
    );
  }

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          
          <Col md={12} className="p-4 p-lg-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4 d-flex justify-content-between align-items-center">
              <div>
                <h2 className="fw-bold text-dark mb-0">Modify Account Identity</h2>
                <small className="text-muted">Adjust fields below to rewrite entry attributes for ID: {id}</small>
              </div>
              <Button variant="outline-secondary" size="sm" onClick={() => navigate(-1)}>Back</Button>
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
                  name="Name"
                  value={formData.Name} // Uses controlled form data instead of myProfile
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
                      name="Email"
                      value={formData.Email}
                      style={{ padding: '10px', borderRadius: '8px' }}
                      disabled 
                    />
                  </Form.Group>
                </Col>
              </Row>

            
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100 py-2 fw-semibold" 
                style={{ borderRadius: '8px' }}
                disabled={submitting}
              >
                {submitting ? "Saving..." : "Save Changes"}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default Editstudentprofile;
