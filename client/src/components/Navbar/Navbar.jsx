import React,{useState,useEffect} from 'react'
import Header from './Header/Header'

const Navbar = () => {
  const [dimensions, setDimensions] =useState({ 
    height: window.innerHeight,
    width: window.innerWidth
  })
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth
      })
    }

    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    }
});
  return (
    <div className='navbar' style={{width:"100%",background:"#fff",zIndex:"2"}}><Header/></div>
  )
}

export default Navbar