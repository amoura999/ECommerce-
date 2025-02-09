import  axios  from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import {  ThreeCircles } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../context/auth.js'
import { Helmet } from 'react-helmet'

export default function Login() {
  let user={
    email:'',
    password:'',
  }

  const [errMsg, seterrMsg] = useState(null)
  const [successMsg, setsuccessMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)

const navigate=  useNavigate()
const {setToken}=useContext(authContext)

 async function loginUser(values){
  setisLoading(true)
    console.log("Sending to backend...")

    try {
     const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',values)
     if (data.message === 'success') {
       console.log('User Logged in successfully')
       localStorage.setItem('tkn', data.token)
        setToken(data.token)
        setsuccessMsg('User Logged in successfully')

        setTimeout(() => {
          navigate('/products')
        }, 1000);
      }
      console.log(data)
    } catch (error) {
      console.log("error : ",error.response.data.message)
      seterrMsg( error.response.data.message)
    }
    setisLoading(false)
  }

  const formikObj=useFormik({
    initialValues:user,
    onSubmit:loginUser,
    validate:function(values){
      setsuccessMsg(null)
      seterrMsg(null)
      let errors={}

      if(values.email===''){
        errors.email='Email is required'
      }
      if(!values.email.includes('@') ||values.email.includes('.com')===false){
        errors.email='Email should contain @ and .com'
      }    
      if(values.password===''){
        errors.password='Password is required'
      }
      if(values.password.length<6 || values.password.length>20){
        errors.password='Password should be between 6 and 20 characters'
      }
      console.log(errors)
      return errors
    }
  })


  return (
    <>
    <Helmet>
        <title>Login</title>
        <meta name="description" content="Login to your account" />
    </Helmet>
     <div className="w-75 m-auto py-4 vh-100">
      {errMsg?<div className='alert alert-danger'>{errMsg}</div>:''}
      {successMsg?<div className='alert alert-success'>{successMsg}</div>:''}
    <h2>Login :</h2>
     <form onSubmit={formikObj.handleSubmit}>

      <label htmlFor="email">Email:</label>
      <input onBlur={formikObj.handleBlur} id='email' type="email" className="form-control mb-3" placeholder="Enter your email" onChange={formikObj.handleChange}  value={formikObj.values.email}/>
      {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div>:''}

      <label htmlFor="password">Password:</label>
      <input onBlur={formikObj.handleBlur} id='password' type="password" className="form-control mb-3" placeholder="Enter your password" onChange={formikObj.handleChange} value={formikObj.values.password}/>
      {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password}</div>:''}

      <button type='submit' className='btn btn-success' disabled={formikObj.isValid===false || formikObj.dirty===false}>
      {isLoading?  <ThreeCircles
  color="#fff"
  width="30"
  height="20"
  visible={true}
  ariaLabel="falling-circles-loading"
  />:"Login"}
</button>
     </form>
     </div>
    </>
  )
}
