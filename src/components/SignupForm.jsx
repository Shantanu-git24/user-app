import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import '../style.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);  // Get error from Redux state

  // Update validation schema to include number validation for role
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    role: Yup.number().oneOf([0, 1, 2], 'Invalid role').required('Role is required'),  // Role as a number
  });

  const handleSubmit = (values) => {
    dispatch(signupUser(values)).then((result) => {
      if (!result.error) {
        // Redirect to OTP verification page if signup is successful
        navigate('/verify-email');
      }
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Sign Up</div>
            <div className="card-body">
              <Formik
                initialValues={{ name: '', username: '', email: '', password: '', role: '' }}
                validationSchema={SignupSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage name="name" component="div" className="text-danger" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <Field name="username" type="text" className="form-control" />
                      <ErrorMessage name="username" component="div" className="text-danger" />
                    </div>

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

                    {/* Role as a number input */}
                    <div className="form-group">
                      <label htmlFor="role">Role (0 for User, 1 for Creator, 2 for Studio)</label>
                      <Field name="role" type="number" className="form-control" min="0" max="2" />
                      <ErrorMessage name="role" component="div" className="text-danger" />
                    </div>

                    {error && <div className="alert alert-danger">{error}</div>}  {/* Display error */}

                    <div className="text-center">
                      <button type="submit" className="btn btn-custom" disabled={isSubmitting || loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
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

export default SignupForm;
