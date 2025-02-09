import React, { useContext } from 'react'
import { authContext } from '../../context/auth.js'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoutes({children}) {
  const {token}=useContext(authContext)

console.log(token)

  if(token===null)

    return <Navigate to='/login'/>

  return (
    <>
      {children}
    </>
  )
}
