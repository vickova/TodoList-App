import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from './Category';
import SingleCategories from '../pages/SingleCategories';

const IndividualCategories = ({categories, setUpdate, open, setOpen, categlist, setCategList}) => {
  const [categorylist, setCategoryList] = useState(null);
  const [categName, setCategName] = useState('');
  return (
    <Routes>
      <Route path='*' element={<Category setCategName={setCategName} open={open} setOpen={setOpen} categories={categories} setCategoryList={setCategoryList} setCategList={setCategList}/>}/>
      <Route path='/:id/*' element={categorylist?<SingleCategories categName={categName} categlist={categlist} setCategList={setCategList} setUpdate={setUpdate} categories={categories} categorylist={categorylist} setCategoryList={setCategoryList}/>:<></>}/>
    </Routes>
  )
}

export default IndividualCategories