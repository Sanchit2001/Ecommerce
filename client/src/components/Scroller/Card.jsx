import React from 'react'
import './Scroller.css';
const Card = ({item}) => {
  return (
    <div className="container">
    <img src={item.img.url} alt={item.name} className="image"/>
    <div className="overlay">
      <div className="text">{item.name}</div>
    </div>
  </div>
    )
}

export default Card;