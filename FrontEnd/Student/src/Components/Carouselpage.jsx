import Carousel from 'react-bootstrap/Carousel';
import pic1 from '../assets/banner.png'
import pic2 from '../assets/banner2.jpg'
import pic3 from '../assets/banner3.jpg'

function CarouselPage(){
    return(
      
      <Carousel>
      <Carousel.Item>
      <img src={pic1} alt="" className='w-100' style={{height:'600px'}} />
        <Carousel.Caption>
         
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={pic2} alt="" className='w-100' style={{height:'600px'}} />
        <Carousel.Caption>
        
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img src={pic3} alt="" className='w-100' style={{height:'600px'}} />
        <Carousel.Caption>
       
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
export default CarouselPage