import React from 'react'
import './EditListing.css'
import Listing from './Listing.js'

function EditListing() {
  return (
    <div className = 'background'>
      <div className = 'backgroundeditlisting'>
        <span style = {{fontSize: 36, color: '#FFFFFF', marginTop: 20, display: 'inline-block'}}>My Listings</span>
        <Listing/>
        <Listing/>
        <Listing/>
        <Listing/>
        <Listing/>
        <Listing/>
        <Listing/>
        <Listing/>
        
      </div>
    </div>
  )
}

export default EditListing