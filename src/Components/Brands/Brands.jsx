import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { ThreeCircles } from 'react-loader-spinner'
import { useQuery } from 'react-query'

export default function Brands() {
  async function getAllBrands(){
    try {
      const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
      console.log(data.data)
      return data.data
    } catch (error) {
      console.log(error)
    }
  }

  const {isLoading,error,data}=useQuery('brands',getAllBrands)

  if (isLoading) {
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

  if (error) {
    return <div>Error fetching data</div>;
  }


  return (
    <>
    <Helmet>
      <title>Brands</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
    <div className="container mt-5">
      <div className="row">
        {data?.map((brand, idx) => (
          <div className="col-md-3 g-3 mb-4" key={idx}>
            <div className="card shadow pointer main-bg-color">
              <img src={brand.image} className="card-img-top w-100" alt={brand.name} />
              <div className="card-body">
                <h5 className="card-title text-center text-white">{brand.name}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  )
}
