import React from 'react'
import './Profile.css'

function Profile() {

    function submitTradelink() {
        
    }

  return (
    <div className = 'profile-background'>
        <div className = 'login-box'>
            <span className = 'myprofile-text'>
                My Profile
            </span>
            <span className = 'tradelink-text'>
                Tradelink
            </span>
            <div className = 'tradelink-container'>
                <input type="text" id="tradelink-input" placeholder="Type in your tradelink"/>
                <button class="enter-button-profile" onClick = {() => submitTradelink()}>Enter</button>
            </div>
        </div>
    </div>
  )
}

export default Profile