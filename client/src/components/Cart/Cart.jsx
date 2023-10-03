import React from 'react'
import './Cart.css'
import Metadata from '../../pages/Metadata';
import CartItemCard from './CartItemCard';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, removeItemFromCart } from '../../actions/cartActions';
import { Link, useNavigate } from 'react-router-dom';


const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const {isAuthenticated} = useSelector((state)=>state.user)
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }
    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemToCart(id, newQty));
    }
    const deleteItem = (id) => {
        dispatch(removeItemFromCart(id));
    }

    const checkoutHandler = ()=>{
        
        navigate("/shipping");
    
    }

    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className='emptyCart'>
                    <p>No Items in Your Cart</p>
                    <Link to='/products'>View Products</Link>
                </div>
            ) :
                (
                    <Fragment>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {cartItems && cartItems.map((item,index) => (
                                <div className="cartContainer">
                                    <CartItemCard item={item} deleteItem={deleteItem} key={index}/>
                                    <div className="cartInput">
                                        <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                    </div>
                                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                                </div>
                            ))}

                            <div className='cartGrossProfit'>
                                <div></div>
                                <div className='cartGrossProfitBox'>
                                    <p>Gross Total</p>
                                    <p>{`₹${cartItems.reduce((acc,item) => acc+item.quantity*item.price,0)}`}</p>
                                </div>
                                <div></div>
                                <div className='checkOutBtn'>
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Fragment>

    )
}

export default Cart