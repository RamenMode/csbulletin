import React, {useState, useEffect} from 'react'
import './Marketplace.css'
import { Link } from 'react-router-dom';
import Listing from './Listing.js'
import { setUser, setEmpty } from '../redux/counter.js'

// temporary imports for development purposes
import { useSelector, useDispatch } from 'react-redux';
import SearchMenu from './SearchMenu'

function Marketplace() {

  const dispatch = useDispatch()
  const userStatus = useSelector((state) => state.user.value)
  const [currentListings, setCurrentListings] = useState([])
  const [selectedOption3, setSelectedOption3] = useState(-1)
  const [searchQ, setSearchQ] = useState('')

  function merge(arr1, arr2, selectedOption3) {
    const arrayd = []
    var j = 0
    var k = 0
    if (selectedOption3 == 1) {
      while (j<arr1.length && k < arr2.length) {
        if (arr1[j].dateCreated < arr2[k].dateCreated) {
            arrayd.push(arr1[j])
            j=j+1
        } else {
            arrayd.push(arr2[k])
            k=k+1
        }
      }
        if (j==arr1.length) {
            arrayd.push(...arr2.slice(k))
            return arrayd
        } else {
            arrayd.push(...arr1.slice(j))
            return arrayd
        }
    } else {
      while (j<arr1.length && k < arr2.length) {
        if (arr1[j].dateCreated > arr2[k].dateCreated) {
            arrayd.push(arr1[j])
            j=j+1
        } else {
            arrayd.push(arr2[k])
            k=k+1
        }
      }
        if (j==arr1.length) {
            arrayd.push(...arr2.slice(k))
            return arrayd
        } else {
            arrayd.push(...arr1.slice(j))
            return arrayd
        }
    }
  }

  function mergeSort(array, selectedOption3) {
    if (array.length < 2) {
        return array
    }
    const halfway = Math.ceil(array.length/2)
    var arr1 = array.slice(0, halfway)
    var arr2 = array.slice(halfway)
    return merge(mergeSort(arr1, selectedOption3), mergeSort(arr2, selectedOption3), selectedOption3)
  }

  async function checkAuthenticated() {
    fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/user', {
        credentials: 'include'
    })
    .then(response => response.json())
    .then(text => text ? dispatch(setUser(text.photos[1].value)) : dispatch(setEmpty()))
  }

  useEffect(() => {
    checkAuthenticated()
  }, [])

  useEffect(() => {
    
  }, [searchQ])

  useEffect(() => {
    fetch(process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_DB + '/getAllListings?' + new URLSearchParams({
      order: selectedOption3
    }))
    .then(response => response.json())
    .then(response => {
      const listingsarray = []
      for (const userpost of response.UserPosts) {
        var flag = false
        var SteamID = ''
        var ProfilePic = ''
        var Tradelink = ''
        for (let i = 0; i < 2; i++) {
          for (let listingSelect of userpost.Listings) {
            if (flag == true && 'ItemsToReceiveImage' in listingSelect) {
              var listingObject = new Object()
              listingObject.ItemsToReceiveImage = listingSelect.ItemsToReceiveImage
              listingObject.ItemsToTradeImage = listingSelect.ItemsToTradeImage
              listingObject.ItemsToReceiveText = listingSelect.ItemsToReceiveText
              listingObject.ItemsToTradeText = listingSelect.ItemsToTradeText
              listingObject.Notes = listingSelect.Notes
              listingObject.ProfilePic = ProfilePic
              listingObject.SteamID = SteamID
              listingObject.Tradelink = Tradelink
              listingObject.dateCreated = listingSelect.dateCreated
              listingsarray.push(listingObject)
            } else if (flag == false) {
              if ('SteamID' in listingSelect) {
                SteamID = listingSelect.SteamID
              }
              else if ('ProfilePic' in listingSelect) {
                ProfilePic = listingSelect.ProfilePic
              }
              else if ('Tradelink' in listingSelect) {
                Tradelink = listingSelect.Tradelink
              }
            }
          }
          flag = true
        }
      }
      console.log(listingsarray)
      const listingsarraysorted = mergeSort(listingsarray, selectedOption3)
      console.log(listingsarraysorted)
      return listingsarraysorted
    })
    .then(result => setCurrentListings(result))
  }, [selectedOption3])

  return (
    <div className = 'background'>
        <div className = 'left-box'>
            <div className = 'search'>
              <div className = 'search-box'>
                <SearchMenu
                  setOrder = {setSelectedOption3}
                  setSearch = {setSearchQ}
                />
              </div>
            </div>
            <div className = 'list'>
              <div className = 'list-box'>
                { userStatus ? 
                <>
                <Link className = 'list-button list-button-text' to = '/manageListing'>Manage your listings</Link>
                <Link className = 'list-button list-button-text' to = '/createListing'>List a Trade</Link> </>
                : 
                <>
                <a className = 'list-button list-button-text' href = {process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/auth/steam'}>Manage your listings</a>
                <a className = 'list-button list-button-text' href = {process.env.REACT_APP_BASE_URL_API + process.env.REACT_APP_PORT_AUTH + '/auth/steam'}>List a Trade</a> </>
                }
              </div>
            </div>
        </div>
        <div className = 'right-box'>
            <div className = "marketplace-header">
              <div className = "marketplace-category">
                Profile
              </div>
              <div className = "marketplace-category">
                Trading
              </div>
              <div className = "marketplace-category">
                Receiving
              </div>
              <div className = "marketplace-category">
                Notes
              </div>
              <div className = "marketplace-category">
                Tradelink
              </div>
            </div>
            {currentListings.map((prop, key) => {
                var includedInTrade = false;
                var includedInReceive  = false;
                for (let giving of prop.ItemsToTradeText) {
                  if (giving.toLowerCase().includes(searchQ)) {
                    includedInTrade = true;
                  }
                }
                for (let receiving of prop.ItemsToReceiveText) {
                  if (receiving.toLowerCase().includes(searchQ)) {
                    includedInReceive = true;
                  }
                }
                if (searchQ && (includedInTrade || includedInReceive))
                  return(
                      <Listing 
                        key = {key}
                        ProfilePic = {prop.ProfilePic ? prop.ProfilePic : null}
                        Notes = {prop.Notes}
                        Tradelink = {prop.Tradelink}
                        type = {1}
                        ItemsTradingImage = {prop.ItemsToTradeImage}
                        ItemsTradingText = {prop.ItemsToTradeText}
                        ItemsReceivingImage = {prop.ItemsToReceiveImage}
                        ItemsReceivingText = {prop.ItemsToReceiveText}
                      />
                  )
                else if (!searchQ) {
                  return(
                    <Listing 
                      key = {key}
                      ProfilePic = {prop.ProfilePic ? prop.ProfilePic : null}
                      Notes = {prop.Notes}
                      Tradelink = {prop.Tradelink}
                      type = {1}
                      ItemsTradingImage = {prop.ItemsToTradeImage}
                      ItemsTradingText = {prop.ItemsToTradeText}
                      ItemsReceivingImage = {prop.ItemsToReceiveImage}
                      ItemsReceivingText = {prop.ItemsToReceiveText}
                    />
                )
                }
            })}
            

            <div className = "marketplace-bottom-padding"/>
            
        </div>
    </div>
  )
  
}

export default Marketplace