import React from 'react'
import Login from '../pages/Login';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../utils/common';

const Protected = ({children}) => {
  const token = getToken();
  let flag = false;
  token?flag = true:flag=true
  return flag;
}

export default Protected