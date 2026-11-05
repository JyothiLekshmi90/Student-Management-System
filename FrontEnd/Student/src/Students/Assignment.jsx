import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Assignment = () => {
  const [assignment, setassi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = useSelector((state) => state.auth.user); 
  const Stud_Id = user?.id; 

  useEffect(() => {
    // 1. Guard clause: Wait until Redux actually loads the TeacherId
    if (!Stud_Id) {
      return; 
    }

    const fetchAssignments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`https://localhost:7254/api/Student/GetAssignment/${Stud_Id}`, {
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
        setassi(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  // 2. Added TeacherId here so the effect runs again once the user data loads
  }, [Stud_Id]); 

  // Loading state handling for when Redux or API is fetching
  if (!Stud_Id) return <div className="loading" style={{ padding: '20px' }}>Syncing teacher session...</div>;
  if (loading) return <div className="loading" style={{ padding: '20px' }}>Loading assignment list...</div>;
  if (error) return <div className="error" style={{ padding: '20px', color: 'red' }}>Error loading data: {error}</div>;

  return (
    <div className="table-container" style={{ padding: '20px' }}>
      <h2>Assignments</h2>
      
      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '15px' }}>
        <strong>Current State Length:</strong> {assignment.length} row(s) detected.
      </div>

      {assignment.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subject</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Submission Date</th>
            </tr>
          </thead>
          <tbody>
            {assignment.map((item) => (
              /* 3. Note: Ensure 'assignment_Id' matches the exact case returned by your API JSON response */
              <tr key={item.assignment_Id || item.assignmentId}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.assignment_Id || item.assignmentId}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Subject || item.subject}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Description || item.description}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                  {item.submission_Date ? item.submission_Date.split('T')[0] : 'N/A'}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Assignment;
