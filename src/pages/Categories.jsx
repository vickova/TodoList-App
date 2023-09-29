import React, {useEffect, useState} from 'react';
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/common';
import { getAllCategories } from '../utils/calls';
import IndividualCategories from '../components/IndividualCategories';
import axios from 'axios';
import Plus from '../images/plus-icon.svg'
import Loader from '../components/Loader';
import Close from '../images/close.svg';

const Categories = ({auth, setID, ID, individualcategories, setIndividualCategories, setUpdate, opener, setOpener}) => {
  const [categlist, setCategList] = useState({})
  console.log(categlist)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const [loadedtask, setLoadedTask] = useState({})
  const [loadedcategories, setLoadedCategories] = useState({});
  const [createlist, setCreateList] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = getToken();
    const pathname = useLocation().pathname;

    const body = {
      name:title,
      description:description
    }
  
   useEffect(()=>{
    if(!sessionStorage.getItem("token")){
      navigate("/login");
    }else{
    const AllCategories = async()=>{
      const GetAllCategories = await getAllCategories(setLoadedCategories);
      return GetAllCategories
    }
    AllCategories();
  }
  },[])

  const createCategoryTaskHandler = (e)=>{
    e.preventDefault();
    console.log('running oooo')
    if(body.name||body.description){
    axios.post(`https://todo-list-api-8vwz.onrender.com/api/v1/categories`, body, {headers:{'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data)
      setCreateList(false);
      navigate('/categories');
      getAllCategories(setLoadedCategories)
    }).catch((err)=>console.log('Something went wrong', err.message))
    }
    else{
      console.log('fields cannot be empty')
    }
  }
  

  console.log(loadedcategories)
  return (
    <div className='single-category-section'>
      
    <div className='tasks'>
    <div className='plus-icon' onClick={()=>setCreateList(!createlist)} style={{display:`${pathname==='/categories'?'flex':'none'}`}}>
          <h3>Add new category</h3>
          <img src={Plus} alt="plus-icon"/>
      </div>
      <form className='create-task-form' style={{display:createlist?'block':'none'}} onSubmit={createCategoryTaskHandler}>
        <div className='close'>
          <img src={Close} alt="exit" onClick={()=>setCreateList(false)}/>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' onChange={(e)=>setTitle(e.target.value)} required/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" onChange={(e)=>setDescription(e.target.value)} required/>

        <button onClick={()=>console.log(body)}>Create</button>
      </form> 
        <div className='task-cover'>
        {loadedcategories?
            Object.keys(loadedcategories).map((task, i)=>{
                return<IndividualCategories categlist={categlist} setCategList={setCategList} setOpener={setOpener} opener={opener} open={open} setOpen={setOpen} setUpdate={setUpdate} categories={loadedcategories[task]} loadedcategories={loadedcategories} setLoadedCategories={setLoadedCategories} key={i} setID={setID} ID={ID} setIndividualCategories={setIndividualCategories}/>
            }):<Loader/>
        }
        </div>
    </div>
    </div>
  )
  }


export default Categories