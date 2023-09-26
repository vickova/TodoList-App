import axios from "axios";
import { getToken } from "./common";

const token = getToken()
export function getAllCategories(setLoadedCategories) {
    return axios.get('https://todo-list-api-8vwz.onrender.com/api/v1/categories', {headers:{'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      setLoadedCategories(res.data);

    }).catch((err)=> err.message)
   }
export async function getAllTasks(setLoadedTask) {
    return axios.get('https://todo-list-api-8vwz.onrender.com/api/v1/tasks', {headers:{'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      setLoadedTask(res.data)
    }).catch((err)=>err.message)
   }
  
   export async function getCategoriesbyId(id) {
    if(token||token!==null){
    return axios.get(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${id}`, {headers:{'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data);
      console.log(typeof(res.data))
      return res.data
    }).catch((err)=>err.message)
  }
   }

   export const DeleteSingleTask = (id)=>{
    console.log('Deleting')
    
    axios.delete(`https://todo-list-api-8vwz.onrender.com/api/v1/tasks/${id}`,{headers:{'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data)
      console.log('Deleted')
    }).catch((err)=>console.log('Something went wrong', err.message))
  }
  export const UpdateSingleTask = (id)=>{
    console.log('updating')
    
    axios.patch(`https://todo-list-api-8vwz.onrender.com/api/v1/tasks/${id}`,{headers:{'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data)
      console.log('Updated')
    }).catch((err)=>console.log('Something went wrong', err.message))
  }
  
  export const DeleteCategory = (id)=>{
    console.log('Deleting')
    
    axios.delete(`https://todo-list-api-8vwz.onrender.com/api/v1/categories/${id}`,{headers:{'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`}})
    .then((res)=>{
      console.log(res.data)
      console.log('Categories deleted')
    }).catch((err)=>console.log('Something went wrong', err.message))
  }
  