import React, { useEffect, useState } from 'react'
import './Product.css';
import Metadata from '../Metadata';
import { useSelector,useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { getProductDetails } from '../../actions/productActions';
import { useParams } from 'react-router-dom';
const Product = ({match}) => {
  const [mainImage,setMainImage] = useState(0);
  const [quantity,setQuantity] = useState(1);
  const dispatch = useDispatch();
  const {id} = useParams();
  const {} = useSelector(state=>state.productDetails)
  useEffect(()=>{
    dispatch(getProductDetails(id))
  })
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
      value:4,
      isHalf:true,
  }       
  return (
    <>
    <Metadata title="Product Name"/>
    <div className='product'>
      <div className='left'>
        <div className='mainImage'>
              <img src = {images[mainImage].url} alt='fuck'/>
        </div>
        <div className='images'>
          {images.map((image,index)=>(
                  <img src={image.url} key={index} onClick={e=>setMainImage(index)}/>
                ))}
        </div>      
      </div>
      
      <div className='right'>
          <h1>Title</h1>
          <span className='price'>Rs. 199</span>
          <p>Description of the product FHufghdububuvbfbubuu ebufubugb
            jbhbcffhbufbc fudsfbuigfbvbf hbfdfbhibg hhbfduifujdfvohv 
          </p>
          <div className='quantity'>
            <button onClick={()=>setQuantity((prev)=>prev+1)}>+</button>
            {quantity}
            <button onClick={()=>setQuantity((prev)=>prev-1)}>-</button>
          </div>
          <button className='add'>
            <i className='fa-sharp fa-solid fa-cart-shopping'/>
            ADD TO CART
          </button>
          <div className='info'>
            <span>Category: Nutrition Supplement</span>
            <span>Name: Seeds, Dry fruits</span>
          </div>
          <hr/>
          <div className='details'>
            <span>Ratings:</span>
            <span><ReactStars {...options} classNames='stars' size={25}/> <span>(2 Reviews)</span></span>
            <hr/>
          </div>
      </div>
    </div>
    </>
  )
}

export default Product;