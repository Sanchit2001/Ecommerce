import React from 'react'
import {Link} from 'react-router-dom';
import './Card.css';
import ReactStars from 'react-rating-stars-component'; 


var op = parseInt(3000);
const Card = ({item}) => {
  const options = {
    edit:false,
    color:"rgba(20,20,20,0.4)",
    activeColor:"tomato",
    value:item.avgRating,
    isHalf:true,
} 
  return (
    <Link className='productCard' to={`/product/${item._id}`}>
      <img src={item.images!=null ?item.images[1]?.url: ""} alt={item.name}/>
      <img className="second" src={item.images!=null ?item.images[0]?.url: ""} alt={item.name}/>
      <p>{item.name}</p>
      <div className='reviews'>
      <ReactStars {...options} classNames='stars' size={window.innerWidth>800? 25:16}/>
       <span>({item.noOfReviews} Reviews)</span>
      </div>
      
      <div>
        <h3 className='old'>Rs. {item.oldPrice? item.oldPrice:op}</h3>
        <h3>Rs. {item.price}</h3>
        <h3 className='discount'>(-{Math.round(100*(item.oldPrice-item.price)/item.oldPrice)}%)</h3>
      </div>
    </Link>
  )
}

export default Card;