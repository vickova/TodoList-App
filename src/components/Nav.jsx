import React, {useState} from 'react';
import { useNavigate, redirect, useLocation } from 'react-router-dom';
import '../App.css';
import Avatar from '../images/avatar.svg';
import { getUser } from '../utils/common';
import { getAllCategories } from '../utils/calls';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const [open, setOpen] = useState(false)
  let initials = ''
  // const user = getUser();
  console.log(location)
  // if(location!=='/login'|| location!=='/signup'){
  //   initials = user?.name.split(' ').map((item)=>item[0]);
  //   initials = initials?.join('')
  //   console.log(initials)
  //   console.log('Hello')
  // }
  // console.log(initials)
  // console.log(user)
  const CategoryNavigate = ()=>{
    navigate('/tasks')
    navigate('/categories');
  }
  return (
    <nav className='intro' style={{display:location === '/'||location === '/login'||location === '/signup'?'none':'flex'}}>
        <h2>TaskSwift</h2>
        <ul>
          <li onClick={CategoryNavigate}>Categories</li>
          <li onClick={()=>navigate('/tasks')}>Tasks</li>
          <div className='avatar' onClick={()=>setOpen(!open)}>
            <h3 className="avat">{initials}</h3>
          <h4 onClick={()=>navigate('/login')} style={{display:open?'block':'none'}}>Logout</h4>
          </div>
        </ul>
    </nav>
  )
}

export default Nav