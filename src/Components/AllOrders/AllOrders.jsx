import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ThreeCircles } from 'react-loader-spinner';

export default function AllOrders() {
  const [useOrders, setuseOrders] = useState(null);

useEffect(()=>{
  const data=jwtDecode(localStorage.getItem('tkn'))
  console.log(data)
  getUserOrders(data.id)
},[])

async function getUserOrders(id){
  try {
    const {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
    console.log(data)
    setuseOrders(data)
  } catch (error) {
    console.log(error)
  }
}

if(useOrders===null) 
return <div className="vh-100 d-flex align-items-center justify-content-center">
<ThreeCircles
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
/>
</div>

  return <>
<Helmet>
      <title>All Orders</title>
      <meta name="description" content="Helmet application" />
</Helmet>

  <div className="container text-center main-color m-5" >
    <h2>All Orders</h2>
    <div className="row g-5">
      {useOrders.map(function(order,idx){
      return <div className="col-md-3" key={idx}>
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Order {order.id}</h4>
            <h5 className="card-text">{order.paymentMethodType}</h5>
            <p className="card-text">Total Price: <span className='main-color'>{order.totalOrderPrice} EGP</span></p>
            <p className="card-text">{order.shippingAddress.details}</p>
            <p className="card-text">{order.shippingAddress.city}</p>
            <p className="card-text">{order.shippingAddress.phone}</p>
          </div>
        </div>
      </div>
      }
      )}
    </div>
  </div>
    </>
}
