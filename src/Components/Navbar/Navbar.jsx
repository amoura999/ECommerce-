import React, { useContext } from 'react'
import logo from '../../../src/imgs/images/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/auth.js'
import { useNavigate } from 'react-router-dom'
import { cartContext } from '../../context/cartContext.js'

export default function Navbar() {

  const{token,setToken}=useContext(authContext)
  const{numOfCartItems}=useContext(cartContext)
const navigate=useNavigate()

  function logout(){
    localStorage.removeItem('tkn')
    setToken(null)
    navigate('/login')
  }

  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/">
      <img src={logo} alt="logo"/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {token?<>      <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to='/products'>Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/categories'>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='brands'>Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to='cart'>
          <span className="position-absolute top-10 start-100 translate-middle badge rounded-bill bg-danger p-1">
            {numOfCartItems===0?'':numOfCartItems}
          </span>
          Cart
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link position-relative" to='allorders'>
          All Orders
          </Link>
        </li>
        </>:''}
  
        </ul>

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
        <li className="nav-item">
          <i className='fa-brands fa-facebook-f me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-instagram me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-twitter me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-youtube me-2' style={{cursor:'pointer'}}></i>
          <i className='fa-brands fa-linkedin me-2' style={{cursor:'pointer'}}></i>
        </li>

        {token?
        <>
          <li className="nav-item">
          <Link className="nav-link" to='/profile'>Profile</Link>
        </li>
        <li className="nav-item">
          <span onClick={logout} className="nav-link" style={ {cursor:'pointer'} }>Logout</span>
        </li>
        </>:<>
        <li className="nav-item">
          <Link className="nav-link" to='/login'>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to='/register'>Register</Link>
        </li>
        </>}
        </ul>
    </div>
  </div>
</nav> 
    </>
  )
}
