import axios from 'axios';
import React, { useContext, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider.jsx';
import CategorySlider from '../CategorySlider/CategorySlider.jsx';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { cartContext } from '../../context/cartContext.js';

export default function Products() {
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { addToCart } = useContext(cartContext);
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart(productId) {
    setIsLoading(true);
    try {
      const res = await addToCart(productId);
      if (res.status === 'success') {
        console.log(res);
        toast.success(res.message, {
          theme: 'colored',
          position: 'top-right'
        });
      }
    } catch (error) {
      toast.error('Can\'t add the product to cart');
    } finally {
      setIsLoading(false);
    }
  }

  const { isError, isLoading: loadingProducts, data } = useQuery('allProducts', getAllProducts);

  if (loadingProducts) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <ThreeCircles
          visible={true}
          height="60"
          width="60"
          color="#4fa94d"
          ariaLabel="three-circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className="container py-5">
        <div className="row gx-0 mb-3">
          <div className="col-sm-9">
            <HomeSlider />
          </div>
          <div className="col-sm-3">
            <img className="w-100" style={{ height: "231px" }} src={require('../../imgs/images/grocery-banner.png')} alt="grocery" />
            <img className="w-100" style={{ height: "231px" }} src={require('../../imgs/images/grocery-banner-2.jpeg')} alt="grocery-2" />
          </div>
          <CategorySlider />
        </div>
        <div className="row gy-5">
          {data?.data.data.map((product, idx) => (
            <div className="col-md-2" key={idx}>
              <div className="product">
                <Link to={`/productDetails/${product.id}`}>
                  <img src={product.imageCover} alt="product" className="w-100 mb-3" />
                  <h5 className="text-center main-color pointer">{product.category.name}</h5>
                  <h4 className="text-center pointer">{product.title.split(' ').slice(0, 2).join(' ')}</h4>
                  <div className="d-flex align-items-center justify-content-between">
                    <p className="text-center">{product.price} EGP</p>
                    <p>
                      <span>
                        <i className="fa fa-star main-color"></i>
                      </span>
                      {product.ratingsAverage}
                    </p>
                  </div>
                </Link>
                <button
                  className="w-100 p-2 fw-bold rounded-3 main-bg-color border-white white-text text-center position-relative" 
                  onClick={() => addProductToCart(product.id)}
                  disabled={isLoading}
                >
                   Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
