import React from 'react';
import '../App.css';
import { Button } from './Button';
import './Artcs.css';
import './Navbar.js'
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setEmpty } from '../redux/counter.js'
import video from '../moreAssets/swat-counter-strike-global-offensive-4k-live-wallpaper.mp4'
import video2 from '../moreAssets/video-2.mp4'
import CookieConsent from "react-cookie-consent";

function Artcs() {

  const userStatus = useSelector((state) => state.user.value)
  const dispatch = useDispatch()

  const test = () => {
    fetch(process.env.REACT_APP_BASE_URL_API + '/loggedin', {
      credentials: 'include'
    })
      .then(response => response.text())
      .then(text => console.log(text))
  }

  return (
    <>
    <div className='hero-container'>
      {/*<video autoPlay loop muted id = "video">
          <source src = {video} type = 'video/mp4'/>
  </video>*/}
      <h1 style = {{zIndex: 3, color: '#fff'}} >A P2P Trading Forum</h1>
      <p style = {{color: '#fff', zIndex: 3}}>No fees, no middleman</p>
      <div className='hero-btns' style = {{zIndex: 3}}>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick = {test}
        >
          Trade Now
        </Button>
      </div>
      <CookieConsent
        location="bottom"
        buttonText="Sure man!!"
        cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
        >
        This website uses cookies to enhance the user experience.{" "}
        <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span>
      </CookieConsent>
    </div>
    </>
  );
}

export default Artcs;
//