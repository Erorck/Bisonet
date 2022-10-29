import Carousel from 'react-bootstrap/Carousel';
import FirstSlide from '../resources/ClassRoom.jpg';
import SecondSlide from '../resources/StudenstSlidePhoto.jpg';
import '../css/index.css'

function CarouselFade() {
  return (
    <Carousel fade>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={FirstSlide}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={SecondSlide}
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFade;