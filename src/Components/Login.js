import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, } from '../Redux/Slice/LoginSlice';
import { json, useNavigate } from 'react-router-dom';
import './Styles/Login.css'
import Button from '@mui/material/Button';

function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [values, setValue] = useState({
    email: '',
    password: ''
  });

  // const logindaata = useSelector((state) => state.Loginreducer.getlogindata); // Corrected name
  // const somthing=dispatch(logindata)

  // console.log('logindaata', logindaata);

  const handleLogin = () => {
    localStorage.setItem('user',JSON.stringify(values))
    dispatch(signup(values));
    navigate('/home')
  };

  const handleChange = (e) => {
    e.preventDefault()
    setValue({
      ...values,
      [e.target.name]: e.target.value
    });
  };


  return (
    <div className='main'>
      <div className='Login-form-div'>
        <h1>Login</h1>
        <form onSubmit={(e) => handleLogin()} className='Login-form'>
          <input placeholder='email' type='text' name='email' className='form-input' value={values.email} onChange={handleChange} required/>
          <input placeholder='password' type='password' name='password' className='form-input' value={values.password} onChange={handleChange} required />
          <Button type='submit' className='submit-btn' variant="contained" >Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
