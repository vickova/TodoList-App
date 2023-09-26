import React, {useState} from 'react';
import Circle from '../components/Circle';
import Homeimage from '../images/todo8.png';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, setUserSession } from '../utils/common';
import Loader from '../components/Loader';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Success, ErrorToaster } from '../components/Toast';



const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate()


  const handleSubmit = async(e)=>{
    setLoading(true);
    const token = getToken()
    e.preventDefault();
    console.log('running oooo')
    console.log(token)
    axios.post('https://todo-list-api-8vwz.onrender.com/api/v1/auth/login', {email, password})
    .then((res)=>{
      if(res.request.status === 200||res.request.status === 201){
      
      setUserSession(res.data.token, res.data.user);
      setLoading(false);
      console.log(res.request.status);
      Success('Logging you in');
      navigate('/tasks')
      }
      else{
        ErrorToaster(res.response.data.msg)
      console.log(res.response.data.msg);
      console.log(token)
      setLoading(false);
      }
      
      
    }).catch((err)=>{
      console.log(err)}
      )
    
  }
  return (
    <div className='login home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Welcome Back.</h2>
      <form>
        <div className='inner'>
          <input type="email" placeholder='Email Address' onChange={(e)=>setEmail(e.target.value)}/>
          <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
          <div className='home-button'>
            {/* <Link to={`${Token?'/tasks':'/login'}`}> */}
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