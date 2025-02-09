import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { useQuery } from 'react-query';
import { ThreeDots } from 'react-loader-spinner';

export default function CategorySlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1,
      arrows: false,
    };

    function getALlCategories(){
      return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }
const {data,isLoading}=useQuery('category',getALlCategories,{
  refetchOnMount:false
})

console.log('Getting categories...' ,data?.data.data)

if(isLoading){
  <ThreeDots
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />
}


  return (
    <>
    <div className='my-5'>
 <Slider {...settings}>
  {data?.data.data.map((category,idx)=>{
    return(
      <div key={idx}>
      <img className='w-100 ' style={{height:'220px'}} src={category.image} alt="category-img" /> 
      <h5 className='text-center my-3 main-color pointer main-hover'>{category.name}</h5>
     </div>
     
    )
  })}
    </Slider>
    </div>
    </>
  )
}
