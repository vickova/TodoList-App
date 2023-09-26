import React, { useState } from 'react';
import '../App.css';
import Circle from '../components/Circle';
import Homeimage from '../images/todo8.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getToken } from '../utils/common';
import { ErrorToaster, Success } from '../components/Toast';

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  // const [token,setToken] = useState('');
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('')


  const handleSubmit = async(e)=>{
    setLoading(true);
    const token = getToken()
    e.preventDefault();
    console.log('running oooo')
    if(name||email||password){
      if(password === confirm){
    axios.post('https://todo-list-api-8vwz.onrender.com/api/v1/auth/register', {name, email, password})
    .then((res)=>{
      if(res.request.status === 200||res.request.status === 201){
      setLoading(false);
      console.log(res.request.status);
      Success('Redirecting...')
      navigate('/login');
      }
      else{
        ErrorToaster(res.response.data.msg)
      console.log(res.response.data.msg);
      console.log(token)
      // console.log(res.data);
      setLoading(false);
      }
      
      
    }).catch((err)=>{
      console.log(err)}
      )
  }
  else{
    toast.error('Password does not match', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide
      });
    console.log(token)
    // console.log(res.data);
    setLoading(false);
    }
    setLoading(false)
  
  }
  else{
    console.log('All fields must be filled');
    toast.error('Please fill at fields', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      transition: Slide
      });
    console.log(token)
    // console.log(res.data);
    setLoading(false);
    }
    
  
  }
  return (
    <div className='signup home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Start getting things done NOW!</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className='inner'>
          <input type="text" placeholder='Full Name' required onChange={(e)=>setName(e.target.value)}/>
          <input type="email" placeholder='Email Address'required onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Create Password' required onChange={(e)=>setPassword(e.target.value)}/>
          <input type="password" placeholder='Re-write' required onChange={(e)=>setConfirm(e.target.value)}/>
          <div className='home-button'>
          <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="light"
              />
            <button className="submit-btn" onClick={handleSubmit}>
              {!loading ? 'SignUp' : <Loader/>}
            </button>
          </div>
        </div>
      </form>
      <p>Already have an account? <Link to='/login'><span>Sign in.</span></Link></p>
    </div>
  )
}

export default SignUp