import React, {useState} from 'react';
import Circle from '../components/Circle';
import Button from '../components/Button';
import Homeimage from '../images/todo8.png';
import { Link, useNavigate } from 'react-router-dom';

async function loginUser(credentials) {
  return fetch('https://todo-list-api-8vwz.onrender.com/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
    .catch(err => console.log(err))
 }

const Login = ({Token,setToken}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pathname,setPathname] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('running ooo')
    const token = await loginUser({
      email,
      password
    });
    // const token = {
    //   email:'olumideronke@gmail.com',
    //   password:'secret',
    //   token:'1234'
    // }
    setToken(token);
    console.log(token);
    console.log('SUbmitted ooooo');
  }
  const SubmitButtonHandler = ()=>{
    console.log(Token)
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
            <Link to='/tasks'>
            <Button text='Sign In' onClick={SubmitButtonHandler}/>
            </Link>
          </div>
        </div>
      </form>
      <p>New member? <Link to='/signup'><span>Register now.</span></Link></p>
    </div>
  )
}

export default Login