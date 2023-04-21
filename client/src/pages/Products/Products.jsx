import React, { useState,useEffect } from 'react';
import Lists from '../../Lists/Lists';
import { useParams } from 'react-router-dom';
import './Products.css';
import Metadata from '../Metadata';


const Products = () => {

  const catId = parseInt(useParams.id)
  const [sort,setSort] = useState(null)
  return (
    <div className='products'>
      <Metadata title="All Products"/>
        <div className='left'>
          <div className='filterItem'>
            <h2>Categories</h2>
            <div className='inputItem'>
                <input type="checkbox" id='1' value={1}/>
                <label htmlFor='1'>Ayurvedic Medicines</label>
            </div>
            <div className='inputItem'>
                <input type="checkbox" id='2' value={2}/>
                <label htmlFor='2'>Hair & Skin care</label>
            </div>
            <div className='inputItem'>
                <input type="checkbox" id='3' value={3}/>
                <label htmlFor='3'>Syrups & Kadhas</label>
            </div>
            <div className='inputItem'>
                <input type="checkbox" id='4' value={4}/>
                <label htmlFor='4'>Oils & Ointments</label>
            </div>
            <div className='inputItem'>
                <input type="checkbox" id='5' value={5}/>
                <label htmlFor='5'>Immunity & Wellness</label>
            </div>
            <div className='inputItem'>
                <input type="checkbox" id='6' value={6}/>
                <label htmlFor='6'>Nutrition & Supplements</label>
            </div>
          </div>
          <div className='filterItem'>
            <h2>Sort By</h2>
            <div className='inputItem'>
                <input type="radio" id='asc' name="price" onChange={e=>setSort("asc")}/>
                <label htmlFor='asc'>Price: low to high</label>
            </div>
            <div className='inputItem'>
                <input type="radio" id='desc' name="price"  onChange={e=>setSort("desc")}/>
                <label htmlFor='desc'>Price: high to low</label>
            </div>
          </div>
        </div>  
          
        <div className='right'>
          <Lists catId={catId} sort={sort}/>
        </div>
    </div>
  )
}

export default Products;