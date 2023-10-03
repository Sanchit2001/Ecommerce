import React, { useEffect, useState } from 'react'
import './Product.css';
import Metadata from '../Metadata';
import { useSelector,useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { getProductDetails } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import ReviewCard from './ReviewCard/ReviewCard';
import {addItemToCart} from '../../actions/cartActions'; 
const Product = ({match}) => {
  const [mainImage,setMainImage] = useState(0);
  const [quantity,setQuantity] = useState(1);
  const {id} = useParams();
  const dispatch = useDispatch();
  const {product,loading,error} = useSelector(
    (state)=>state.productDetails
  );

  const addToCartHandler =() =>{
    dispatch(addItemToCart(id,quantity));
    alert("Item Added To Cart");
  }

  useEffect(()=>{
    dispatch(getProductDetails(id))
  },[dispatch,id]);
  const images=[
    {url:"https://media.istockphoto.com/id/897079662/es/foto/semillas-de-girasol.jpg?s=1024x1024&w=is&k=20&c=lbiUEICJLMq5-B5ID1b70EAyt7-74xWktaGU3mlLHOA="},
        {url:"https://media.istockphoto.com/id/897059802/photo/sunflower-seeds.jpg?s=612x612&w=0&k=20&c=RL4-RL9qAm6EsKaJknLV50gfh1kg9HJvIctoM2J5_OM="},
        {url:"https://media.istockphoto.com/id/931479712/photo/flax-seed-in-a-jute-bag.jpg?s=612x612&w=0&k=20&c=qeezBhndCzroCRkWjKQJdv4nfBmc4HCyQvjDFSc3Z3M="},
        {url:"https://media.istockphoto.com/id/897079662/es/foto/semillas-de-girasol.jpg?s=1024x1024&w=is&k=20&c=lbiUEICJLMq5-B5ID1b70EAyt7-74xWktaGU3mlLHOA="},
        {url:"https://media.istockphoto.com/id/897059802/photo/sunflower-seeds.jpg?s=612x612&w=0&k=20&c=RL4-RL9qAm6EsKaJknLV50gfh1kg9HJvIctoM2J5_OM="},
        {url:"https://media.istockphoto.com/id/931479712/photo/flax-seed-in-a-jute-bag.jpg?s=612x612&w=0&k=20&c=qeezBhndCzroCRkWjKQJdv4nfBmc4HCyQvjDFSc3Z3M="},
    
    ] 

    const options = {
      edit:false,
      color:"rgba(20,20,20,0.4)",
      activeColor:"tomato",
      value:product.avgRating,
      isHalf:true,
  }     
  return (
    <div>
    <Metadata title={product.name}/>
    {loading?(
      <Loading/>
    ):(
      <div>
        <div className='product'>
          <div className='left'>
            <div className='mainImage'>
              <img src = {images[mainImage].url} alt='Image Here'/>
            </div>
            <div className='images'>
              {images.map((image,index)=>(
                  <img src={image.url} key={index} onClick={e=>setMainImage(index)}/>
                  ))}
            </div>      
          </div>
        <div className='right'>
          <h1>{product.name}</h1>
          <span className='price'>₹ {product.price}</span>
          <p> {product.description}
          </p>
          <div className='quantity'>
            <button onClick={()=>{
                if(quantity<=1){
                  return;
                }
                setQuantity((prev)=>prev-1)
              }}>-</button>
            {quantity}
            <button onClick={()=>{
              if(product.stock<=quantity){
                return;
              }
              setQuantity((prev)=>prev+1)
            }}>+</button>
            
            <button className='add' onClick={addToCartHandler}>
            <i className='fa-sharp fa-solid fa-cart-shopping'/>
              ADD TO CART
            </button>
          </div>
          <div className='info'>
            <span>Category: {product.category}</span>
            <span>Name: {product.name}</span>
          </div>
          <hr/>
          <div className='details'>
            <span>Ratings:</span>
            <span><ReactStars {...options} classNames='stars' size={25}/> <span>({product.noOfReviews} Reviews)</span></span>
            <hr/>
          </div>
          <button className='submitReview'>Submit Review</button>
        </div>
      </div>
      <h3 className='reviewsHeading'>Reviews</h3>
      {product.reviews && product.reviews[0]?(
        <div className='reviewContainer'>
          {product.reviews && 
          product.reviews.map((review,index)=><ReviewCard review={review} key={index}/>)}
        </div>
      ):(<p>no reviews yet</p>)}
    </div>
    )}
    </div>
  )
}

export default Product;