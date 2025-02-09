import axios from 'axios'
import React, { useContext, useState } from 'react'
import { cartContext } from '../../context/cartContext.js'
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Payment() {
  
const [isLoading, setisLoading] = useState(false)
const navigate=useNavigate()

  const{
    cartId,
    setCartProducts,
    setTotalCartPrice,
    setNumOfCartItems
  }
  =useContext(cartContext)


  async function confirmPayment(){
    setisLoading(true)
    const phoneVal=document.querySelector('#phone').value
    const cityVal=document.querySelector('#city').value
    const detailsVal=document.querySelector('#details').value
    
    const shippingAddress={
      "shippingAddress":{
        "details": detailsVal,
        "phone": phoneVal,
        "city": cityVal
      }
    }
    if(phoneVal==='' || cityVal==='' || detailsVal===''){
      toast.error("Please Fill All Fields")
      setisLoading(false)
      return
    }
    try {
    const {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,shippingAddress,{
      headers:{token:localStorage.getItem('tkn')}
    })
    if(data.status==='success'){
      setCartProducts([])
      setTotalCartPrice(0)
      setNumOfCartItems(0)
      toast.success("Order Placed Successfully")
      console.log(data) 
      setTimeout(()=>{
        navigate('/products')
      },1000)
    }
    } catch (error) {
      toast.error("Order Cannot Be Placed")
      console.log(error)
    }
    setisLoading(false)
  }

  async function confirmCreditPayment(){
    const phoneVal=document.querySelector('#phone').value
    const cityVal=document.querySelector('#city').value
    const detailsVal=document.querySelector('#details').value
    
    const shippingAddress={
      "shippingAddress":{
        "details": detailsVal,
        "phone": phoneVal,
        "city": cityVal
      }
    }
    if(phoneVal==='' || cityVal==='' || detailsVal===''){
      toast.error("Please Fill All Fields")
      setisLoading(false)
      return
    }

    try {
      const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,shippingAddress,{
        headers:{token:localStorage.getItem('tkn')},
        params:{url:"http://localhost:3000"}
      })  
      window.open(data.session.url)
    } 
    catch (error) {
      console.log(error);
    }
  }




  return <>
  <Helmet>
    <title>Payment</title>
    <meta name="payment" content="you can pay for ur cart here" />
  </Helmet>
    <div className="container text-center main-color m-5" >
      <h2>Payment</h2>

      <form className='text-start w-50 mx-auto'>
  <div className="mb-4">
    <label for="phoneInput" className="form-label ">Phone</label>
    <input type="tel" className="form-control" id="phone"/>
  </div>
  <div className="mb-4">
    <label for="city" className="form-label">City</label>
    <input type="text" className="form-control" id="city"/>
  </div>
  <div className="mb-4 ">
    <label  for="">Details</label>
    <textarea type="text" className="form-control" id="details" style={{resize:"none"}}/>
  </div>
</form>
  <button type="button" className="btn btn-success" onClick={confirmPayment} disabled={isLoading}>

    {isLoading?
   <ThreeDots
   visible={true}
   height="30"
   width="30"
   color="#fff"
   radius="9"
   ariaLabel="three-dots-loading"
   wrapperStyle={{}}
   wrapperClass=""
   />:'Pay Cash'}
  </button>

  <button type="button" className="btn btn-warning mx-4 text-light" onClick={confirmCreditPayment} disabled={isLoading}>
    {isLoading?
    <ThreeDots
    visible={true}
    height="30"
    width="30"
    color="#fff"
    radius="9"
    ariaLabel="three-dots-loading"
    wrapperStyle={{}}
    wrapperClass=""
    />:'Pay with credit'}
   </button>
    </div>
      </>
}
