import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Categories from './pages/Categories';
import Protected from './components/Protected';


function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  console.log(tokenString)
  const userToken = JSON.parse(tokenString);
  console.log(userToken)
  return userToken?.token
}

function App() {

  const token = getToken();
  console.log(token)
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login Token={token} setToken={setToken}/>}/>
        <Route path='/tasks' element={<Protected token={token}><Tasks/></Protected>}/>
        <Route path='/categories' element={<Categories/>}/>
      </Routes>
    </div>
  );
}

export default App;
