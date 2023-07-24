import React, { useEffect, useState } from 'react'
import './ListingCreation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Item from './Item.js'
import { useSelector, useDispatch } from 'react-redux';
import { setInventory, setPressStatusAdd, setPressStatusRemove } from '../redux/counter.js';
import { v4 as uuid } from 'uuid';

var data = require("../moreAssets/itemlinkconverter.json");



function ListingCreation() {

  //const userStatus = useSelector((state) => state.user.value)
  const [hasTradelink, setHasTradelink] = useState(false)
  const userInventory = useSelector((state) => state.user.inventory)
  const elementsPressed = useSelector((state) => state.user.pressStatus)
  const dispatch = useDispatch()

  const getInventory = () => {
    fetch(process.env.REACT_APP_BASE_URL_API + '/user', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
          const steamid = data.id
          console.log(steamid)
          return fetch(process.env.REACT_APP_BASE_URL_API + `/getInventory/${steamid}`, {
            credentials: 'include',
          });
          })
        .then(response => response.json())
        .then(response => {
          dispatch(setInventory(response))
          console.log('here\n', userInventory)
        })
        .catch(err => {
          console.error('Request failed', err)
        })
  }

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_API + '/steamid', {
            credentials: "include"
        }).then(response => response.json())
        .then(steamid => fetch(process.env.REACT_APP_BASE_URL_API + '/getTradelink', {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                SteamID: steamid
            })
        })).then(response => response.json())
        .then(response => {
          if (Object.keys(response).length != 0) {
            setHasTradelink(true)
            console.log('I set the tradlein status', )
          }
        })
  }, [])
  

  async function sendListingData() {

    const toTradeElementsText = toTradeElements.map((component) => component.props.name);
    const toTradeElementsImage = toTradeElements.map((component) => component.props.image);
    const toReceiveElementsText = toReceiveElements.map((component) => component.props.name);
    const toReceiveElementsImage = toReceiveElements.map((component) => component.props.image);
    const id = uuid()
    const time = new Date()
    let steamid = await fetch(process.env.REACT_APP_BASE_URL_API + '/steamid', {
      credentials: "include"
    })
    let ProfilePic = await fetch(process.env.REACT_APP_BASE_URL_API + '/profilepic', {
      credentials: 'include'
    }).then(response => response.text())

    let steamidjson = await steamid.json()
    console.log("this is the steamid source", steamidjson)
    fetch(process.env.REACT_APP_BASE_URL_API + '/sendListingData', { // modify for different localhost
      headers: {
        "Content-Type": 'application/json'
      },
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        ToTradeElementsText: toTradeElementsText,
        ToTradeElementsImage: toTradeElementsImage,
        ToReceiveElementsText: toReceiveElementsText,
        ToReceiveElementsImage: toReceiveElementsImage,
        Notes: noteData,
        UserSteamID: steamidjson,
        ProfilePic: ProfilePic,
        id: id,
        dateCreated: time
      })
    })
    //.then(response => response.json())
    .then(response => {
      if (response.ok) {
        return response.json()
      }})
    .then(response => console.log(response))
  }

  function findNameUsingClass(classid) {
    return userInventory.descriptions.find(item => item.classid == classid).name
  }

  function findImageUsingClass(classid) {
    return userInventory.descriptions.find(item => item.classid == classid).icon_url
  }

  function findIsMarketableUsingClass(classid) {
    return userInventory.descriptions.find(item => item.classid == classid).marketable
  }

  const [value, setValue] = useState(""); // value of the search
  const [showResults, setShowResults] = useState(false); // to show results or not
  const [title, setTitle] = useState(""); // the name of the result
  //const [pressStatus, setPressStatus] = useState([]) // stores array of keys which have been pressed
  const [selectTrade, setSelectTrade] = useState(true) // whether to edit the trade or receive inventory
  const [toTradeElements, setToTradeElements] = useState([]) // elements contained in the trade inventory
  const [toReceiveElements, setToReceiveElements] = useState([]) // elements contained in the receive inventory
  const [noteData, setNoteData] = useState('')


  useEffect(() => {
    if (Object.keys(data).indexOf(value) == -1) {
      setShowResults(false)
    } else {
      setShowResults(true)
    }
  }, [value]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onChangeNotes = (event) => {
    setNoteData((noteData) => event.target.value)
    console.log(noteData)
  }

  const selectToTrade = () => {
    setSelectTrade(true)
  }

  const selectToReceive = () => {
    setSelectTrade(false)
  }

  const removeElementTrade = (key, limited) => {
    setToTradeElements(toTradeElements => toTradeElements.filter((item) => item.key != key))
    if (limited) {
      dispatch(setPressStatusRemove(key))
    }
  }

  const removeElementReceive = (key, limited) => {
    setToReceiveElements(toReceiveElements => toReceiveElements.filter((item) => item.key != key))
    if (limited) {
      dispatch(setPressStatusRemove(key))
    }
  }

  const toggleSelection = (key, name, image, pressed) => {
    console.log(key)
    if (elementsPressed.indexOf(key) == -1) {
      dispatch(setPressStatusAdd(key))
      if (selectTrade) {
        setToTradeElements([...toTradeElements, <Item name = {name} image = {image} pressed = {pressed} key = {key} onClick = {() => removeElementTrade(key, true)}/>]) // still need to set onclick
      } else {
        setToReceiveElements([...toReceiveElements, <Item name = {name} image = {image} pressed = {pressed} key = {key} onClick = {() => removeElementReceive(key, true)}/>])
      } 
    }
  }

  const toggleSelectionStore = (name, image) => { // Does not update the array of limited items
    if (selectTrade) {
      let id = uuid()
      setToTradeElements([...toTradeElements, <Item name = {name} image = {image} key = {id} onClick = {() => removeElementTrade(id, false)}/>]) // still need to set onclick
    } else {
      let id = uuid()
      setToReceiveElements([...toReceiveElements, <Item name = {name} image = {image} key = {id} onClick = {() => removeElementReceive(id, false)}/>])
    } 
  }

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setShowResults(true);
    setTitle(searchTerm)
  };

  return (
    <div className = 'background'>
      <div className = 'item-selector'>
        <div className = 'user-inv'>
          <button className = 'get-inv-button' onClick = {getInventory}>
          Get Inventory
          </button>
          <div className = 'inventory'>
            {userInventory.assets.map((prop, key) => {
                      if (findIsMarketableUsingClass(prop.classid)) {
                        return(
                            <Item 
                            name = {findNameUsingClass(prop.classid)}
                            image = {`url(https://steamcommunity-a.akamaihd.net/economy/image/${findImageUsingClass(prop.classid)})`}
                            key = {key}
                            pressed = {elementsPressed.indexOf(key) !== -1}
                            onClick = {() => toggleSelection(key, findNameUsingClass(prop.classid), `url(https://steamcommunity-a.akamaihd.net/economy/image/${findImageUsingClass(prop.classid)})`, elementsPressed.indexOf(key) !== -1)}
                            />
                        )
                      }
                  })}
          </div>
        </div>
        <div className = 'all-inv'>
        <div class="search-container">
          <div>
            <input type="text" class="search-input" value={value} onChange={onChange} placeholder="Search..."/>
            <button class="search-button" onClick={() => onSearch(value)}>Search</button>
          </div>
          <div className="dropdown">
          {Object.keys(data)
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.toLowerCase();
              return (
                searchTerm &&
                fullName.includes(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item)}
                className="dropdown-row"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
          <div className = 'inventory2'>
            {showResults ?
            <Item name = {title}
            image = {`url(${data[value]})`}
            onClick = {() => toggleSelectionStore(title, `url(${data[value]})`)}
            />
             : null} 
          </div>
        </div>
      </div>
      <div className = 'items-selected'>
        <div className = 'items-to-trade'>
            <div className = {selectTrade ? 'inventory3Active' : 'inventory3'} onClick = {() => selectToTrade()}>
              {toTradeElements}
            </div>
        </div>
        <div className = 'arrow'>
          <FontAwesomeIcon className = 'arrow-icon' icon={faArrowRightArrowLeft} size="7x" />
        </div>
        <div className = 'items-to-receive'>
            
            <div className = {selectTrade ? 'inventory4' : 'inventory4Active'} onClick = {() => selectToReceive()}>
              {toReceiveElements}
            </div>
        </div>
        <div className = 'notes-submit-container'>
          <textarea placeholder = "Add additional comments" className = 'notes-submission' onChange={onChangeNotes}></textarea>
          <button className = 'submit-listing' onClick = {() => {hasTradelink ? sendListingData() : alert('Please set your tradelink in your profile')}}>
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ListingCreation