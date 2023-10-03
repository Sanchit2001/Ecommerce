import React, { Fragment, useEffect, useRef,useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import Metadata from "../../pages/Metadata";

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";

import axios from "axios";
import "./Payment.css";
import { useNavigate } from "react-router-dom";
import {createOrder, clearErrors } from "../../actions/orderAction";
 
const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const payBtn = useRef(null);
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  //const { error } = useSelector((state) => state.newOrder);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };


  const submitHandler = async (e) =>{
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        alert(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };

          dispatch(createOrder(order));

          navigate("/success");
        } else {
          alert("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert(error.response.data.message);
    }
  }
  useEffect(() => {
    // if (error) {
    //   alert(error);
    //   dispatch(clearErrors());
    // }
  }, [dispatch]);

  return (
    <Fragment>
      <Metadata title="Payment" />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          Card Info
          <div>
            <i className="fa-solid fa-credit-card"></i>
             <CardNumberElement className="paymentInput" />
          </div>
          <div>
          <i className="fa-regular fa-calendar-days"></i>
           <CardExpiryElement className="paymentInput" />
          </div>
          <div>
          <i className="fa-solid fa-key"></i>
           <CardCvcElement className="paymentInput" /> 
          </div>
          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div> 
    </Fragment>
  );
};

export default Payment;