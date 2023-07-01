import React from 'react'
import './Marketplace.css'
import { Link } from 'react-router-dom';

function Marketplace() {
  return (
    <div className = 'background'>
        <div className = 'left-box'>
            <div className = 'search'>
              <div className = 'search-box'>

              </div>
            </div>
            <div className = 'list'>
              <div className = 'list-box'>
                <Link className = 'list-button list-button-text' to = '/createListing'>List a Trade</Link>
              </div>
            </div>
        </div>
        <div className = 'right-box'>
            <div className = 'listing1'>
              <div className = 'profile'>

              </div>
              <div className = 'trading'>

              </div>
              <div className = 'receiving'>

              </div>
              <div className = 'notes'>

              </div>
              <div className = 'tradelink'>

              </div>
            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            <div className = 'listing1'>

            </div>
            
            

            
        </div>
    </div>
  )
}

export default Marketplace