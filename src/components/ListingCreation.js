import React, { useState, useId } from 'react'
import './ListingCreation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Item from './Item.js'
import { useSelector, useDispatch } from 'react-redux';
import { setInventory } from '../redux/counter.js';
import { v4 as uuid } from 'uuid';
var data = require("../moreAssets/itemlinkconverter.json");


function ListingCreation() {

  //const userStatus = useSelector((state) => state.user.value)
  const userInventory = useSelector((state) => state.user.inventory)
  const dispatch = useDispatch()

  const getInventory = () => {
    fetch('http://localhost:4000/user', {
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
          const steamid = data.id
          console.log(steamid)
          return fetch(`http://localhost:4000/getInventory/${steamid}`, {
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
  const [pressStatus, setPressStatus] = useState([]) // stores array of keys which have been pressed
  const [selectTrade, setSelectTrade] = useState(true) // whether to edit the trade or receive inventory
  const [toTradeElements, setToTradeElements] = useState([]) // elements contained in the trade inventory
  const [toReceiveElements, setToReceiveElements] = useState([]) // elements contained in the receive inventory

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const selectToTrade = () => {
    setSelectTrade(true)
  }

  const selectToReceive = () => {
    setSelectTrade(false)
  }

  const removeElementTrade = (key) => {
    console.log('I was pressed')
    for (const element of toTradeElements) {
      console.log(element)
    }
    setToTradeElements(toTradeElements => toTradeElements.filter((item) => item.key != key))
  }

  const removeElementReceive = (key) => {
    console.log('I was pressed')
    for (const element of toReceiveElements) {
      console.log(element)
    }
    setToReceiveElements(toReceiveElements => toReceiveElements.filter((item) => item.key != key))
  }

  const toggleSelection = (key, name, image, pressed) => {
    console.log(key)
    if (pressStatus.indexOf(key) === -1) {
      setPressStatus([...pressStatus, key])
      if (selectTrade) {
        setToTradeElements([...toTradeElements, <Item name = {name} image = {image} pressed = {pressed} key = {key} onClick = {() => removeElementTrade(key)}/>]) // still need to set onclick
      } else {
        setToReceiveElements([...toReceiveElements, <Item name = {name} image = {image} pressed = {pressed} key = {key} onClick = {() => removeElementReceive(key)}/>])
      } 
    } else {
      let temp = [...pressStatus];
      temp.splice(pressStatus.indexOf(key), 1)
      setPressStatus(temp)
    }
  }

  const toggleSelectionStore = (name, image) => { // unfortunately does not keep track of keys, thus the list of keys in the selected inventory is incomplete
    if (selectTrade) {
      let id = uuid()
      setToTradeElements([...toTradeElements, <Item name = {name} image = {image} key = {id} onClick = {() => removeElementTrade(id)}/>]) // still need to set onclick
    } else {
      let id = uuid()
      setToReceiveElements([...toReceiveElements, <Item name = {name} image = {image} key = {id} onClick = {() => removeElementReceive(id)}/>])
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
                            pressed = {pressStatus.indexOf(key) !== -1}
                            onClick = {() => toggleSelection(key, findNameUsingClass(prop.classid), `url(https://steamcommunity-a.akamaihd.net/economy/image/${findImageUsingClass(prop.classid)})`, pressStatus.indexOf(key) !== -1)}
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
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
            </div>
        </div>
        <div className = 'arrow'>
          <FontAwesomeIcon className = 'arrow-icon' icon={faArrowRightArrowLeft} size="7x" />
        </div>
        <div className = 'items-to-receive'>
            <div className = {selectTrade ? 'inventory4' : 'inventory4Active'} onClick = {() => selectToReceive()}>
              {toReceiveElements}
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
              <Item></Item>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ListingCreation