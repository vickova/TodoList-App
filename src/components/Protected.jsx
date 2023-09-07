import React from 'react'
import Login from '../pages/Login';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({token, children}) => {
  console.log(token)
  console.log('Heyy')
  let location = useLocation();

  if(!token) {
      return <Navigate to="/login" state={{ from: location}} replace />
  }
  return children
}

export default Protected