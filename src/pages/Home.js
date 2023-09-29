import React from 'react';
import { Link } from 'react-router-dom';
import Homeimage from '../images/todo9.png';
import Circle from '../components/Circle';
import Button from '../components/Button';
import '../App.css'

const Home = () => {
  return (
    <div className='home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <div className='home-text'>
      <h2>Get Your Todo-List Done</h2>
      <p>You can always change your plan, but only if you have one. I’m a big believer in to-do lists. It helps us break life into small steps.</p>
       <p><i>--Randy Pausch--</i></p>
       </div>
      <Link to='/signup' className='home-button'>
        <Button text='Start now'/>
      </Link>
    </div>
  )
}

export default Home