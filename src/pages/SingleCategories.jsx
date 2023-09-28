
import { useState, useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import { getAllCategories, getCategoriesbyId } from '../utils/calls';
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
    
    const update = {
      name:name,
      description:desc
    }
    const today = new Date().toISOString().split("T")[0];
    useEffect(()=>{
      const AllCategories = async()=>{
        const GetAllCategories = await getCategoriesbyId(location);
        return GetAllCategories
      }
      AllCategories();
    },[location])
    useEffect(()=>{
        const AllCategories = async()=>{
          const GetAllCategories = await getAllCategories(setLoadedCategories);
          return GetAllCategories
        }
        AllCategories();
      },[])


      
      const TasVal = Object.values(categorylist);
      const CatVal = Object.values(loadedcategories);
      
      console.log(categName)
      console.log(categlist)
      console.log(categories)
  return (
    <div className='single-category-section'>
      <div className='plus-icon'>
          <h3>{`Your ${categories.name} Categories`}</h3>
          <img src={Plus} alt="plus-icon" onClick={()=>setCreateList(!createlist)}/>
      </div>
      <EditForm setCreateList={setCreateList} today={today} setDescription={setDescription} setTitle={setTitle} setDuedate={setDuedate} createlist={createlist}/>
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
  )
      }

export default SingleCategories
