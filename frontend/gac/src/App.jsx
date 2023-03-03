import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import GACNavbar from './Components/Navbar/GACNavbar';
import Home from './Components/Home/Home';
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <GACNavbar></GACNavbar>
      <Home></Home>
      <Footer></Footer>
    </>
  )
}

export default App
