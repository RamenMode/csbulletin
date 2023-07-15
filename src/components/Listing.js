import React from 'react'
import './Listing.css'
import ReactMarkdown from "react-markdown"

function Listing({
    ProfilePic,
    ItemsTrading,
    ItemsReceiving,
    Notes,
    Tradelink
}) {

  return (
    <div className = 'listing1'>
              <div className = 'profile'>
                <img className = "profilepic-listing" src = {`${ProfilePic}`}/>
              </div>
              <div className = 'trading'>

              </div>
              <div className = 'receiving'>

              </div>
              <div className = 'notes'>
                <h3 className = 'notes-h3'>Notes</h3>
                <p className = 'notes-text'>{Notes}</p>
              </div>
              <div className = 'tradelink'>
                <p className = 'notes-text'>{Tradelink}</p>
              </div>
            </div>
  )
}

export default Listing