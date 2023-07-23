import React, {useState, useEffect} from 'react'
import './EditListing.css'
import Listing from './Listing.js'

function EditListing() {

  const [listings, setListings] = useState([])

  function deletePost(id) {
    fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/steamid', {
            credentials: "include"
        }).then(response => response.json())
        .then(steamid => fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_DB + '/deletePost', {
          credentials: "include",
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            SteamID: steamid,
            id: id
          })
        })).then(response => response.json())
        .then(response => console.log(response))
  }

  function getUserPosts() {
    fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/steamid', {
            credentials: "include"
        }).then(response => response.json())
        .then(steamid => fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_DB + '/findUser', {
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
          const listingsarray = []
          var SteamID = response.SteamID
          var ProfilePic = response.ProfilePic
          var Tradelink = response.Tradelink
          for (let listingSelect of response.Listings) {
            var listingObject = new Object()
            listingObject.ItemsToReceiveImage = listingSelect.ItemsToReceiveImage
            listingObject.ItemsToTradeImage = listingSelect.ItemsToTradeImage
            listingObject.ItemsToReceiveText = listingSelect.ItemsToReceiveText
            listingObject.ItemsToTradeText = listingSelect.ItemsToTradeText
            listingObject.Notes = listingSelect.Notes
            listingObject.id = listingSelect.id
            listingObject.ProfilePic = ProfilePic
            listingObject.SteamID = SteamID
            listingObject.Tradelink = Tradelink
            listingsarray.push(listingObject)
          }
          setListings(listingsarray)
        }
      )
   }

  useEffect(() => {
    getUserPosts()
  }, [])

  return (
    <div className = 'background'>
      <div className = 'backgroundeditlisting'>
        <span style = {{fontSize: 36, color: '#FFFFFF', marginTop: 20, display: 'inline-block'}}>My Listings</span>
        {listings.map((prop, key) => {
                        return(
                            <Listing 
                              key = {key}
                              ProfilePic = {prop.ProfilePic ? prop.ProfilePic : null}
                              Notes = {prop.Notes}
                              Tradelink = {prop.Tradelink}
                              ItemsTradingImage = {prop.ItemsToTradeImage}
                              ItemsTradingText = {prop.ItemsToTradeText}
                              ItemsReceivingImage = {prop.ItemsToReceiveImage}
                              ItemsReceivingText = {prop.ItemsToReceiveText}
                              onClick = {deletePost}
                              id = {prop.id}
                            />
                        )
        })}
        <div className = "marketplace-bottom-padding"/>
        
      </div>
    </div>
  )
}

export default EditListing