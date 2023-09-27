import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from './Category';
import SingleCategories from '../pages/SingleCategories';
import UpdateCategory from './UpdateCategory';

const IndividualCategories = ({categories, setUpdate, open, setOpen, categlist, setCategList,loadedcategories, setLoadedCategories}) => {
  const [categorylist, setCategoryList] = useState(null);
  console.log(categlist)
  const [categName, setCategName] = useState('');
  return (
    <Routes>
      <Route path='*' element={<Category setCategName={setCategName} open={open} setOpen={setOpen} categories={categories} setCategoryList={setCategoryList} setCategList={setCategList} categorylist={categlist}/>}/>
      <Route path='/:id/*' element={categName?<SingleCategories categName={categName} categlist={categlist} setCategList={setCategList} setUpdate={setUpdate} categories={categories} categorylist={categorylist} setCategoryList={setCategoryList}/>:<></>}/>
    </Routes>
  )
}

export default IndividualCategories