import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from '../Redux/Slice/LoginSlice';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().required("Email is a required field").email("Invalid email format"),
        password: Yup.string().required('Password is required')
    });

    // Initial form values
    const initialValues = {
        name: '',
        email: '',
        password: '',
    };

    // Submit function
    const handleSignUp = (values) => {
        localStorage.setItem('user', JSON.stringify(values));
        dispatch(signup(values));
        navigate('/home');
    };

    // const handleSignUp = async (values) => {
    //     console.log(values)
    //     try {
    //       const response = await axios.post('http://localhost:5000/register', values, {
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //       });
      
    //       // Handle the response as needed
    //       console.log('Sign-up successful:', response.data);
      
    //       // You may choose to store the user data in local storage or dispatch an action
    //       // localStorage.setItem('user', JSON.stringify(response.data));
    //       // dispatch(signupSuccess(response.data));
      
    //       // Redirect to the home page or perform any other necessary actions
    //     //   navigate('/home');
    //     } catch (error) {
    //       console.error('Error signing up:', error);
      
    //       // Handle the error, show a message, etc.
    //     }
    //   };

    return (
        <div className="main">
            <div className="Login-form-div">
                <h1>SignUp</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSignUp}
                >
                    <Form className="Login-form">
                        <div className='field'>
                            <label htmlFor="name">Name</label>
                            <Field type="text" id="name" name="name" className="form-input" />
                            <ErrorMessage name="name" component="div" style={{ color: "red" }} />
                        </div>

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
                                SignUp
                            </Button>
                            <Link to={'/'}>
                                <Button type="submit" className="submit-btn" variant="outlined" style={{ marginTop: '5px' }}>
                                    SignIn
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Register;
