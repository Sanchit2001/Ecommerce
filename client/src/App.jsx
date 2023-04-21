import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
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

const Layout = () =>{
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path:"/",
    element:<Layout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
        path:'/products/:id',
        element:<Products/>
      },
      {
        path:'/product/:id',
        element:<Product/>
      },
      {
        path:'/us',
        element:<AboutUs/>
      },
      {
        path:'/cart',
        element:<Cart/>
      }
    ]
  },
  

])
function App() {
  const [count, setCount] = useState(0)

  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
