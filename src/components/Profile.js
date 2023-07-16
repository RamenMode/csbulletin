import React, {useEffect, useState} from 'react'
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';

function Profile() {

    const [steamName, setSteamName] = useState('')

    function submitTradelink() {
        
    }

    useEffect(() => {
        fetch('http://localhost:4000/user', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(response => {setSteamName(response.displayName)})
    }, [])

    const userStatus = useSelector((state) => state.user.value)

  return (
    <div className = 'profile-background'>
        <div className = 'login-box'>
            <div className = 'profile-box'>
                <div className = 'top-profile-box'>
                    <img className = "profile-picture-file" src = {`${userStatus}`}/>
                    <span className = "name-text">{steamName}</span>
                </div>
                <span className = 'tradelink-text'>
                    Tradelink
                </span>
                <div className = 'tradelink-container'>
                    <input type="text" id="tradelink-input" placeholder="Type in your tradelink"/>
                    <button class="enter-button-profile" onClick = {() => submitTradelink()}>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile