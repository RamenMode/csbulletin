import React from 'react'
import './Item.css'

export const Item = ({
    image,
    name,
    onClick,
    key,
    pressed,
    style,
    version
}) => {
    return(
        <>
        {pressed ? null : <button style = {{backgroundImage: image, backgroundRepeat: 'no-repeat'}} className={version == 2? "item-modified" : "item"} onClick = {onClick}>{name}</button>}
        </>
    )
}



export default Item