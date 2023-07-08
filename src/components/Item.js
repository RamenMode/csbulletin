import React from 'react'
import './Item.css'

export const Item = ({
    image,
    name,
    onClick,
    key,
    pressed
}) => {
    return(
        <>
        {pressed ? null : <button style = {{backgroundImage: image, backgroundRepeat: 'no-repeat'}} class="item" onClick = {onClick}>{name}</button>}
        </>
    )
}



export default Item