import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../features/authSlice';
import '../style.css';

const OTPVerificationForm = () => {
  const dispatch = useDispatch();
  const { loading, error, emailVerified } = useSelector((state) => state.auth);

  // Validation schema for OTP form
  const OTPSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    otp: Yup.number().required('OTP is required'),
  });

  // Handle OTP form submission
  const handleSubmit = (values) => {
    dispatch(verifyEmail(values));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">Email Verification</div>
            <div className="card-body">
              {emailVerified ? (
                <div className="alert alert-success">Your email has been verified successfully!</div>
              ) : (
                <Formik
                  initialValues={{ email: '', otp: '' }}
                  validationSchema={OTPSchema}
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
                        <label htmlFor="otp">OTP</label>
                        <Field name="otp" type="number" className="form-control" />
                        <ErrorMessage name="otp" component="div" className="text-danger" />
                      </div>

                      {error && <div className="alert alert-danger">{error}</div>}

                      <div className="text-center">
                        <button type="submit" className="btn btn-custom" disabled={isSubmitting || loading}>
                          {loading ? 'Verifying...' : 'Verify Email'}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationForm;
