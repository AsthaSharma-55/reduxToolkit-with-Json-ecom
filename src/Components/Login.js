import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../Redux/Slice/LoginSlice';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { SignInData } = useSelector((state) => state.Loginreducer);
  console.log("SignInData", SignInData)
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });


  // Initial form values
  const initialValues = {
    email: '',
    password: '',
  };

  // Submit function
  const handleLogin =  (values) => {
     dispatch(signIn(values)); 
  };
  
  useEffect(() => {
    // Check for changes in SignInData
    if (SignInData?.user) {
      navigate('/home');
    }
  }, [SignInData, navigate]);
  

  return (
    <div className="main">
      <div className="Login-form-div">
        <h1>Login</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
          <Form className="Login-form">
            <div className='field'>
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" className="form-input" />
              <ErrorMessage name="email" component="div" style={{ color: "red" }} />
            </div>

            <div className='field'>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" className="form-input" />
              <ErrorMessage name="password" component="div" style={{ color: "red" }} />
            </div>

            <div className='field'>
              <Button type="submit" className="submit-btn" variant="contained">
                Login
              </Button>
              <Link to={'/register'}>
                <Button type="submit" className="signup-btn" variant="outlined" style={{ marginTop: "5px" }}>
                  SignUp
                </Button>
              </Link>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
