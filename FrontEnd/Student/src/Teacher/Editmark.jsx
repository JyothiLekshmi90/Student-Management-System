import { useEffect, useState } from 'react';
import { Container, Card, Row, Col, Form, Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'; // direct path avoids class constructor compilation errors
import { useParams, useNavigate } from 'react-router-dom';

function Editmark() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Initializing state with safe defaults (Keys are safely stored here out of sight)
  const [formData, setFormData] = useState({
    Mark_Id: '',          
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
        
        const response = await fetch(`https://localhost:7254/api/Teacher/Getmark/${id}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Could not find mark details for ID: ${id}`);
        }

        const data = await response.json();
        
        setFormData({
          // Fixed: Guarding against camelCase variations on your primary and foreign keys
          Mark_Id: data.mark_Id ?? data.Mark_Id ?? '',
          Student_Id: data.student_Id ?? data.Student_Id ?? '',
          English: (data.english ?? data.English ?? '').toString(),
          Hindi: (data.hindi ?? data.Hindi ?? '').toString(),
          Malayalam: (data.malayalam ?? data.Malayalam ?? '').toString(),
          Maths: (data.maths ?? data.Maths ?? '').toString(),
          History: (data.history ?? data.History ?? '').toString(),
          Geography: (data.geography ?? data.Geography ?? '').toString(),
          Physics: (data.physics ?? data.Physics ?? '').toString(),
          Chemistry: (data.chemistry ?? data.Chemistry ?? '').toString(),
          Biology: (data.biology ?? data.Biology ?? '').toString(),
          Computer: (data.computer ?? data.Computer ?? '').toString()
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

    const payload = {
      Mark_Id: parseInt(formData.Mark_Id) || 0,                
      Student_Id: parseInt(formData.Student_Id) || 0,
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

    try {
      const response = await fetch(`https://localhost:7254/api/Teacher/Updatemark`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error("Server failed to save updated Mark changes.");
      }

      setMessage("Mark modified successfully! Returning to portal...");
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

  if (loading) {
    return (
      <Container className="text-center py-5 mt-5">
        <div className="spinner-border text-primary" role="status"></div>
        <div className="mt-3 text-secondary fw-semibold">Loading Marksheet...</div>
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
                <h2 className="fw-bold text-dark mb-0">Modify Mark Sheet</h2>
              </div>
            </div>

            {message && (
              <Alert variant={isError ? 'danger' : 'success'} className="border-0 rounded-3">
                {message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit}>
              {/* Row 1 */}
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">English</Form.Label>
                    <Form.Control type="text" name="English" value={formData.English} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Hindi</Form.Label>
                    <Form.Control type="text" name="Hindi" value={formData.Hindi} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={3} xs={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Malayalam</Form.Label>
                    <Form.Control type="text" name="Malayalam" value={formData.Malayalam} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Row 2 */}
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Maths</Form.Label>
                    <Form.Control type="text" name="Maths" value={formData.Maths} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">History</Form.Label>
                    <Form.Control type="text" name="History" value={formData.History} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Row 3 */}
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Geography</Form.Label>
                    <Form.Control type="text" name="Geography" value={formData.Geography} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Physics</Form.Label>
                    <Form.Control type="text" name="Physics" value={formData.Physics} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Row 4 (Restored & finalized from layout cutoff) */}
              <Row>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Chemistry</Form.Label>
                    <Form.Control type="text" name="Chemistry" value={formData.Chemistry} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Biology</Form.Label>
                    <Form.Control type="text" name="Biology" value={formData.Biology} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group className="mb-3">
                    <Form.Label className="text-secondary fw-semibold small">Computer</Form.Label>
                    <Form.Control type="text" name="Computer" value={formData.Computer} onChange={handleChange} style={{ padding: '10px', borderRadius: '8px' }} required />
                  </Form.Group>
                </Col>
              </Row>

              {/* Action Buttons */}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="light" onClick={() => navigate(-1)} disabled={submitting} style={{ borderRadius: '8px', padding: '10px 20px' }}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={submitting} style={{ borderRadius: '8px', padding: '10px 25px' }}>
                {submitting ? 'Saving Changes...' : 'Save Changes'}
                </Button>
              </div>
          </Form>
          </Col>
          </Row>
        </Card>
      </Container>

);
}
export default Editmark;