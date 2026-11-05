import { Button } from 'react-bootstrap'; 
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';

const Myprofile = () => {
  const [myProfile, setMyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    const navigate=useNavigate();

  useEffect(() => {
    const fetchMyProfile = async () => {
      try {
        // 1. Read the saved email from localStorage instead of a token
        const savedEmail = localStorage.getItem("userEmail");

        if (!savedEmail) {
          throw new Error("No active user session email found. Please log in again.");
        }

        // 2. Pass the email directly as a query parameter in the URL string
        const response = await fetch(`https://localhost:7254/api/Student/GetProfileByEmail?email=${encodeURIComponent(savedEmail)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error("Failed to load your profile view data.");
        }

        const data = await response.json();
        setMyProfile(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyProfile();
  }, []);

  if (loading) return <div className="p-4 text-center"><Spinner animation="border" /> Fetching your profile...</div>;
  if (error) return <div className="alert alert-danger m-4">Error: {error}</div>;

  return (
    <Container className="py-4">
      <Card style={{ maxWidth: '650px' }} className="shadow mx-auto">
        <Card.Header className="bg-success text-white py-3">
          <h4 className="mb-0"><i className="bi bi-person-workspace me-2"></i> Student Profile Portal</h4>
        </Card.Header>
        <Card.Body>
          <div className="text-center mb-4">
            <div className="avatar-placeholder rounded-circle bg-light d-inline-flex align-items-center justify-content-center p-3 mb-2 shadow-sm">
              <i className="bi bi-person-badge text-success" style={{ fontSize: '4.5rem' }}></i>
            </div>
            <h3>Welcome back, {myProfile.name}!</h3>
            
          </div>

          <table className="table table-hover border">
            <tbody>
              <tr>
                <th className="bg-light" style={{ width: '35%' }}> ID</th>
                <td>{myProfile.id}</td>
              </tr>
              <tr>
                <th className="bg-light">Full Name</th>
                <td>{myProfile.name}</td>
              </tr>
              <tr>
                <th className="bg-light">Assigned Class Room</th>
                <td>Class {myProfile.class || 'N/A'}</td>
              </tr>
              <tr>
                <th className="bg-light">Division Section</th>
                <td>{myProfile.division || 'Unassigned'}</td>
              </tr>
              <tr>
                <th className="bg-light">Contact Number</th>
                <td>{myProfile.phone || 'No phone registered'}</td>
              </tr>
              <tr>
                <th className="bg-light">Official Email</th>
                <td>{myProfile.email}</td>
              </tr>
              <tr> 
              <td></td>
              <td><Button variant="primary" type="submit" className="w-100 mt-3"  onClick={() => navigate(`/Editstudentprofile/${myProfile.id}`)}>
               EDIT PROFILE
              </Button></td>
             </tr>
            </tbody>
          </table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Myprofile;
