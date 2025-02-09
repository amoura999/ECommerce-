import axios  from 'axios'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'
import { cartContext } from '../../context/cartContext.js'
import {  toast  } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from 'react-helmet'
export default function ProductDetails() {

  const {addToCart}=useContext(cartContext)
  const{id}=useParams()
  const [isloading, setisloading] = useState(false)

  async function addProductToCart(id){
    setisloading(true)
    try {
      const res=  await addToCart(id)
      if(res.status==="success"){
        console.log(res);
        toast.success(res.message,{
         theme:"colored",
         position:"top-right"
        })
      }
    } catch (error) {
       toast.error("Cant Add the Product to cart")
    }
    finally{
      setisloading(false)
    }
  }


  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  const{isLoading,data}=useQuery('productDetails',getProductDetails)
console.log('Product Details...',data?.data.data);


  if (isLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <ThreeCircles
          visible={true}
          height="80"
          width="80"
          color="#fff"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return <>

  <Helmet>
        <title>{data.data.data.title.split(' ').slice(0,2).join(" ")}</title>
        <meta name="description" content="Helmet application" />
  </Helmet>
<div className="container">
  <div className="row align-items-center mt-5">
    <div className="col-md-3">
    <figure>
        <img className='w-100' src={data.data.data.imageCover} alt={data.data.data.title} />
      </figure>
    </div>

    <div className="col-md-9">
      <div className="details text-center">
      <h1>{data.data.data.title}</h1>
      <p className='text-muted'>{data.data.data.description}</p>
      <h3 className='mb-4'>Price : {data.data.data.price} EGP</h3>
      <button onClick={()=>{
        addProductToCart(data.data.data.id)
      }} className="w-50 p-3 rounded-3 main-bg-color border-white white-text text-center position-relative" disabled={isloading}>
        {isloading?<ThreeDots
  visible={true}
  height="30"
  width="30"
  color="#fff"
  radius="9"
  ariaLabel="three-dots-loading"
  wrapperStyle={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
  }}
  wrapperClass=""
  />:"Add to Cart"}
        </button>
      </div>
    </div>
  </div>
</div>
    </>
  
}
