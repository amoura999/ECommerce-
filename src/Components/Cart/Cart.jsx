import React, { useContext, useEffect } from 'react';
import { cartContext } from '../../context/cartContext.js';
import { ThreeCircles } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const { getUserCart, deleteCart, clearCart, updateCart, cartProducts, totalCartPrice, numOfCartItems } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    getUserCart();
  }, []);

  async function deleteItemFromCart(id) {
    const res = await deleteCart(id);
    console.log(res);
    if (res.status === "success") {
      toast.success("Item Deleted Successfully from Cart", {
        theme: "colored",
        position: "top-right"
      });
    } else {
      toast.error("Item Deleted Error", {
        theme: "colored",
        position: "top-right"
      });
    }
  }

  async function clearCartItems() {
    const res=await clearCart();
    if (res.message === "success") {
      toast.success("Cart cleared Successfully");
    } else {
      toast.error("Cart Can't be cleared");
    }
    setTimeout(()=>{
      navigate('/products');
    },1000)
  }

  async function updateCartItem(id, count) {
    const maxQuantity = 10;
    const minQuantity = 1;  
  
    if (count > maxQuantity) {
      toast.error("Maximum quantity exceeded");
      return;
    }
    else if (count < minQuantity) { 
      toast.error("Minimum quantity reached");
      return;
    }
    
    const res = await updateCart(id, count);
    console.log(res);
    if (res.status === "success") {
      toast.success("Item Updated Successfully from Cart");
    } else {
      toast.error("Item Updated Error");
    }
  }
  
  

  if (cartProducts === null) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
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
    );
  }

  if (cartProducts.length === 0 || cartProducts.length === undefined || cartProducts.length === null) {
    return <>
    <div className="container bg-dark-subtle text-center p-5 my-5">
        <h2>Cart is empty</h2>
        <Link to='/products' className='main-color'>Refill Ur Cart..!</Link>
    </div>
      </>
    
  }

  return (
    <>
    <Helmet>
        <title>Cart</title>
        <meta name="cart" content="your cart here" />
    </Helmet>
      <div className="container bg-success p-3 my-3 text-light text-center  ">
      <h2>Total Price : {totalCartPrice} EGP</h2>
      <h4>Total Cart Items : {numOfCartItems}</h4>
      <button className="btn btn-outline-danger text-light rounded-3" onClick={clearCartItems}>Clear</button>
      <Link to='/payment' className="btn btn-outline-info text-light rounded-3 mx-4">Confirm Payment</Link>
      </div>
      {cartProducts.map(function (product, idx) {
        return (
          <div key={idx} className="container py-5 bg-body-secondary">
            <div className="row border-bottom border-3 p-2">
              <div className="col-sm-2">
                <img src={product.product.imageCover} alt="shoes" className='w-100 mb-2 ' />
              </div>
              <div className="col-sm-8 mt-5">
                <h2>Title: {product.product.title}</h2>
                <h4>Price: {product.price} EGP</h4>
                <button className="btn btn-outline-danger text-capitalize" onClick={() => deleteItemFromCart(product.product.id, product.count + 1)}>Remove</button>
              </div>
              <div className="col-sm-1 mt-5">
                <div className="d-flex align-items-center">
                  <button className="btn btn-outline-success" onClick={() => {
                    updateCartItem(product.product.id, product.count + 1)
                  }}>+</button>
                  <span className="mx-2 text-bold text-capitalize fw-light">{product.count}</span>
                  <button className="btn btn-outline-danger" onClick={() => {
                    updateCartItem(product.product.id, product.count - 1)
                  }}>-</button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
