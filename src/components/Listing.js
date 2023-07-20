import React, {useState, useEffect} from 'react'
import './Listing.css'
import ReactMarkdown from "react-markdown"
import Item from './Item.js'

function Listing({
    type,
    ProfilePic,
    ItemsTradingImage,
    ItemsTradingText,
    ItemsReceivingImage,
    ItemsReceivingText,
    Notes,
    Tradelink,
    key,
    onClick,
    id
}) {

  const [visible, setVisible] = useState(true)

  useEffect(() => {

  }, [visible])

  if (visible) {
  return (
    <div className = {type == 1 ? 'listing1' : 'listing2'}>
              <div className = 'profile'>
                <img className = "profilepic-listing" src = {`${ProfilePic}`}/>
              </div>
                {ItemsTradingImage ? <div className = 'trading'>
                  {ItemsTradingImage.map((prop, index) => {
                      return(
                        <Item
                          version = {2}
                          
                          image = {prop}
                        />
                      )
                  })}
              </div> : <div className = 'trading'/>}
              {ItemsReceivingText ? <div className = 'receiving'>
              {ItemsReceivingImage.map((prop, index) => {
                      return(
                        <Item
                          version = {2}
                          
                          image = {prop}
                        />
                      )
                  })}
              </div> : <div className = 'receiving'/>}
              <div className = 'notes'>
                <p className = 'notes-text'>{Notes}</p>
              </div>
              <div className = 'tradelink'>
                <a href = {Tradelink} target = "_blank" className = 'notes-text'>{Tradelink}</a>
              </div>
              {type != 1 ? <div className = 'cancel-box'>
                <div className="Listing-x-cancel" onClick = {() => {onClick(id); setVisible(false)}}>
                  <i className="fa-light fa-xmark" style = {{fontSize: "4em"}}></i>
                </div>
              </div> : null}
            </div>
            )
                } else return(null)
}

export default Listing