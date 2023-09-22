import React, {useState} from 'react';
import Circle from '../components/Circle';
import Button from '../components/Button';
import Homeimage from '../images/todo8.png';
import { Link, useNavigate, redirect } from 'react-router-dom';
import { getToken, setUserSession } from '../utils/common';
import Loader from '../components/Loader';
import axios from 'axios';



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false)
  // const [token,setToken] = useState('');
  const navigate = useNavigate()


  const handleSubmit = async(e)=>{
    setLoading(true);
    const token = getToken()
    e.preventDefault();
    console.log('running oooo')
    console.log(token)
    axios.post('https://todo-list-api-8vwz.onrender.com/api/v1/auth/login', {email, password})
    .then((res)=>{
      setUserSession(res.data.token, res.data.user);
      console.log(token)
      // console.log(res.data);
      console.log(getToken())
      navigate('/tasks');
      setLoading(false)
    }).catch((err)=>console.log('Something went wrong', err.message))
    
  }
  return (
    <div className='login home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Welcome Back.</h2>
      <form action="" onSubmit={handleSubmit}>
        <div className='inner'>
          <input type="email" placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          <div className='home-button'>
            {/* <Link to={`${Token?'/tasks':'/login'}`}> */}
            <button className="submit-btn" onClick={handleSubmit}>
              {!loading ? 'Login' : <Loader/>}
            </button>
            {/* </Link> */}
          </div>
        </div>
      </form>
      <p>New member? <Link to='/signup'><span>Register now.</span></Link></p>
    </div>
  )
}

export default Login