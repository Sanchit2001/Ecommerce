import Carousel from 'react-bootstrap/Carousel';
import img from '../../assets/tempIng.jpeg';
import './Slider.css';
function Slider() {
  return (
    <Carousel className="carousel-slider">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="First slide"
          style={{height:"max-content"}}
        />
        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="Second slide"
        />

        
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;