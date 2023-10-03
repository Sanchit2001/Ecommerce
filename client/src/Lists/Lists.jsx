import React,{useEffect} from 'react';
import Card from '../components/Card/Card';
import './Lists.css';
import { getProduct } from '../actions/productActions';
import { useSelector,useDispatch } from 'react-redux';
import Loading from '../components/Loading/Loading';

const Lists = ({keyword}) => {
    const dispatch = useDispatch();
    useEffect(() =>{
    dispatch(getProduct(keyword)); 
  },[dispatch,keyword]);

  const {loading,error,products,productCount} = useSelector((state)=>state.products);
    return (
        <div>
            Showing results for {keyword}....
            {loading? (<Loading/>)
            :(
            <div className='List'>
                {products?.map(item=>(
                <Card item={item} key={item._id}/> 
                ))}
            </div>
            )}
            
        </div>
        
    )
}

export default Lists;

