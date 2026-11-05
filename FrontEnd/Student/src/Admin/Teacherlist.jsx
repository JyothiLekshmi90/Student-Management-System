
import React, { useState, useEffect } from 'react';

const Teacherlist = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch('https://localhost:7254/api/Admin/GetTeachers', {
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
        setTeachers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <div className="loading">Loading teachers list...</div>;
  if (error) return <div className="error">Error loading data: {error}</div>;

  return (
    <div className="table-container" style={{ padding: '20px' }}>
      <h2>Teacher Lists</h2>
      
      {/* Debug view: This will print text onto your screen to verify state has 'Anu' */}
      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '15px' }}>
        <strong>Current State Length:</strong> {teachers.length} row(s) detected.
      </div>

      {teachers.length === 0 ? (
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
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{teacher.id}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{teacher.name}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{teacher.class}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{teacher.division || 'N/A'}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{teacher.email || 'No Email'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Teacherlist;
