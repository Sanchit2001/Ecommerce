import React from 'react';
import Card from './Card';
import { useRef ,useState} from 'react';


const Catagories = [
    {
        id:1,
        name: "Ayurvedic Medicine",
        img:{url:"https://img.freepik.com/free-vector/medical-design-poster-with-original-medicinal-capsule-consisting-green-blue-parts-leaves-as-life-symbol-illustration_1284-53606.jpg?size=626&ext=jpg"},
    },
    {
        id:2,
        name: "Syrups & Kadhas",
        img:{url:"https://img.freepik.com/premium-photo/indian-ayurvedic-kadha-karha-health-tonic-drink-fighting-corona-seasonal-infections-made-using-ginger-tulsi-black-pepper-clove-honey_466689-26281.jpg?w=360"},
    },
    {
        id:3,
        name: "Oils and Ointments",
        img:{url:"https://img.freepik.com/free-vector/detailed-jojoba-element-collection_52683-55758.jpg?size=626&ext=jpg"},
    },
    {
        id:4,
        name: "Skin & Hair Care",
        img:{url:"https://img.freepik.com/free-vector/skincare-flat-cartoon-composition-with-young-woman-examining-her-face-with-magnifier_1284-54555.jpg?size=626&ext=jpg"},
    },
    {
        id:5,
        name: "Immunity & Wellness",
        img:{url:"https://img.freepik.com/free-vector/immune-system-concept_23-2148577507.jpg?size=626&ext=jpg"},
    },
    {
        id:6,
        name: "Nutrition & Supplements",
        img:{url:"https://img.freepik.com/free-vector/vitamin-food-infographic_23-2148484942.jpg?size=626&ext=jpg"},
    },
]

const Scroller = () => {
    let scrl = useRef(null);
  const [scrollX, setscrollX] = useState(0);
  const [scrolEnd, setscrolEnd] = useState(false);

  //Slide click
  const slide = (shift) => {
    scrl.current.scrollLeft += shift;
    setscrollX(scrollX + shift);

    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };

  const scrollCheck = () => {
    setscrollX(scrl.current.scrollLeft);
    if (
      Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
      scrl.current.offsetWidth
    ) {
      setscrolEnd(true);
    } else {
      setscrolEnd(false);
    }
  };
  return (   
    <div className="scroller-container">
        <h1>Categories</h1>
        
        <i id="left-arrow" className="fa-solid fa-chevron-left" onClick={()=>slide(-window.innerWidth/2)}/>
       
           
        <i id="right-arrow" className="fa-solid fa-chevron-right" onClick={()=>slide(window.innerWidth/2)}/>
        
        
        <div>
            <div className='scroller' ref={scrl} onScroll={scrollCheck}>
                {Catagories.map(item=>(
                    <Card item={item} key={item.id}/>
                ))}
            </div>
        </div>
        
    </div>
    
    
  )
}

export default Scroller;