import React from 'react';
import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Nav from './components/Nav';
import Loader from './components/Loading';
import UpdateForm from './components/updateForm';
import Notfound from './pages/Notfound';
const Tasks = React.lazy(()=>import('./pages/Tasks'));
const Categories = React.lazy(()=>import('./pages/Categories'));


function App() {
  const [individualcategories, setIndividualCategories] = useState({});
  const [loadedtask, setLoadedTask] = useState({});
  const [update, setUpdate] = useState({});
  const [opener, setOpener] = useState(false)
  
  return (
    <div className="App">
      <Nav/>
      <React.Suspense fallback={<Loader/>}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login loadedtask={loadedtask} setLoadedTask={setLoadedTask}/>}/>
        <Route path='/tasks/*' element={<Tasks loadedtask={loadedtask} setLoadedTask={setLoadedTask} setUpdate={setUpdate} setOpener={setOpener} opener={opener}/>}/>
        <Route path='/tasks/:id' element={<UpdateForm update={update} setLoadedTask={setLoadedTask} setOpener={setOpener} opener={opener}/>}/>
        <Route path='/categories/*' exact element={<Categories setOpener={setOpener} opener={opener} setUpdate={setUpdate} individualcategories={individualcategories} setIndividualCategories={setIndividualCategories}/>}/>
        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </React.Suspense>
    </div>
  );
}

export default App;
