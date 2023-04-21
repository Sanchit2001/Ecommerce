import React,{useEffect} from 'react';
import Card from '../components/Card/Card';
import './Lists.css';
import { getProduct } from '../actions/productActions';
import { useSelector,useDispatch } from 'react-redux';
import Loading from '../components/Loading/Loading';
const data = [
    {
        id:1,
        img:[{url:"https://media.istockphoto.com/id/1175603836/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=KPy_oIeHma7X3_t_QSzB3DrRqKo_FfFOe-LaBwe3JeM="},
        {url:"https://media.istockphoto.com/id/172360856/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=8C9aIiJXJ5DOuWsQ8W7cjoMK77176BkbzRa7j2VaufU="
    }],
        title:"Pumpkin Seeds",
        isNew:true,
        avgRating:4.2,
        oldPrice:249,
        price:199,
    },
    {
        id:2,
        img:[{url:"https://media.istockphoto.com/id/897079662/es/foto/semillas-de-girasol.jpg?s=1024x1024&w=is&k=20&c=lbiUEICJLMq5-B5ID1b70EAyt7-74xWktaGU3mlLHOA="},
        {url:"https://media.istockphoto.com/id/897059802/photo/sunflower-seeds.jpg?s=612x612&w=0&k=20&c=RL4-RL9qAm6EsKaJknLV50gfh1kg9HJvIctoM2J5_OM="
    }],
        title:"Sunflower Seeds",
        isNew:true,
        avgRating:3.6,
        oldPrice:299,
        price:249,
    },
    {
        id:3,
        img:[{url:"https://media.istockphoto.com/id/186558896/photo/brown-wooden-spoonful-of-chia-seeds.jpg?s=612x612&w=0&k=20&c=o-lNr42SR2W9TpxDx8B1bNcA5VYtgPfiIDOT2-X3ISg="},
        {url:"https://media.istockphoto.com/id/812750706/photo/chia-seeds-in-a-wooden-bowl-isolated-on-white.jpg?s=612x612&w=0&k=20&c=rUDV2H6fMpooqHz_XWjtuxZOnkKv4DM_3_yaWgDMf0o="
    }],
        title:"Chia Seeds",
        isNew:true,
        avgRating:4.5,
        oldPrice:290,
        price:225,
    },
    {
        id:4,
        img:[{url:"https://media.istockphoto.com/id/931479712/photo/flax-seed-in-a-jute-bag.jpg?s=612x612&w=0&k=20&c=qeezBhndCzroCRkWjKQJdv4nfBmc4HCyQvjDFSc3Z3M="},
        {url:"https://media.istockphoto.com/id/472006709/photo/linseed.jpg?s=612x612&w=0&k=20&c=g1TjHW8GPB7EdjKAElTebsCYpkPcVSZrX29bOg4Ag0o="
    }],
        title:"Flax Seeds",
        isNew:true,
        avgRating:4,
        oldPrice:190,
        price:120,
    },
    {
        id:5,
        img:[{url:"https://media.istockphoto.com/id/1175603836/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=KPy_oIeHma7X3_t_QSzB3DrRqKo_FfFOe-LaBwe3JeM="},
        {url:"https://media.istockphoto.com/id/172360856/es/foto/semillas-de-calabaza.jpg?s=1024x1024&w=is&k=20&c=8C9aIiJXJ5DOuWsQ8W7cjoMK77176BkbzRa7j2VaufU="
    }],
        title:"Pumpkin Seeds",
        isNew:true,
        avgRating:4.2,
        oldPrice:249,
        price:199,
    },
    {
        id:6,
        img:[{url:"https://media.istockphoto.com/id/897079662/es/foto/semillas-de-girasol.jpg?s=1024x1024&w=is&k=20&c=lbiUEICJLMq5-B5ID1b70EAyt7-74xWktaGU3mlLHOA="},
        {url:"https://media.istockphoto.com/id/897059802/photo/sunflower-seeds.jpg?s=612x612&w=0&k=20&c=RL4-RL9qAm6EsKaJknLV50gfh1kg9HJvIctoM2J5_OM="
    }],
        title:"Sunflower Seeds",
        isNew:true,
        avgRating:3.6,
        oldPrice:299,
        price:249,
    },
    {
        id:7,
        img:[{url:"https://media.istockphoto.com/id/186558896/photo/brown-wooden-spoonful-of-chia-seeds.jpg?s=612x612&w=0&k=20&c=o-lNr42SR2W9TpxDx8B1bNcA5VYtgPfiIDOT2-X3ISg="},
        {url:"https://media.istockphoto.com/id/812750706/photo/chia-seeds-in-a-wooden-bowl-isolated-on-white.jpg?s=612x612&w=0&k=20&c=rUDV2H6fMpooqHz_XWjtuxZOnkKv4DM_3_yaWgDMf0o="
    }],
        title:"Chia Seeds",
        isNew:true,
        avgRating:4.5,
        oldPrice:290,
        price:225,
    },
    {
        id:8,
        img:[{url:"https://media.istockphoto.com/id/931479712/photo/flax-seed-in-a-jute-bag.jpg?s=612x612&w=0&k=20&c=qeezBhndCzroCRkWjKQJdv4nfBmc4HCyQvjDFSc3Z3M="},
        {url:"https://media.istockphoto.com/id/472006709/photo/linseed.jpg?s=612x612&w=0&k=20&c=g1TjHW8GPB7EdjKAElTebsCYpkPcVSZrX29bOg4Ag0o="
    }],
        title:"Flax Seeds",
        isNew:true,
        avgRating:4,
        oldPrice:190,
        price:120,
    },
]
const Lists = () => {
    const dispatch = useDispatch();
    useEffect(() =>{
    dispatch(getProduct());
  },[dispatch]);
  const {loading,error,products,productCount} = useSelector((state)=>state.products);
    return (
        <div>
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

