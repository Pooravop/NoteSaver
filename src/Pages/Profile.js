import React, { useContext, useEffect, useState } from 'react';
import noteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Profile = (props) => {
  const { safeShowAlert } = useContext(noteContext);
  const { mode } = props;
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          safeShowAlert('Please login to view your profile', 'warning');
          navigate('/login');
          return;
        }

        const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${backendUrl}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token');
            safeShowAlert('Session expired. Please login again.', 'danger');
            navigate('/login');
          } else {
            const errorData = await response.json().catch(() => ({}));
            safeShowAlert(errorData.error || `Failed to fetch profile: ${response.status}`, 'danger');
          }
          return;
        }

        const json = await response.json();
        if (json.success && json.user) {
          setUserData(json.user);
        } else {
          safeShowAlert(json.error || 'Failed to retrieve user data.', 'danger');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        safeShowAlert('An error occurred while fetching your profile.', 'danger');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, safeShowAlert]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    safeShowAlert('Logged out successfully', 'success');
    navigate('/login');
  };

  return (
    <motion.div
      className="container my-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="card p-4 shadow-sm"
        style={{
          backgroundColor: mode === 'dark' ? 'rgb(9 48 80)' : 'white',
          color: mode === 'dark' ? 'white' : '#042743',
        }}
      >
        <h2 className="card-title text-center mb-4">
          <i className="fas fa-user-circle me-2"></i>Your Profile
        </h2>

        {isLoading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading profile...</span>
            </div>
            <p className="lead mt-3">Loading your profile data...</p>
          </div>
        ) : userData ? (
          <div>
            <div className="mb-3">
              <strong>Name:</strong> {userData.name}
            </div>
            <div className="mb-3">
              <strong>Email:</strong> {userData.email}
            </div>
            <div className="mb-4">
              <strong>Joined:</strong> {new Date(userData.date).toLocaleDateString()}
            </div>
            <div className="d-grid">
              <motion.button
                onClick={handleLogout}
                className="btn btn-danger btn-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-sign-out-alt me-2"></i>Logout
              </motion.button>
            </div>
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="lead">Unable to load profile data.</p>
            <p>Please ensure you are logged in and try again.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Profile; 