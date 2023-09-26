import React, {useEffect, useState} from 'react';
import SingleTask from '../components/SingleTask';
import '../App.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { getToken } from '../utils/common';
import { getAllCategories, getAllTasks } from '../utils/calls';
import SingleCategories from './SingleCategories';
import IndividualCategories from '../components/IndividualCategories';
import axios from 'axios';
import Plus from '../images/plus-icon.svg'
import Loader from '../components/Loader';
import Close from '../images/close.svg';

const Categories = ({auth, setID, ID, individualcategories, setIndividualCategories, setUpdate, categlist, setCategList}) => {
  const [open, setOpen] = useState(false);
  const [loadedtask, setLoadedTask] = useState({})
  const [loadedcategories, setLoadedCategories] = useState({});
  const [createlist, setCreateList] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const token = getToken();
    const today = new Date().toISOString().split("T")[0];
    const pathname = useLocation().pathname;
    const [name, setName] = useState(categlist.name);
    const [desc, setDesc] = useState(categlist.description);
    console.log(categlist);
    console.log(desc)
    console.log(name)
    const body = {
      name:title,
      description:description
    }
    const update = {
      name:name,
      description:desc
    }
   useEffect(()=>{
    const AllCategories = async()=>{
      const GetAllCategories = await getAllCategories(setLoadedCategories);
      return GetAllCategories
    }
    AllCategories();
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
    }).catch((err)=>console.log('Something went wrong', err.message))
    }
    else{
      console.log('fields cannot be empty')
    }
  }
  const UpdatedCategoryHandler = (e)=>{
    console.log(categlist)
    e.preventDefault();
    console.log('updating categ oooo')
    if(update.name||update.description){
    axios.patch(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${categlist._id}`, update, {headers:{'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data);
      console.log(categlist)
      setOpen(false);
    }).catch((err)=>console.log('Something went wrong', err.message))
    }
    else{
      console.log('fields cannot be empty')
    }
}
  

  const TasVal = Object.values(loadedtask);
  const CatVal = Object.values(loadedcategories);
  
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
      <form className='create-task-form' style={{display:open?'block':'none'}} onSubmit={UpdatedCategoryHandler}>
        <div className='close'>
        <img src={Close} alt="exit" onClick={()=>setOpen(false)}/>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" value={desc} onChange={(e)=>setDesc(e.target.value)} required/>

        <button onClick={()=>console.log(body)}>Update</button>
      </form>
        <div className='task-cover'>
        {loadedcategories?
            Object.keys(loadedcategories).map((task, i)=>{
                return<IndividualCategories categlist={categlist} setCategList={setCategList} open={open} setOpen={setOpen} setUpdate={setUpdate} categories={loadedcategories[task]} key={i} setID={setID} ID={ID} setIndividualCategories={setIndividualCategories}/>
            }):<Loader/>
        }
        </div>
    </div>
    </div>
  )
  }


export default Categories