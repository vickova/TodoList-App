
import { useState, useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import { getAllCategories } from '../utils/calls';
import CategorizedTasks from '../components/CategorizedTasks';
import Plus from '../images/plus-icon.svg';
import { getToken } from '../utils/common';
import axios from 'axios';
import EditForm from '../components/EditForm';

const SingleCategories = ({categorylist, categories, setCategoryList}) => {
    const [loadedcategories, setLoadedCategories] = useState({})
    const [locate, setLocate] = useState(false);
    const location = useLocation().pathname.split('/').pop();
    const [createlist, setCreateList] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDuedate] = useState('');
    const token = getToken();
    const body = {
      title:title,
      description:description,
      dueDate:dueDate
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
    <div className='single-category-section'>
      <div className='plus-icon'>
          <h3>{`Your ${categories.name} Categories`}</h3>
          <img src={Plus} alt="plus-icon" onClick={()=>setCreateList(!createlist)}/>
      </div>
      <EditForm today={today} createCategoryTaskHandler={createCategoryTaskHandler} setDescription={setDescription} setTitle={setTitle} setDuedate={setDuedate} createlist={createlist}/>
    <div className='tasks' style={{opacity:createlist?'0.5':'1'}}>
        <div className='task-cover'>
        {
            Object.keys(categorylist).map((task, i)=>{
                return categorylist[task].map((item, j)=>{
                  if(item.category === location){
                    return <CategorizedTasks setLocate={setLocate} task={item} key={j} category={CatVal.map((item)=>{
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