import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user); 
  const currentTeacherId = user?.id; 
  const navigate=useNavigate();
  useEffect(() => {
    if (!currentTeacherId) return;
    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://localhost:7254/api/Teacher/GetStudentsByDivision/${currentTeacherId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        // Force state application and ensure it uses the direct array
        setStudents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">Loading Students list...</div>;
  if (error) return <div className="error">Error loading data: {error}</div>;

  return (
    <div className="table-container" style={{ padding: '20px' }}>
      <h2>Student Lists</h2>
      
      {/* Debug view: This will print text onto your screen to verify state has 'Anu' */}
      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '15px' }}>
        <strong>Current State Length:</strong> {students.length} row(s) detected.
      </div>

      {students.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Class</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Division</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>View Mark</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.class}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.division}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}><Button className="btn btn-sm btn-primary" onClick={() => navigate(`/ViewMark/${student.id}`)}>Mark Sheet</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewStudent;
