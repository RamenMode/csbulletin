import React from 'react'
import './ListingCreation.css'

function ListingCreation() {

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
        .then(response => console.log(response))
        .catch(err => {
          console.error('Request failed', err)
        })
  }

  return (
    <div className = 'background'>
      <div className = 'item-selector'>
        <button className = 'get-inv-button' onClick = {getInventory}>
          Get Inventory
        </button>
        <div className = 'inventory'></div>
      </div>
      <div className = 'items-selected'>

      </div>
    </div>
  )
}

export default ListingCreation