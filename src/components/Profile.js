import React, {useEffect, useState} from 'react'
import './Profile.css'
import { useSelector, useDispatch } from 'react-redux';

function Profile() {

    const [steamName, setSteamName] = useState('')
    //const [tradelink, setTradelink] = useState('')
    const [tradelinkInitial, setTradelinkInitial] = useState('')

    function onChange(event) {
        setTradelinkInitial(event.target.value)
    }

    async function submitTradelink() {
        let ProfilePic = await fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/profilepic', {
            credentials: 'include'
        }).then(response => response.text())
        let steamid = await fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/steamid', {
            credentials: "include"
        })
        let steamidjson = await steamid.json()
        fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_DB + '/addTradelink', {
            credentials: 'include',
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                SteamID: steamidjson,
                Tradelink: tradelinkInitial,
                ProfilePic: ProfilePic
            })
        })
        .then(response => response.json())
        .then(response => console.log(response))
    }

    useEffect(() => {

        fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/steamid', {
            credentials: "include"
        }).then(response => response.json())
        .then(steamid => fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_DB + '/getTradelink', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SteamID: steamid
            })
        })).then(response => response.json())
        .then(response => setTradelinkInitial(response.tradelink))
    }, [])

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/user', {
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
                    <input type="text" id="tradelink-input" placeholder={tradelinkInitial ? tradelinkInitial : 'Type in your tradelink'} value = {tradelinkInitial} onChange = {onChange}/>
                    <button class="enter-button-profile" onClick = {() => submitTradelink()}>Save</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile