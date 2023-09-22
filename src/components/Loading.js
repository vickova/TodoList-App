import React from 'react';
import {TailSpin, Circles, RotatingLines} from 'react-loader-spinner';
import '../App.css'

const Loader = () => {
  return (
    <div className='spinner' style={{height:'40vh', width:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Circles color="grey" width='25px' height='25px'/>

    </div>
  )
}

export default Loader;