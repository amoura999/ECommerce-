import  axios  from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  let user={
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:''
  }

  const [errMsg, seterrMsg] = useState(null)
  const [successMsg, setsuccessMsg] = useState(null)
  const [isLoading, setisLoading] = useState(false)

const navigate=  useNavigate()

 async function registerUser(values){
  setisLoading(true)
    console.log("Sending to backend...")

    try {
     const {data}=await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',values)
     if (data.message === 'success') {
       console.log('User registered successfully')
        setsuccessMsg('User registered successfully')
        navigate('/login')
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
    onSubmit:registerUser,
    validate:function(values){
      setsuccessMsg(null)
      seterrMsg(null)
      let errors={}

      if(values.name===''){
        errors.name='Name is required'
      }
      if (values.name.length<4 || values.name.length>20){
        errors.name='Name should be between 4 and 20 characters'
      } 

      if(values.email===''){
        errors.email='Email is required'
      }
      if(!values.email.includes('@') ||values.email.includes('.com')===false){
        errors.email='Email should contain @ and .com'
      }

      if(values.phone===''){
        errors.phone='Phone is required'
      }
      if(values.phone.match(/^(02)?01[0125][0-9]{8}$/)){
        errors.phone='Phone should be 11 digits and start with 01' 
      }

      if(values.password===''){
        errors.password='Password is required'
      }
      if(values.password.length<6 || values.password.length>20){
        errors.password='Password should be between 6 and 20 characters'
      }

      if(values.rePassword===''){
        errors.rePassword='rePassword is required'
      }
      if(values.password!==values.rePassword){
        errors.rePassword='Password and rePassword should be same'
      }
      console.log(errors)
      return errors
    }
  })


  return (
    <>
    <Helmet>
      <title>Register</title>
      <meta name="description" content="Register to create an account" />
    </Helmet>
     <div className="w-75 m-auto py-4">
      {errMsg?<div className='alert alert-danger'>{errMsg}</div>:''}
      {successMsg?<div className='alert alert-success'>{successMsg}</div>:''}
    <h2>Register Now :</h2>
     <form onSubmit={formikObj.handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input onBlur={formikObj.handleBlur} id='name' type="text" className="form-control mb-3" placeholder="Enter your name" onChange={formikObj.handleChange} value={formikObj.values.name}/>
      {formikObj.errors.name && formikObj.touched.name ? <div className='alert alert-danger'>{formikObj.errors.name}</div>:''}

      <label htmlFor="email">Email:</label>
      <input onBlur={formikObj.handleBlur} id='email' type="email" className="form-control mb-3" placeholder="Enter your email" onChange={formikObj.handleChange}  value={formikObj.values.email}/>
      {formikObj.errors.email && formikObj.touched.email ? <div className='alert alert-danger'>{formikObj.errors.email}</div>:''}
      <label htmlFor="phone">Phone:</label>
      <input onBlur={formikObj.handleBlur} id='phone' type="tel" className="form-control mb-3" placeholder="Enter your phone" onChange={formikObj.handleChange} value={formikObj.values.phone}/>
      {formikObj.errors.phone && formikObj.touched.phone ? <div className='alert alert-danger'>{formikObj.errors.phone}</div>:''}

      <label htmlFor="password">Password:</label>
      <input onBlur={formikObj.handleBlur} id='password' type="password" className="form-control mb-3" placeholder="Enter your password" onChange={formikObj.handleChange} value={formikObj.values.password}/>
      {formikObj.errors.password && formikObj.touched.password ? <div className='alert alert-danger'>{formikObj.errors.password}</div>:''}

      <label htmlFor="rePassword">rePassword:</label>
      <input onBlur={formikObj.handleBlur} id='rePassword' type="password" className="form-control mb-3" placeholder="reEnter your password" onChange={formikObj.handleChange} value={formikObj.values.rePassword}/>
      {formikObj.errors.rePassword && formikObj.touched.rePassword ? <div className='alert alert-danger'>{formikObj.errors.rePassword}</div>:''}

      <button type='submit' className='btn btn-success' disabled={(formikObj.isValid===false || formikObj.dirty===false)}>
      {isLoading?  <FallingLines
  color="#fff"
  width="30"
  visible={true}
  ariaLabel="falling-circles-loading"
  />:"Register"}
</button>
     </form>
     </div>
    </>
  )
}
