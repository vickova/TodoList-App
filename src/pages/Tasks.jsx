import React, {useEffect, useState} from 'react';
import SingleTask from '../components/SingleTask';
import '../App.css'
import { getToken, getUser } from '../utils/common';
import { getAllCategories, getAllTasks } from '../utils/calls';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Tasks = ({loadedtask, setLoadedTask, setUpdate, setOpener}) => {
  const location = useLocation().pathname;
  const [loadedcategories, setLoadedCategories] = useState({})
  const token = getToken();
  const [createtask, setCreateTask] = useState(false)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDuedate] = useState('');
    const user = getUser();
    const body = {
      title:title,
      description:description,
      dueDate:dueDate
    }
    let initials = ''
    if(location!=='/login'|| location!=='/signup'){
    initials = user?.name.split(' ')[0];
    console.log(initials)
    }

   useEffect(()=>{
    const AllCategories = async()=>{
      const GetAllCategories = await getAllCategories(setLoadedCategories);
      return GetAllCategories
    }
    AllCategories();
  },[])
   useEffect(()=>{
    axios.get('https://todo-list-api-8vwz.onrender.com/api/v1/tasks', {headers:{'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      setLoadedTask(res.data);
    }).catch((err)=>err.message)
  
  },[])

  const TasVal = Object.values(loadedtask);
  const CatVal = Object.values(loadedcategories);
  return (
    <div className='tasks'>
      <p style={{fontWeight:'500', marginBottom:'.5rem', fontSize:'1.2rem'}}>Welcome <b>{`${initials}`}</b>, here are your tasks</p>
      {TasVal.length!==0?
        <div className='task-cover'>
        {
            Object.keys(loadedtask).map((task, i)=>{
                return<SingleTask setOpener={setOpener} setUpdate={setUpdate} setLoadedTask={setLoadedTask} createtask={createtask} setCreateTask={setCreateTask} task={loadedtask[task]} key={i} category={CatVal.map((item)=>{
                  if(item._id === TasVal[i].category){
                    return item.name
                  }
                  return
                  })}/>
            })
        }
        </div>:
        <div style={{textAlign:'center',height:'50vh', margin:'auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <div>
          <h3>You do not have any task yet</h3>
          <p>Kindly go to <a href="/categories">categories</a> to create your category and your tasks</p>
          </div>
        </div>
      }
    </div>
  )
  }


export default Tasks