import React from 'react';
import {TailSpin, Circles, RotatingLines} from 'react-loader-spinner';
import '../App.css'

const Loader = () => {
  return (
    <div className='spinner'>
        <TailSpin color="grey" width='25px' height='25px'/>

    </div>
  )
}

export default Loader;