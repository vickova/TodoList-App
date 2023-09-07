import React from 'react';
import { tasks } from '../utils/tasks';
import SingleTask from '../components/SingleTask';
import Logout from '../images/power.svg'
import '../App.css'

const Tasks = () => {
  return (
    <div className='tasks'>
        <div className='intro'>
            <h2>Hey, Mary, catch up</h2>
            <h4>Logout</h4>
        </div>
        <div className='task-cover'>
        {
            tasks?.map((task, i)=>{
                return<SingleTask task={task} key={i}/>
            })
        }
        </div>
    </div>
  )
}

export default Tasks