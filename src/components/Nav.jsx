import React from 'react';
import { useNavigate, redirect } from 'react-router-dom';
import '../App.css'

const Nav = () => {
  const navigate = useNavigate();
  const CategoryNavigate = ()=>{
    navigate('/tasks')
    navigate('/categories');
  }
  return (
    <nav className='intro'>
        <h2>TaskSwift</h2>
        <ul>
          <li onClick={CategoryNavigate}>Categories</li>
          <li onClick={()=>navigate('/tasks')}>Tasks</li>
          <h4 onClick={()=>navigate('/login')}>Logout</h4>
        </ul>
    </nav>
  )
}

export default Nav