import React from 'react';
import { Link } from 'react-router-dom';
import Homeimage from './images/todo9.png';
import Circle from './components/Circle';
import Button from './components/Button';
import './App.css'

const Home = () => {
  return (
    <div className='home'>
      <Circle/>
      <div className='home-image'>
        <img src={Homeimage} alt="homepage-hero" />
      </div>
      <h2>Get Your Todo-List Done</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem, porro officiis? Quia modi obcaecati laboriosam, cumque incidunt laudantium facilis? Voluptates?</p>
      <Link to='/signup' className='home-button'>
        <Button text='Start now'/>
      </Link>
    </div>
  )
}

export default Home