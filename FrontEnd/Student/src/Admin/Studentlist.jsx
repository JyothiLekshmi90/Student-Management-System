import React, { useState, useEffect } from 'react';

const Studentlist = () => {
  const [students, setStudents] = useState([]);
  const [studentMetrics, setStudentMetrics] = useState({}); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New filtering states
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');

  useEffect(() => {
    const fetchAllStudentData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://localhost:7254/api/Admin/GetStudents');
        if (!res.ok) throw new Error('Failed to retrieve students list.');
        const studentData = await res.json();
        setStudents(studentData);

        const metricsMap = {};
        
        await Promise.all(
          studentData.map(async (student) => {
            try {
              const [markRes, attenRes] = await Promise.all([
                fetch(`https://localhost:7254/api/Teacher/GetMarklist/${student.id}`).then(r => r.ok ? r.json() : null),
                fetch(`https://localhost:7254/api/Teacher/GetAttendance/${student.id}`).then(r => r.ok ? r.json() : null)
              ]);

              let markPct = '0.0';
              if (markRes) {
                const record = Array.isArray(markRes) ? markRes[0] : markRes;
                const totalMarks = 
                  (parseInt(record?.english, 10) || 0) +
                  (parseInt(record?.hindi, 10) || 0) +
                  (parseInt(record?.malayalam, 10) || 0) +
                  (parseInt(record?.maths, 10) || 0) +
                  (parseInt(record?.history, 10) || 0) +
                  (parseInt(record?.geography, 10) || 0) +
                  (parseInt(record?.physics, 10) || 0) +
                  (parseInt(record?.chemistry, 10) || 0) +
                  (parseInt(record?.biology, 10) || 0) +
                  (parseInt(record?.computer, 10) || 0);
                markPct = ((totalMarks / 500) * 100).toFixed(1);
              }

              let attenPct = '0.0';
              if (attenRes) {
                const record = Array.isArray(attenRes) ? attenRes[0] : attenRes;
                const totalDays = record?.totalDays ?? record?.TotalDays ?? 180;
                const presentDays = record?.presentDays ?? record?.PresentDays ?? 0;
                attenPct = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : "0.0";
              }

              metricsMap[student.id] = { markPct, attenPct };
            } catch (innerErr) {
              console.error(`Error fetching metrics for student ${student.id}:`, innerErr);
              metricsMap[student.id] = { markPct: '—', attenPct: '—'};
            }
          })
        );

        setStudentMetrics(metricsMap);
      } catch (err) {
        console.error("Data loading error:", err);
        setError(err.message || 'Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllStudentData();
  }, []);

  // Get unique options dynamically from the loaded students list
  const classOptions = [...new Set(students.map(s => s.class).filter(Boolean))];
  const divisionOptions = [...new Set(students.map(s => s.division).filter(Boolean))];

  // Filter the student array based on dropdown selections
  const filteredStudents = students.filter((student) => {
    const matchesClass = selectedClass === '' || String(student.class) === String(selectedClass);
    const matchesDivision = selectedDivision === '' || String(student.division) === String(selectedDivision);
    return matchesClass && matchesDivision;
  });

  if (loading) return <div className="loading">Loading entire student dashboard...</div>;
  if (error) return <div className="error">Error loading data: {error}</div>;

  return (
    <div className="table-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Student Overview Dashboard</h2>
      
      {/* Filters Section */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#f9f9f9', padding: '15px', borderRadius: '5px' }}>
        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Class:</label>
          <select 
            value={selectedClass} 
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">All Classes</option>
            {classOptions.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Division:</label>
          <select 
            value={selectedDivision} 
            onChange={(e) => setSelectedDivision(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">All Divisions</option>
            {divisionOptions.map(div => (
              <option key={div} value={div}>{div}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ background: '#f0f0f0', padding: '10px', marginBottom: '15px' }}>
        <strong>Showing:</strong> {filteredStudents.length} of {students.length} student(s).
      </div>

      {filteredStudents.length === 0 ? (
        <p>No matching student records found for the selected criteria.</p>
      ) : (
        <table className="custom-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#eee' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Name</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Class</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Division</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Attendance %</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Mark %</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => {
              const metrics = studentMetrics[student.id] || { attenPct: '0.0', markPct: '0.0' };
              return (
                <tr key={student.id}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.id}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.class}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.division || 'N/A'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{student.email || 'No Email'}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{metrics.attenPct}%</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{metrics.markPct}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Studentlist;
