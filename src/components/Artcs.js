/*import React from 'react'
import './Artcs.css'
import '../App.css'

function Artcs() {
  return (
    <div className = "container">
       
    </div>
    
  )
}

export default Artcs*/

import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Artcs.css';

function Artcs() {
  return (
    <div className='hero-container'>
      <h1>A P2P trading Forum</h1>
      <p style = {{color: '#fff'}}>No fees, no middleman</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Trade Now <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
  );
}

export default Artcs;
//