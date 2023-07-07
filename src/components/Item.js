import React from 'react'
import './Item.css'

export const Item = ({
    image,
    name
}) => {
    return(
        <div style = {{backgroundImage: `url(https://steamcommunity-a.akamaihd.net/economy/image/${image})`, backgroundRepeat: 'no-repeat'}} class="item">{name}</div>
    )
}



export default Item