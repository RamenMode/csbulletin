import React, { useState } from 'react'
import './ListingCreation.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Item from './Item.js'
import { useSelector, useDispatch } from 'react-redux';
import { setInventory } from '../redux/counter.js';
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

  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
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
                            image = {findImageUsingClass(prop.classid)}
                            key = {key}
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
          <div className = 'inventory'>
            <div class="item">1</div>
            <div class="item">2</div>
            <div class="item">3</div>  
            <div class="item">4</div>
            <div class="item">5</div>
            <div class="item">6</div>  
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>
            <div class="item">5</div>
            <div class="item">6</div>  
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>
            <div class="item">5</div>
            <div class="item">6</div>  
            <div class="item">7</div>
            <div class="item">8</div>
            <div class="item">9</div>     
          </div>
        </div>
      </div>
      <div className = 'items-selected'>
        <div className = 'items-to-trade'>

        </div>
        <div className = 'arrow'>
          <FontAwesomeIcon icon={faArrowRightArrowLeft} size="7x" />
        </div>
        <div className = 'items-to-receive'>

        </div>
      </div>
    </div>
  )
}

export default ListingCreation