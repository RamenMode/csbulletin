import React from 'react'
import './EditListing.css'
import Listing from './Listing.js'

function EditListing() {
  return (
    <div className = 'background'>
      <span style = {{fontSize: 36, color: '#FFFFFF', marginTop: 20, marginBottom: 20}}>My Listings</span>
      <div className = 'backgroundeditlisting'>
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