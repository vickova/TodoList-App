import React from 'react';
import Close from '../images/close.svg'

const EditForm = ({setDuedate, createCategoryTaskHandler, setDescription, createlist, setTitle, today, setCreateList}) => {
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