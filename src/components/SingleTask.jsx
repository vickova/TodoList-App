import React, { useState } from 'react';
import Toggle from './Toggle';
import ToggleIcon from '../images/chevron.svg';
import Delete from '../images/delete-icon.svg';
import Edit from '../images/edit-icon.svg';

const SingleTask = ({task}) => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className='single-task'>
        <div className='toggle' onClick={()=>setToggle(!toggle)}>
            <div>
                <h3>{task.title}</h3>
                <div className='category'>
                    <h4>{task.category}</h4>
                    <p>{task.description}</p>
                </div>
            </div>
            <img src={ToggleIcon} alt="toggle-icon" style={{transform:`${toggle?'rotate(90deg)':'rotate(0deg)'}`}}/>
        </div>
        <Toggle toggle={toggle}>
        <div className='dates'>
            <div className='start-date'>
                <p>Start Date</p>
                <h4>{task.createdat}</h4>
            </div>
            <div className='end-date'>
                <p>End Date</p>
                <h4>{task.expire}</h4>
            </div>
        </div>
        <div className='buttons'>
            <div className='action-button'>
                <img src={Edit} alt="edit-button" />
                <img src={Delete} alt="delete-button" />
            </div>
            <button className='completed'>Completed</button>
        </div>
        </Toggle>
    </div>
  )
}

export default SingleTask