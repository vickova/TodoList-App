import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Category from './Category';
import SingleCategories from '../pages/SingleCategories';

const IndividualCategories = ({categories}) => {
  const [categorylist, setCategoryList] = useState(null);
  return (
    <Routes>
      <Route path='*' element={<Category categories={categories} setCategoryList={setCategoryList}/>}/>
      <Route path='/:id/*' element={categorylist?<SingleCategories categories={categories} categorylist={categorylist} setCategoryList={setCategoryList}/>:<></>}/>
    </Routes>
  )
}

export default IndividualCategories