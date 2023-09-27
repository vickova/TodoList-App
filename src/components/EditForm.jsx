import React, {useState} from 'react';
import Close from '../images/close.svg';
import { getToken } from '../utils/common';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const EditForm = ({createlist,setCreateList}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDuedate] = useState('');
    const today = new Date().toISOString().split("T")[0];
    const location = useLocation().pathname.split('/').pop();
    const token = getToken();
    const body = {
      title:title,
      description:description,
      dueDate:dueDate
    }
    
    const createCategoryTaskHandler = (e)=>{
      e.preventDefault();
      console.log('running oooo')
      if(body.title||body.description||body.dueDate){
      axios.post(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${location}`, body, {headers:{'Content-Type': 'application/json',
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
  return (
    <form className='create-task-form' style={{display:createlist?'block':'none'}} onSubmit={createCategoryTaskHandler}>
      <div className='close'>
          <img src={Close} alt="exit" onClick={()=>setCreateList(false)}/>
        </div>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' id='title' onChange={(e)=>setTitle(e.target.value)} required/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" onChange={(e)=>setDescription(e.target.value)} required/>
        <label htmlFor="date">Due Date</label>
        <input type="date" min={today} id='date' onChange={(e)=>setDuedate(e.target.value)} required/>
        <button>Create</button>
      </form>
  )
}

export default EditForm