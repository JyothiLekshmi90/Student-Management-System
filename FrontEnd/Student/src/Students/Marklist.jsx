import { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Table, Alert, Spinner, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function Marklist() {
  const [markRecord, setMarkRecord] = useState(null);
   const[atten, setAtten]=useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Extract the logged-in student profile from global Redux state
  const user = useSelector((state) => state.auth.user);
  const student_Id = user?.id;
  useEffect(() => {
    if (!student_Id) return;

    setLoading(true);
    fetch(`https://localhost:7254/api/Student/GetMarklist/${student_Id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to retrieve your mark list.');
        return response.json();
      })
      .then((data) => {
        // If the backend returns an array, pick the first record. Otherwise, use the object.
        setMarkRecord(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => {
        console.error("Error loading marklist:", err);
        setError(err.message || 'Something went wrong while fetching data.');
      })
      .finally(() => {
        setLoading(false);
      });
        fetch(`https://localhost:7254/api/Teacher/GetAttendance/${student_Id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to retrieve attendance details.');
        return response.json();
      })
      .then((data) => {
        // If the backend returns an array, pick the first record. Otherwise, use the object.
        setAtten(Array.isArray(data) ? data[0] : data);
      })
      .catch((err) => {
        console.error("Error loading attendance:", err);
        setError(err.message || 'Something went wrong while fetching data.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [student_Id]);

  // Calculations
  const calculateTotal = (row) => {
    if (!row) return 0;
    return (
      (parseInt(row.english, 10) || 0) +
      (parseInt(row.hindi, 10) || 0) +
      (parseInt(row.malayalam, 10) || 0) +
      (parseInt(row.maths, 10) || 0) +
      (parseInt(row.history, 10) || 0) +
      (parseInt(row.geography, 10) || 0) +
      (parseInt(row.physics, 10) || 0) +
      (parseInt(row.chemistry, 10) || 0) +
      (parseInt(row.biology, 10) || 0) +
      (parseInt(row.computer, 10) || 0)
    );
  };

  const totalMarksObtained = calculateTotal(markRecord);
  const maxPossibleMarks = 500; // 10 subjects * 100 marks max per subject
  const percentage = markRecord ? ((totalMarksObtained / maxPossibleMarks) * 100).toFixed(1) : 0;
  const totalDays = atten?.totalDays ?? atten?.TotalDays ?? 180;
  const presentDays = atten?.presentDays ?? atten?.PresentDays ?? 0;
  const attendancePercentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : "0.0";
  // Determine status color theme based on score performance
  const progressVariant = percentage >= 75 ? 'success' : percentage >= 40 ? 'primary' : 'danger';
  const attendanceVariant = parseFloat(attendancePercentage) >= 85 ? 'success' : parseFloat(attendancePercentage) >= 75 ? 'warning' : 'danger';

  return (
    <Container className="py-5" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
      <Card style={{ border: 'none', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* Report Card Header Banner */}
        <div className="bg-primary text-white p-4 p-lg-5 text-center text-sm-start">
          <Row className="align-items-center">
            <Col sm={8}>
              <h1 className="fw-bold m-0">Academic Report Card</h1>
               <div className="bg-white text-dark rounded-3 p-3 d-inline-block shadow-sm">
               <span>ATTENDANCE PERCENTAGE </span>
               <span className={`fs-1 fw-extrabold text-${attendanceVariant}`}>{attendancePercentage}%</span>
              </div>   
            </Col>
            <Col sm={4} className="text-center text-sm-end mt-4 mt-sm-0">
              <div className="bg-white text-dark rounded-3 p-3 d-inline-block shadow-sm">
                <span className="text-secondary small fw-bold d-block uppercase tracking-wider text-center">OVERALL PERCENTAGE</span>
                <span className={`fs-1 fw-extrabold text-${progressVariant}`}>{percentage}%</span>
              </div>
            </Col>
          </Row>
        </div>

        <Card.Body className="p-4 p-lg-5">
          {error && <Alert variant="danger" className="border-0 rounded-3 shadow-sm">{error}</Alert>}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="text-secondary mt-2 small fw-semibold">Assembling performance data...</p>
            </div>
          ) : !markRecord ? (
            <Alert variant="info" className="border-0 text-center py-5 rounded-3">
              <h5>No Marks Discovered</h5>
              <p className="text-muted m-0 small">Your teachers haven't published your mark list for this term yet.</p>
            </Alert>
          ) : (
            <>
              {/* Progress Bar Summary */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fw-semibold text-secondary small">Course Completion Score Tracker</span>
                  <span className="fw-bold text-dark small">{totalMarksObtained} / {maxPossibleMarks} Total Marks</span>
                </div>
                <ProgressBar animated now={parseFloat(percentage)} variant={progressVariant} style={{ height: '10px', borderRadius: '5px' }} />
              </div>

              {/* Subject Breakdown List */}
              <div className="table-responsive mt-4">
                <Table hover className="align-middle border-light rounded-3 overflow-hidden">
                  <thead className="table-light border-bottom">
                    <tr>
                      <th className="py-3 ps-3 text-secondary small fw-bold">SUBJECT NAME</th>
                      <th className="text-secondary small fw-bold text-center" style={{ width: '200px' }}>MAX MARKS</th>
                      <th className="pe-3 text-secondary small fw-bold text-end" style={{ width: '200px' }}>MARKS OBTAINED</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'English', score: markRecord.english },
                      { name: 'Hindi', score: markRecord.hindi },
                      { name: 'Malayalam', score: markRecord.malayalam },
                      { name: 'Mathematics', score: markRecord.maths },
                      { name: 'Physics', score: markRecord.physics },
                      { name: 'Chemistry', score: markRecord.chemistry },
                      { name: 'Biology', score: markRecord.biology },
                      { name: 'History', score: markRecord.history },
                      { name: 'Geography', score: markRecord.geography },
                      { name: 'Computer Science', score: markRecord.computer },
                    ].map((subject, idx) => (
                      <tr key={idx}>
                        <td className="fw-semibold text-dark py-3 ps-3">{subject.name}</td>
                        <td className="text-muted text-center">50</td>
                        <td className={`pe-3 text-end fw-bold text-${(parseInt(subject.score, 10) || 0) < 20 ? 'danger' : 'dark'}`}>
                          {subject.score ?? 'N/A'}
                        </td>
                      </tr>
                    ))}
                    {/* Final Totals Summary Row */}
                    <tr className="table-light fw-bold border-top border-dark">
                      <td className="py-3 ps-3 text-primary fs-5">Grand Total Score</td>
                      <td className="text-muted text-center fs-5">{maxPossibleMarks}</td>
                      <td className="pe-3 text-end text-primary fs-5">{totalMarksObtained}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Marklist;
