import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Artcs.css';
import './Navbar.js'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setEmpty } from '../redux/counter.js'


function Artcs() {

  const userStatus = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const test = () => {
    fetch('http://localhost:4000/loggedin', {
      credentials: 'include'
    })
      .then(response => response.text())
      .then(text => console.log(text))
  }

  return (
    <div className='hero-container'>
      <h1>A P2P Trading Forum</h1>
      <p style = {{color: '#fff'}}>No fees, no middleman</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick = {test}
        >
          Trade Now
        </Button>
      </div>
    </div>
  );
}

export default Artcs;
//