import React from 'react'
import "./RegisterUser.css"
import SteamLogo from '../moreAssets/square-steam.svg'


function RegisterUser() {
  return (
    <div className = "background-login">
        <div className = "login-box">
            <label className = "email-input">
                <input name="myInput" type = "text" id="search" placeholder="Email"/>
            </label>
            <a href="#" class="steambutton">
                <span>Login With Steam</span>
                <div class="icon">
                    <i class="fa fa-steam-square"></i>

                </div>
            </a>
        </div>
    </div>
  )
}

export default RegisterUser