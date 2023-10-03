import { useEffect, useState } from 'react'
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  BrowserRouter as Router,
  Outlet,
  Routes,
  redirect,
  Navigate
} from "react-router-dom";
import './App.css'
import Product from './pages/Product/Product';
import Products from './pages/Products/Products';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import AboutUs from './components/About/AboutUs';
import Cart from './components/Cart/Cart';
import LoginSignUp from './pages/User/LoginSignUp';
import UserAccount from './pages/UserAccount/UserAccount';
import { useSelector } from 'react-redux';
import { clearErrors, loadUser } from './actions/userAction';
import store from './store';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from './components/Cart/orderSuccess';
// const Layout = () =>{
//   return (
//     <div>
//       <Navbar/>
//       <Outlet/>
//       <Footer/>
//     </div>
//   )
// }

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Layout/>,
//     children:[
//       {
//         path:'/',
//         element:<Home/>
//       },
//       {
//         path:'/products',
//         element:<Products/>
//       },
//       {
//         path:'/products/:keyword',
//         element:<Products/>
//       },
//       {
//         path:'/product/:id',
//         element:<Product/>
//       },
//       {
//         path:'/us',
//         element:<AboutUs/>
//       },
//       {
//         path:'/cart',
//         element:<Cart/>
//       },
//       {
//         path:'/login',
//         element:<LoginSignUp/>
//       },
//       {
//         path:'/account',
//         element:<ProtectedRoute component={UserAccount}/>
//       },
//       {
//         path:'/shipping',
//         element:<ProtectedRoute component={Shipping}/>
//       },
//       {
//         path:'/confirmorder',
//         element:<ProtectedRoute component={ConfirmOrder}/>
//       },
//       {
//         path:'/payment',
//         element:<ProtectedRoute component={Payment}/>
//       }
//     ]
//   },
  

// ])

function App() {
  
  const {isAuthenticated} = useSelector(state=>state.user);

  useEffect(()=>{
      store.dispatch(loadUser());
      getStripeApiKey();
  },[]);

  const [stripeApiKey,setStripeApiKey] = useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }  
  return (
    // <RouterProvider router={router}></RouterProvider>
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' Component={Home}/>
        <Route exact path='/products' Component={Products}/>
        <Route exact path='/products/:keyword' Component={Products}/>
        <Route exact path='/product/:id' Component={Product}/>
        <Route exact path='/us' Component={AboutUs}/>
        <Route exact path='/cart' Component={Cart}/>
        <Route exact path='/login' Component={LoginSignUp}/>
        <Route exact path='/payment' element={stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute component={Payment} />
        </Elements>}/>
        <Route exact path='/confirmorder' element={<ProtectedRoute component={ConfirmOrder}/>}/>
        <Route exact path='/success' element={<ProtectedRoute component={OrderSuccess}/>}/>
        <Route exact path='/shipping' element={<ProtectedRoute component={Shipping}/>}/>
        <Route exact path='/account' element={<ProtectedRoute component={UserAccount}/>}/>
      </Routes>
      
      <Footer/>
    </Router>
  )
}

export default App
