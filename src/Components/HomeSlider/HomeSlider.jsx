import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    };

  return (
    <>
    <div className='mb-4'>
 <Slider {...settings}>
      <div>
<img className='w-100 ' style={{height:'460px'}} src={require('../../imgs/images/slider-image-1.jpeg')} alt="slider-img" /> 
     </div>
      <div>
<img className='w-100 ' style={{height:'460px'}} src={require('../../imgs/images/slider-image-2.jpeg')} alt="slider-img2" />  
    </div>
      <div>
<img className='w-100 ' style={{height:'460px'}} src={require('../../imgs/images/slider-image-3.jpeg')} alt="slider-img3" />  
    </div>
      <div>
<img className='w-100 ' style={{height:'460px'}} src={require('../../imgs/images/slider-2.jpeg')} alt="slider-img2" /> 
     </div>
    </Slider>
    </div>
    </>
  )
}
