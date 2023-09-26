
import { useState, useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import { getAllCategories } from '../utils/calls';
import Plus from '../images/plus-icon.svg';
import { getToken } from '../utils/common';
import axios from 'axios';
import EditForm from '../components/EditForm';
import SingleTask from '../components/SingleTask';

const SingleCategories = ({categorylist, categories, setUpdate, categlist, categName}) => {
    const [loadedcategories, setLoadedCategories] = useState({})
    const [locate, setLocate] = useState(false);
    const navigate = useLocation();
    const location = useLocation().pathname.split('/').pop();
    const [createlist, setCreateList] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDuedate] = useState('');
    const token = getToken();
    const [name, setName] = useState(categlist?.name);
    const [desc, setDesc] = useState(categlist?.description);
    const body = {
      title:title,
      description:description,
      dueDate:dueDate
    }
    const update = {
      name:name,
      description:desc
    }
    const today = new Date().toISOString().split("T")[0];
    
    useEffect(()=>{
        const AllCategories = async()=>{
          const GetAllCategories = await getAllCategories(setLoadedCategories);
          return GetAllCategories
        }
        AllCategories();
      },[])

      const TasVal = Object.values(categorylist);
      const CatVal = Object.values(loadedcategories);
      const createCategoryTaskHandler = (e)=>{
        e.preventDefault();
        console.log('running oooo')
        if(body.title||body.description||body.dueDate){
        axios.post(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${location}`, update, {headers:{'Content-Type': 'application/json',
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
      console.log(categName)
  return (
    <div className='single-category-section'>
      <EditForm setCreateList={setCreateList} today={today} createCategoryTaskHandler={createCategoryTaskHandler} setDescription={setDescription} setTitle={setTitle} setDuedate={setDuedate} createlist={createlist}/>
    <div className='tasks' style={{opacity:createlist?'0.5':'1'}}>
        <div className='task-cover'>
        {
            Object.keys(categorylist).map((task, i)=>{
                return categorylist[task].map((item, j)=>{
                  if(item.category === location){
                    return <SingleTask setUpdate={setUpdate} setLocate={setLocate} task={item} key={j} category={CatVal.map((item)=>{
                      if(item._id === TasVal[0][i].category){
                        return item.name
                      }
                      })}/>
                }
                })
              })
        }
        </div>
    </div>
    <Routes>
    <Route path='/:taskid'/>
    </Routes>
    </div>
  )
      }

export default SingleCategories
//     )
//     }
  
// }

// export default SingleCategories