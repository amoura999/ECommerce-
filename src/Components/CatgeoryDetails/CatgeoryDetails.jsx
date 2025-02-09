import axios from 'axios';
import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

export default function CatgeoryDetails() {
  const { id } = useParams();

  async function getCatgeoryDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading, error } = useQuery('categoryDetails', getCatgeoryDetails);

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
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-3 text-center mx-auto">
            <div className="card shadow pointer main-bg-color text-light mb-3">
              <img src={data.image} className="card-img-top w-100" alt={data.name} />
              <div className="card-body">
                <h5 className="card-title">{data.name}</h5>
                <p className="card-text">{data.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
