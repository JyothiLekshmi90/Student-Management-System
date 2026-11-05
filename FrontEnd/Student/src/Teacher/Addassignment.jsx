import { useState } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function AddAssignment() {
  const user = useSelector((state) => state.auth.user); 
  const currentTeacherId = user?.id; // Make sure this matches your Redux slice (e.g., user?.id or user?.teacherId)

  // Keep state focused ONLY on user inputs
  const [formData, setFormData] = useState({
    Subject: '', 
    Description: '',     
    Submission_Date: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!formData.Subject) {
      setMessage("Please select a subject first.");
      setIsError(true);
      return;
    }

    if (!currentTeacherId) {
      setMessage("Error: Teacher session not found. Please log in again.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    // Dynamic Payload Creation (Matches exact PascalCase C# Backend Expectations)
    const payload = {
      TeacherId: currentTeacherId, 
      Subject: formData.Subject,
      Description: formData.Description,
      Submission_Date: formData.Submission_Date
    };
   
    fetch('https://localhost:7254/api/Teacher/Addassignment', {
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
        setMessage('Assignment added successfully!');
        // Safely resets input fields without throwing errors on properties
        setFormData({
          Subject: '', 
          Description: '', 
          Submission_Date: ''
        });
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        setMessage(`Failed to add assignment: ${error.message}`);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          <Col md={12} className="p-4 p-lg-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark">Add Assignment</h2>
            </div>

            {message && (
              <Alert variant={isError ? 'danger' : 'success'} className="border-0 rounded-3">
                {message}
              </Alert>
            )}
           
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="text-secondary fw-semibold small">Select Subject</Form.Label>
                <Form.Select 
                  name="Subject" 
                  value={formData.Subject}
                  onChange={handleChange}
                  style={{ padding: '10px', borderRadius: '8px' }}
                  required
                >
                  <option value="">Choose Subject...</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Maths">Maths</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer">Computer</option>
                </Form.Select>
              </Form.Group>

              {/* Note: Hidden input removed as the payload structure handles it natively above */}

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Description</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={3}
                      name="Description" 
                      value={formData.Description} 
                      onChange={handleChange} 
                      style={{ padding: '10px', borderRadius: '8px' }} 
                    />
                  </Form.Group>
                </Col>
                
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Submission Date</Form.Label>
                    <Form.Control 
                      type="date" 
                      name="Submission_Date" 
                      value={formData.Submission_Date} 
                      onChange={handleChange} 
                      style={{ padding: '10px', borderRadius: '8px' }} 
                      required 
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100 fw-bold py-2 mt-3" style={{ borderRadius: '8px' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Assignment'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AddAssignment;
