import React from 'react'
import './Scroller.css';
import { Link } from 'react-router-dom';
const Card = ({item}) => {
  const keyword= item.name;
  return (
    <Link to={`/products/${keyword}`}>
      <div className="container">
        <img src={item.img.url} alt={item.name} className="image"/>
        <div className="overlay">
          <div className="text">{item.name}</div>
        </div>
      </div>
    </Link>
    
    )
}

export default Card;