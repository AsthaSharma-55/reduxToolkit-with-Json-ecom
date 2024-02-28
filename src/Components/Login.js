import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../Redux/Slice/LoginSlice';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';
import { Link } from 'react-router-dom';
import { FiLoader } from "react-icons/fi";
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { SignInData } = useSelector((state) => state.Loginreducer);
  const [loading, setloading] = useState(false)
  console.log("SignInData", SignInData)
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });


  // Initial form values
  const initialValues = {
    email: 'asthasharma11@yopmail.com',
    password: 'astha@123',
  };

  // Submit function
  const handleLogin = async (values) => {
    setloading(true)
   const reponsedata=await dispatch(signIn(values))
   console.log("responseData",reponsedata.payload.user)
   if(reponsedata.payload.user){
    navigate('/home');
    toast.success("login successfully!!"); 
    setloading(false)
   }else{
    toast.error("error while login!!");
    setloading(false) 
   }    
  };

  return (
    <div className="main">
      {loading == false ?
        <div className="Login-form-div">
          <h1>Login</h1>
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleLogin}>
            <Form className="Login-form">
              <div className='field'>
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" className="form-input" placeholder="enter email" />
                <ErrorMessage name="email" component="div" style={{ color: "red" }} />
              </div>

              <div className='field'>
                <label htmlFor="password">Password</label>
                <Field type="password" id="password" name="password" className="form-input" placeholder="enter Password" />
                <ErrorMessage name="password" component="div" style={{ color: "red" }} />
              </div>

              <div className='field'>
                <button type="submit" className="submit-btn" variant="contained" >
                  Login
                </button>
                <Link to={'/register'}>
                  <button type="submit" className="signup-btn" variant="outlined" style={{ marginTop: "5px" }}>
                    SignUp
                  </button>
                </Link>
              </div>
            </Form>
          </Formik>
        </div>
        :
        <div className="loading-overlay">
          <FiLoader className="loading-icon" />
        </div>
      }
    </div>
  );
}

export default Login;
