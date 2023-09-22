import React, { useState } from 'react';
import Toggle from './Toggle';
import ToggleIcon from '../images/chevron.svg';
import Delete from '../images/delete-icon.svg';
import Edit from '../images/edit-icon.svg';
import dateFormat from 'dateformat';
import { DeleteSingleTask } from '../utils/calls';
import { useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import UpdateForm from './updateForm';

const SingleTask = ({task, category, setUpdate}) => {
    const [toggle, setToggle] = useState(false);
    const [tog, setTog] = useState(false);
    const [state, setState] = useState(task.status)
    const status = ['todo', 'in-progress', 'completed']
    const navigate = useNavigate();
    const UpdateTaskHandler = (task)=>{
        setUpdate(task);
        navigate(`/tasks/${task._id}`)
    }
  return (
    <div className='single-task'>
        <div className='toggle' onClick={()=>setToggle(!toggle)}>
            <div>
                <h3>{task.title}</h3>
                <div className='category' style={{textDecoration:`${state==='completed'?'line-through':'none'}`}}>
                    <h4>{category}</h4>
                    <p>{task.description}</p>
                </div>
            </div>
            <img src={ToggleIcon} alt="toggle-icon" style={{transform:`${toggle?'rotate(90deg)':'rotate(0deg)'}`}}/>
        </div>
        <Toggle toggle={toggle}>
        <div className='dates'>
            <div className='end-date'>
                <p>End Date</p>
                <h4>{dateFormat(task.dueDate, "dddd, mmmm dS, yyyy")}</h4>
            </div>
        </div>
        <div className='buttons'>
            <div className='action-button'>
                <img src={Edit} alt="edit-button" onClick={()=>UpdateTaskHandler(task)}/>
                <img src={Delete} alt="delete-button" onClick={()=>DeleteSingleTask(task._id)}/>
            </div>
            <div name="status" id="status" onClick={()=>setTog(!tog)}>
                <p style={{backgroundColor:`${state === 'in-progress'?'rgb(223, 132, 6)':state==='completed'?'rgb(6, 141, 74)':'rgb(87, 83, 83)'}`}}>{state}</p>
                {/* <div className='options' style={{display:`${tog?'block':'none'}`}}>
                {
                    status.map((item, i)=>{
                        return <option value={item} key={i} onClick={(e)=>setState(e.target.value)}>{item}</option>
                    })
                }
                </div> */}
            </div>
        </div>
        </Toggle>
    </div>
  )
}

export default SingleTask