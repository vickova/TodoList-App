import React, {useState} from 'react';
import Circle from '../components/Circle';
import Button from '../components/Button';
import Homeimage from '../images/todo8.png';
import { Link, useNavigate, redirect } from 'react-router-dom';
import { setUserSession } from '../utils/common';



const Login = ({Token,setToken, auth, setAuth}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pathname,setPathname] = useState('');
  
  const navigate = useNavigate()

  async function loginUser(credentials) {
    return fetch('https://todo-list-api-8vwz.onrender.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
      .catch(err => console.log(err))
   }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('running ooo')
    if(email || password){
    const token = await loginUser({
      email,
      password
    });
 
    setToken(token);
    setAuth(token);
    console.log(token)
    console.log('set')
    if(token){
      console.log('tasks')
      console.log(token)
      setAuth(token);
      
    }
    else{
      console.log('login')
      navigate('/login');
    }
  }else{
  console.log('Email and Password cannot be empty')
  }

  }
  const SubmitButtonHandler = ()=>{
    
  }
  return (
    <div className='login home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Welcome Back.</h2>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <input type="email" placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          <div className='home-button'>
            {/* <Link to={`${Token?'/tasks':'/login'}`}> */}
            <Button text='Sign In'/>
            {/* </Link> */}
          </div>
        </div>
      </form>
      <p>New member? <Link to='/signup'><span>Register now.</span></Link></p>
    </div>
  )
}

export default Login