import React from 'react'
import './Marketplace.css'
import { Link } from 'react-router-dom';
import Listing from './Listing.js'

// temporary imports for development purposes
import { useSelector, useDispatch } from 'react-redux';

function Marketplace() {

  const userStatus = useSelector((state) => state.user.value)

  return (
    <div className = 'background'>
        <div className = 'left-box'>
            <div className = 'search'>
              <div className = 'search-box'>

              </div>
            </div>
            <div className = 'list'>
              <div className = 'list-box'>
                <Link className = 'list-button list-button-text' to = '/manageListing'>Manage your listings</Link>'
                <Link className = 'list-button list-button-text' to = '/createListing'>List a Trade</Link>
              </div>
            </div>
        </div>
        <div className = 'right-box'>
            <Listing
              type = {1}
              ProfilePic = {userStatus}
              Tradelink = "https://steamcommunity.com/tradeoffer/new/?partner=188118015&token=f2F4wEbJ"
              Notes = 'gehprwmgpowhrmpowemhwpohmrpeomhpeomrhpoemrphoemprohmepormhpeormphoemrphomepromhepor3t4igh35orneoihnroineoriernhowienrhoeortihnoeritnhoeirtnoeihrntohinerotihneortihnoiretrthertherthertherthertherthertherthertherthertherthertherthertherthertherthrethertherthertherthertherthertherthertherthertherthertreherthertherthertherthertherthrteherth'
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            <Listing
              type = {1}
            />
            
        </div>
    </div>
  )
}

export default Marketplace