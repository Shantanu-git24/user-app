import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../features/authSlice';  // Import updateUser action
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userDetails, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    state: '',
    country: '',
    phone: '',
    address: '',
    bio: '',
    profile_img: null,  // For file uploads
    banner_img: null,  // For file uploads
  });

  useEffect(() => {
    if (user) {
      dispatch(getUserDetails(user.id));  // Fetch user details when the component loads
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name || '',
        username: userDetails.username || '',
        email: userDetails.email || '',
        city: userDetails.city || '',
        state: userDetails.state || '',
        country: userDetails.country || '',
        phone: userDetails.phone || '',
        address: userDetails.address || '',
        bio: userDetails.bio || '',
        profile_img: null,  // Reset to null for editing
        banner_img: null,  // Reset to null for editing
      });
    }
  }, [userDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, [name]: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('user_id', user.id);
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        updatedData.append(key, formData[key]);
      }
    });

    dispatch(updateUser(updatedData)).then(() => {
      // Redirect back to dashboard after successful update
      navigate('/dashboard');
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">Update Profile</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Profile Image</label>
              <input
                type="file"
                name="profile_img"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Banner Image</label>
              <input
                type="file"
                name="banner_img"
                onChange={handleFileChange}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={() => navigate('/dashboard')} className="btn btn-secondary ml-2">
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
