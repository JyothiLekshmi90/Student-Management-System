import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux'; // Used to read state

function AddMark() {
  // State to hold the list of students fetched from the API
  const [students, setStudents] = useState([]);
  
  // 1. Correctly read the user object from your Redux state
  const user = useSelector((state) => state.auth.user); 
  const currentTeacherId = user?.id; 


  const [formData, setFormData] = useState({
    Student_Id: '', 
    English: '',     
    Hindi: '',
    Malayalam: '',
    Maths: '',    
    History: '',
    Geography: '',
    Physics: '',
    Chemistry: '',
    Biology: '',
    Computer: '' 
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
        // Ensure data maps properly to your list
        setStudents(data); 
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setMessage("Could not load your division's student roster.");
        setIsError(true);
      });
  }, [currentTeacherId]); // Re-runs if the teacher ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

   const handleSubmit = (e) => {
    e.preventDefault(); 
    
    // Prevent submitting if no valid student is selected
    if (!formData.StudentId) {
      setMessage("Please select a student first.");
      setIsError(true);
      return;
    }

    setLoading(true);
    setMessage('');
    setIsError(false);

    const payload = {
      // Force base-10 parsing to guarantee it sends a clean primitive integer
      Student_Id: parseInt(formData.StudentId, 10), 
      English: formData.English,
      Hindi: formData.Hindi,
      Malayalam: formData.Malayalam,
      Maths: formData.Maths, 
      History: formData.History,
      Geography: formData.Geography,
      Physics: formData.Physics,
      Chemistry: formData.Chemistry,
      Biology: formData.Biology,
      Computer: formData.Computer
    };


    fetch('https://localhost:7254/api/Teacher/Addmarks', {
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
        setMessage('Marks updated successfully!');
        setFormData({
          Student_Id: '', English: '', Hindi: '', Malayalam: '', Maths: '', History: '', Geography: '', Physics: '', Chemistry: '', Biology: '', Computer: ''
        });
      })
      .catch((error) => {
        setLoading(false);
        setIsError(true);
        setMessage(`Failed to submit marks: ${error.message}`);
      });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ width: '100%', maxWidth: '900px', border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
        <Row className="g-0">
          
          <Col md={12} className="p-4 p-lg-5" style={{ backgroundColor: '#ffffff' }}>
            <div className="mb-4">
              <h2 className="fw-bold text-dark">Add Marks</h2>
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
                  name="StudentId" 
                  value={formData.StudentId}
                  onChange={handleChange}
                 style={{ padding: '10px', borderRadius: '8px' }}
                 required
  >
              <option value="">Choose student...</option>
              {/* Map directly to the lowercame keys coming from your .NET API */}
              {students.map((student) => (
              <option key={student.id} value={student.id}>
              {student.name} 
                             </option>
         ))}
         </Form.Select>
       </Form.Group>


              {/* Subject Marks Input Rows */}
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">English</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="English" value={formData.English} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                
                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Hindi</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Hindi" value={formData.Hindi} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>

                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Malayalam</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Malayalam" value={formData.Malayalam} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Maths</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Maths" value={formData.Maths} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">History</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="History" value={formData.History} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Geography</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Geography" value={formData.Geography} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Physics</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Physics" value={formData.Physics} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Chemistry</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Chemistry" value={formData.Chemistry} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Biology</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Biology" value={formData.Biology} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Computer</Form.Label>
                    <Form.Control type="text" placeholder="Enter Marks" name="Computer" value={formData.Computer} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100 fw-bold py-2 mt-3" style={{ borderRadius: '8px' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit Marks'}
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default AddMark