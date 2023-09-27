import { useState, useEffect } from 'react';
import Toggle from '../components/Toggle';
import ToggleIcon from '../images/chevron.svg';
import Delete from '../images/delete-icon.svg';
import Edit from '../images/edit-icon.svg';
import { useNavigate } from 'react-router-dom';
import { getCategoriesbyId } from '../utils/calls';
import { DeleteCategory, DeleteSingleTask } from '../utils/calls';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorToaster, Success } from './Toast';
import axios from 'axios';
import { ToastContainer} from 'react-toastify';
import { getToken } from '../utils/common';
import { getAllCategories } from '../utils/calls';
import Close from '../images/close.svg';

const Category = ({categories, category, setCategoryList,categlist, open, setOpen, categorylist, setCategList, setCategName, loadedcategories, setLoadedCategories}) => {
    const [toggle, setToggle] = useState(false);
    const token=getToken()
    const navigate = useNavigate();
    const [desc, setDesc] = useState(categories.name);
    const [name, setName] = useState(categories.description);
    const update = {
        name:name,
        description:desc
      }
    const buttonClickHandler = async (name)=>{
        setCategoryList({})
        console.log('happening')
        const MovieData = await getCategoriesbyId(name._id);
        // dispatch(SingleCategory(MovieData))
        setCategName(name.name);
        setCategoryList(MovieData);
        navigate(`/categories/${name._id}`)
    }
    const EditHandler = (singlecateg)=>{
        navigate(`/categories/${singlecateg._id}`)
        console.log(singlecateg)
        setOpen(!open);
        setCategList(singlecateg);
        setName(singlecateg?.name);
        console.log(singlecateg.name);
        setDesc(singlecateg?.description);
        navigate('/categories')
    }
    const Deleter = async(id)=>{
        const lists = await getCategoriesbyId(id);
        console.log(lists.tasks.length)
            const deletedTasks = lists?.tasks.map((item)=>DeleteSingleTask(item._id));
            if(deletedTasks){
            DeleteCategory(id);
            }
            console.log('deleted')
    }
    const UpdatedCategoryHandler = (e)=>{
        console.log(categlist)
        e.preventDefault();
        console.log('updating categ oooo')
        if(name||desc){
        axios.patch(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${categories._id}`, update, {headers:{'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`}})
        .then((res)=>{
        getAllCategories(setLoadedCategories).then((res)=>res);
          console.log(res.data);
          console.log(categlist)
          navigate(`/categories/tasks`)
          setOpen(false);
          navigate('/categories')
        }).catch((err)=>console.log('Something went wrong', err.message))
        }
        else{
          console.log('fields cannot be empty')
        }
    }
  return (
    <div className='single-task'>
        <form className='create-task-form' style={{display:open?'block':'none'}} onSubmit={UpdatedCategoryHandler}>
        <div className='close'>
        <img src={Close} alt="exit" onClick={()=>setOpen(false)}/>
        </div>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' value={name} onChange={(e)=>setName(e.target.value)} required/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" value={desc} onChange={(e)=>setDesc(e.target.value)} required/>

        <button onClick={()=>console.log(update)}>Update</button>
      </form>
        <div className='toggle' onClick={()=>setToggle(!toggle)}>
            <div>
                <h3>{categories.name}</h3>
                <div className='category'>
                    <h4>{category}</h4>
                    <p>{categories.description}</p>
                </div>
            </div>
            <img src={ToggleIcon} alt="toggle-icon" style={{transform:`${toggle?'rotate(90deg)':'rotate(0deg)'}`}}/>
        </div>
        <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable={false}
              pauseOnHover
              theme="light"
              limit={1}
              />
        <Toggle toggle={toggle}>
        
        <div className='buttons'>
            <div className='action-button'>
                <img src={Edit} alt="edit-button" onClick={()=>EditHandler(categories)}/>
                <img src={Delete} alt="delete-button" onClick={()=>Deleter(categories._id)}/>
            </div>
            <button className='completed' onClick={()=>buttonClickHandler(categories)}>View</button>
        </div>
        </Toggle>
    </div>
  )
}

export default Category
