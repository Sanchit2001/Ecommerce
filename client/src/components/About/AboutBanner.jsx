import React from 'react'
import './About.css';
import {Link} from 'react-router-dom';

const AboutBanner = () => {
  return (
    <div className='about-container'>
        <h1>Welcome To Hiel Herbal</h1>
        <p> This is more about hiel herbal,..... 25+years in business,
             some more about produts, about supllements etc etc... 
             This is more about hiel herbal,..... 25+years in business,
             some more about produts, about supllements etc etc...
        </p>
        <Link to={'/us'} className='btn'>Learn More</Link>
    </div>
  )
}

export default AboutBanner