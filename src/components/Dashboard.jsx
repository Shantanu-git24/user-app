import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../features/authSlice';  // Import the getUserDetails action
import { useNavigate } from 'react-router-dom';
import '../style.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userDetails, loading, error } = useSelector((state) => state.auth);

  // Ensure we fetch user details when the component loads
  useEffect(() => {
    if (user && !userDetails) {  // If user exists and userDetails are not yet fetched
      dispatch(getUserDetails(user.id));  // Fetch user details after login
    }
  }, [dispatch, user, userDetails]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!userDetails) {
    return <div>No user details available. Please update your profile.</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Dashboard</div>
        <div className="card-body">
          <div>
            <h2>Welcome, {userDetails.name}</h2>
            <p><strong>Email:</strong> {userDetails.email}</p>
            <p><strong>Username:</strong> {userDetails.username}</p>
            <p><strong>Role:</strong> {userDetails.role === '0' ? 'User' : userDetails.role === '1' ? 'Creator' : 'Studio'}</p>
            {/* Button to navigate to the Update Profile page */}
            <button onClick={() => navigate('/update-profile')} className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
