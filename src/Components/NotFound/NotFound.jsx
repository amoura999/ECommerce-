import React from 'react'
import { Helmet } from 'react-helmet'
import notFound from '../../../src/imgs/images/error.svg'


export default function NotFound() {
  return (
    <>
    <Helmet>
      <title>NotFound</title>
      <meta name="description" content="Helmet application" />
    </Helmet>
    <div className="container text-center main-color m-5" >
      <img src={notFound} alt="notFound" className='w-50' />
    </div>
    </>
  )
}
