import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux'; // Used to read state

function AddAttendance() {
  // State to hold the list of students fetched from the API
  const [students, setStudents] = useState([]);
  
  // Correctly read the user object from your Redux state
  const user = useSelector((state) => state.auth.user); 
  const currentTeacherId = user?.id; 

  // Standardized keys to use Student_Id uniformly everywhere
  const [formData, setFormData] = useState({
    Student_Id: '', 
    TotalDays: 180,     
    PresentDays: '',
    AbsentDays: 0 // Will be automatically computed
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Fetch only students belonging to this teacher's class & division
  useEffect(() => {
    if (!currentTeacherId) return;

    fetch(`https://localhost:7254/api/Teacher/GetStudentsByDivision/${currentTeacherId}`) 
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load class students');
        return response.json();
      })
      .then((data) => {
        setStudents(data); 
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setMessage("Could not load your division's student roster.");
        setIsError(true);
      });
  }, [currentTeacherId]);

  // Updated handler that calculates Absent Days dynamically on the fly
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: value
      };

      // Automate math if PresentDays is modified
      if (name === 'PresentDays') {
        const total = parseInt(updatedData.TotalDays, 10) || 0;
        const present = parseInt(value, 10) || 0;
        updatedData.AbsentDays = total - present >= 0 ? total - present : 0;
      }

      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Fixed key mapping validation
    if (!formData.Student_Id) {
      setMessage("Please select a student first.");
      setIsError(true);
      return;
    }

    // Guard constraint check
    if (parseInt(formData.PresentDays, 10) > parseInt(formData.TotalDays, 10)) {
      setMessage("Present Days cannot be greater than Total Working Days.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    const payload = {
      Student_Id: parseInt(formData.Student_Id, 10), 
      TotalDays: parseInt(formData.TotalDays, 10),
      PresentDays: parseInt(formData.PresentDays, 10),
      AbsentDays: parseInt(formData.AbsentDays, 10),
    };

    fetch('https://localhost:7254/api/Teacher/AddAttendance', {
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
        setMessage('Attendance logged successfully!');
        setFormData({
          Student_Id: '', 
          TotalDays: 180, 
          PresentDays: '', 
          AbsentDays: 0
        });
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        setMessage(`Failed to submit attendance: ${error.message}`);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          <Col md={12} className="p-4 p-lg-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark">Add Attendance</h2>
            </div>

            {message && (
              <Alert variant={isError ? 'danger' : 'success'} className="border-0 rounded-3">
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="text-secondary fw-semibold small">Select Student</Form.Label>
                <Form.Select 
                  name="Student_Id" // Fixed to match state configuration
                  value={formData.Student_Id}
                  onChange={handleChange}
                  style={{ padding: '10px', borderRadius: '8px' }}
                  required
                >
                  <option value="">Choose student...</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Total Days</Form.Label>
                    {/* Fixed type attribute and marked readOnly */}
                    <Form.Control type="number" name="TotalDays" value={formData.TotalDays} style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#e9ecef' }} readOnly />
                  </Form.Group>
                </Col>
                
                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Present Days</Form.Label>
                    <Form.Control type="number" placeholder="Enter Present Days" name="PresentDays" value={formData.PresentDays} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} min="0" max={formData.TotalDays} required />
                  </Form.Group>
                </Col>

                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Absent Days</Form.Label>
                    {/* Marked readOnly since math computes automatically now */}
                    <Form.Control type="number" name="AbsentDays" value={formData.AbsentDays} style={{ padding: '10px', borderRadius: '8px', backgroundColor: '#e9ecef' }} readOnly />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100 fw-bold py-2 mt-3" style={{ borderRadius: '8px' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Attendance'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AddAttendance;
