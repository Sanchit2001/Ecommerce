import React from 'react'
import Slider from './Slider'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Scroller from '../../components/Scroller/Scroller';
import AboutBanner from '../../components/About/AboutBanner';
import Metadata from '../Metadata';
const Home = () => {
  return (
    <div>
      <Metadata title="Hiel Herbal"/>
      <Slider/>
      <FeaturedProducts type={"featured"}/>
      <Scroller/>
      <FeaturedProducts type={"trending"}/>
      <AboutBanner/>
    </div>
  )
}

export default Home