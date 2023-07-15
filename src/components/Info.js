import React from 'react'
import './Info.css'

function Info() {
  return (
    <body className = "background1">
        <div className = "container">
            <h2 style = {{textAlign: "center"}}>Frequently Asked Questions</h2>
            <br></br>
            <h3 className = "info-h3">Who are we?</h3>
            <br></br>
            <p style = {{fontSize: 18}}>We're a traditional peer to peer trading site that allows players to list skins they own from their inventory and indicate which items they wish to receive, streamlining the process of trading without any need for buying and selling with real funds. </p>
            <br></br>
            <h3 className = "info-h3">How does it work?</h3>
            <br></br>
            <p style = {{fontSize: 18}}>By signing in and setting your inventory as public, you enable us to view your inventory. This allows you to select the items that you wish to trade, and in return, you select items that you'd like to receive. This can be a general list or a specific trade that you want. Other users can search for and view these trades in the Bulletin, and offer a trade for you through the tradelink you provide in your trade request. </p>
            <br></br>
            <h3 className = "info-h3">Are we safe?</h3>
            <br></br>
            <p style = {{fontSize: 18}}>Since all trades are peer to peer with no obligations in accepting trades as on other sites, we do not require an API Key but rather only a Steam64 ID. Additionally, due to current server limitations, please make sure trades through steam are accurate with descriptions on the website</p>
            <br></br>
            <h3 className = "info-h3">How do we make money?</h3>
            <br></br>
            <p style = {{fontSize: 18}}>We don't. CS Bulletin was created with the intention of allowing CS:GO players share their passion of trading without any obstacles and fees. Many traditional trading communities exist such as on Discord and Reddit, but we provide complete clarity and exposure for desired trades for traders to trade as they wish. If you'd like to support our mission, consider donating a skin or two <a href = "https://steamcommunity.com/tradeoffer/new/?partner=188118015&token=f2F4wEbJ">here</a>. It all goes a long way in helping this website host its services.</p>
        </div>
    </body>
  )
}

export default Info