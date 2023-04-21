import React from 'react'
import './Cart.css'
import Metadata from '../../pages/Metadata';
const data = [
    {
        id:1,
        img:[{url:"https://media.istockphoto.com/id/1175603836/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=KPy_oIeHma7X3_t_QSzB3DrRqKo_FfFOe-LaBwe3JeM="},
        {url:"https://media.istockphoto.com/id/172360856/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=8C9aIiJXJ5DOuWsQ8W7cjoMK77176BkbzRa7j2VaufU="}],
        title:"Pumpkin Seeds",
        desc:"description of nutritious pumpkin seeds",
        avgRating:4.2,
        oldPrice:249,
        price:199,
    },
    {
        id:2,
        img:[{url:"https://media.istockphoto.com/id/897079662/es/foto/semillas-de-girasol.jpg?s=1024x1024&w=is&k=20&c=lbiUEICJLMq5-B5ID1b70EAyt7-74xWktaGU3mlLHOA="},
        {url:"https://media.istockphoto.com/id/897059802/photo/sunflower-seeds.jpg?s=612x612&w=0&k=20&c=RL4-RL9qAm6EsKaJknLV50gfh1kg9HJvIctoM2J5_OM="}],
        title:"Sunflower Seeds",
        desc:"description of nutritious sunflower seeds",
        avgRating:3.6,
        oldPrice:299,
        price:249,
    },
];
const Cart = () => {
  return (
    <div className='cart'>
        <Metadata title="Your Cart"/>
        <h1>Products in your cart</h1>
        {data?.map(item=>(
            <div className='item' key={item.id}>
                <img src={item.img[0].url}/>
                <div className='details'>
                    <h1>{item.title}</h1>
                    <p>{item.desc?.substring(0,100)}...</p>
                    <div className="price">1X Rs. {item.price}</div>
                </div>
                <i className="fa-regular fa-trash-can"/>
            </div>   
            
        ))}
        <hr/>
        <div className='total'>
            <span>SUBTOTAL</span>
            <span>Rs. 498</span>
        </div>
        <button>PROCEED TO CHECKOUT</button>
        <div className='reset'>RESET CART</div>
    </div>
  )
}

export default Cart