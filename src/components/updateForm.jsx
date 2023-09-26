import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllTasks } from '../utils/calls';
import { getToken } from '../utils/common';

const UpdateForm = ({update}) => {
    const today = new Date().toISOString().split("T")[0];
    const [title, setTitle] = useState(update.title);
    const [description, setDescription] = useState(update.description);
    const [date, setDate] = useState(update?.dueDate);
    const [status, setStatus] = useState(update?.status);
    const [tog, setTog] = useState(false);
    const state = ['todo', 'in-progress', 'completed']
    const location = useLocation().pathname.split('/').pop();
    const [path, setPath] = useState(useLocation().pathname);
    const navigate = useNavigate()
    const token = getToken();
    const body = {
        title,
        description,
        dueDate:date,
        status
    }
    const UpdatedHandler = (e)=>{
        e.preventDefault();
        console.log('running oooo')
        if(body.title||body.description||body.dueDate){
        axios.patch(`https://todo-list-api-8vwz.onrender.com/api/v1/tasks/${location}`, body, {headers:{'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}})
        .then((res)=>{
          console.log(res.data);
          getAllTasks();
          setPath((prev)=>prev)
          console.log(path)
          navigate(path);
        }).catch((err)=>console.log('Something went wrong', err.message))
        }
        else{
          console.log('fields cannot be empty')
        }
    }
  return (
    <div className='update-task'>
    <form className='create-task-form' onSubmit={UpdatedHandler}>
        <label htmlFor="title">Title</label>
        <input type="text" name='title' id='title' required value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" required value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <div className='buttons'>
            <div>
                <label htmlFor="date">Due Date</label>
                <input type="date" min={today} id='date' required value={date.split("T")[0]} onChange={(e)=>setDate(e.target.value)} style={{margin:"0px"}}/>
            </div>
            <div name="status" id="status" onClick={()=>setTog(!tog)}>
                    <p style={{backgroundColor:`${status === 'in-progress'?'rgb(223, 132, 6)':status==='completed'?'rgb(6, 141, 74)':'rgb(87, 83, 83)'}`}}>{status}</p>
                    <div className='options' style={{display:`${tog?'block':'none'}`}}>
                    {
                        state.map((item, i)=>{
                            return <option value={item} key={i} onClick={(e)=>setStatus(e.target.value)}>{item}</option>
                        })
                    }
                    </div>
                </div>
        </div>
        <button>Update</button>
      </form>
      </div>
  )
}

export default UpdateForm