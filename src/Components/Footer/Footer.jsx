import React from 'react'

export default function Footer() {
  return <>
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h3>Categories</h3>
            <ul className="list-unstyled">
              <li>Electronics</li>
              <li>Mobiles</li>
              <li>Home Appliances</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Brands</h3>
            <ul className="list-unstyled">
              <li>Samsung</li>
              <li>Apple</li>
              <li>LG</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3>Support</h3>
            <ul className="list-unstyled">
              <li>FAQ</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="col-md-3">
            <h3 className='mb-2 '>Follow Us</h3>
            <div className="d-flex ">
          <i className='fa-brands fa-facebook-f me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-instagram me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-twitter me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-youtube me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-linkedin me-2' style={{cursor:'pointer'}}></i>
            </div>
          </div>
        </div>
      </div>
    </footer> 
    </>
  
}
