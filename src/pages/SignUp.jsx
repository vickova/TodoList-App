import React from 'react';
import '../App.css';
import Circle from '../components/Circle';
import Button from '../components/Button';
import Homeimage from '../images/todo8.png';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='signup home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Start getting things done NOW!</h2>
      <form action="">
        <div>
          <input type="text" placeholder='Full Name'/>
          <input type="email" placeholder='Email Address'/>
          <input type="password" placeholder='Create Password'/>
          <input type="password" placeholder='Re-write'/>
          <div className='home-button'>
            {/* <Link to='/tasks'> */}
            <Button text='Sign Up'/>
            {/* </Link> */}
          </div>
        </div>
      </form>
      <p>Already have an account? <Link to='/login'><span>Sign in.</span></Link></p>
    </div>
  )
}

export default SignUp