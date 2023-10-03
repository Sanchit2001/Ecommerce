import React from 'react';
import './ReviewCard.css';
import ReactStars from 'react-rating-stars-component';
const ReviewCard = ({review}) => {
    const options = {
        edit:false,
        color:"rgba(20,20,20,0.4)",
        activeColor:"tomato",
        value:review.rating,
        isHalf:true,
    }   
  return (
      
    <div className='reviewCard'>
        <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png?w=740&t=st=1682190558~exp=1682191158~hmac=9fc192f0c8668282d8737e1ca80d6dc3c97cce5eb555bf8005eba30bea1f9342'
        alt='user icon'/>
        <p>{review.name}</p>
        <ReactStars {...options}/>
        <span>{review.comment}</span>
    </div>
  )
}

export default ReviewCard