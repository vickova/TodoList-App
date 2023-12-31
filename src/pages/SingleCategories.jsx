
import { useState, useEffect } from 'react';
import { Route,Routes, useLocation } from 'react-router-dom';
import { getAllCategories, getCategoriesbyId } from '../utils/calls';
import Plus from '../images/plus-icon.svg';
import { getToken } from '../utils/common';
import axios from 'axios';
import EditForm from '../components/EditForm';
import SingleTask from '../components/SingleTask';

const SingleCategories = ({categorylist, categories, setUpdate, categlist, categName, setCategoryList, opener, setOpener}) => {
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
      if(!sessionStorage.getItem("token")){
        navigate("/login");
      }else{
      const AllCategories = async()=>{
        const GetAllCategories = await getCategoriesbyId(location);
        setCategoryList(GetAllCategories)
        return GetAllCategories
      }
      AllCategories();
    }
    },[])
    useEffect(()=>{
        const AllCategories = async()=>{
          const GetAllCategories = await getAllCategories(setLoadedCategories);
          return GetAllCategories
        }
        AllCategories();
      },[])


      
      const CatVal = Object.values(loadedcategories);

  return (
    <div className='single-category-section categorized-tasks'>
      <div className='plus-icon'>
          <h3>{`Your ${categName} Categories`}</h3>
          <img src={Plus} alt="plus-icon" onClick={()=>setCreateList(!createlist)}/>
      </div>
      <EditForm setCategoryList={setCategoryList} setCreateList={setCreateList} today={today} setDescription={setDescription} setTitle={setTitle} setDuedate={setDuedate} createlist={createlist}/>
        <div className='task-cover'>
        {
            Object.keys(categorylist).map((task, i)=>{
                return categorylist[task].map((item, j)=>{
                  if(item.category === location){
                    return <SingleTask setOpener={setOpener} opener={opener} setUpdate={setUpdate} setCategoryList={setCategoryList} setLocate={setLocate} task={item} key={j} category={categName}/>
                }
                })
              })
        }
        </div>

    </div>
  )
      }

export default SingleCategories
