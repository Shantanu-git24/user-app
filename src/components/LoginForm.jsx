import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, fetchUserDetails } from '../features/authSlice';  // Import both actions
import { useNavigate } from 'react-router-dom';
import { extractUserIdFromToken } from '../utils/tokenHelpers';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token, user } = useSelector((state) => state.auth);  // Get token and user from state

  // After successful login, fetch user details using the token
  useEffect(() => {
    if (token && !user) {
      const userId = extractUserIdFromToken(token);  // Extract user ID from the token
      dispatch(fetchUserDetails(userId));  // Fetch user details after login
    }
  }, [token, user, dispatch]);

  // Once user details are fetched, redirect to the dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values) => {
    dispatch(loginUser(values));  // Dispatch login action
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Login</div>
            <div className="card-body">
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" className="text-danger" />
                    </div>

                    {/* Display any API errors */}
                    {error && <div className="alert alert-danger">{error}</div>}

                    <div className="text-center">
                      <button type="submit" className="btn btn-custom" disabled={isSubmitting || loading}>
                        {loading ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
