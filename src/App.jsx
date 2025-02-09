import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Products from './Components/Products/Products.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Brands from './Components/Brands/Brands.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import { AuthProvider } from './context/auth.js'
import Profile from './Components/Profile/Profile.jsx'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import { CartContextProvider } from './context/cartContext.js'
import { Flip,  ToastContainer  } from 'react-toastify'
import Cart from './Components/Cart/Cart.jsx'
import Payment from './Components/Payment/Payment.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { Offline } from 'react-detect-offline'
import CatgeoryDetails from './Components/CatgeoryDetails/CatgeoryDetails.jsx'

const router=createHashRouter([
  {path:'/',
  element:<Layout/>,
  children:[
    {index:true ,element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'products',element:<ProtectedRoutes><Products/></ProtectedRoutes>},
    {path:'productDetails/:id',element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
    {path:'profile',element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
    {path:'cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
    {path:'allorders',element:<ProtectedRoutes><AllOrders/></ProtectedRoutes>},
    {path:'payment',element:<ProtectedRoutes><Payment/></ProtectedRoutes>},
  {path:'categories',element:<ProtectedRoutes><Categories/></ProtectedRoutes>},
  {path:'categories/:id',element:<ProtectedRoutes><CatgeoryDetails/></ProtectedRoutes>},
  {path:'brands',element:<ProtectedRoutes><Brands/></ProtectedRoutes>},
  {path:'register',element:<Register/>},
  {path:'login',element:<Login/>},
    {path:'*',element:<NotFound/>}
  ]
}
])




export default function App() {
  let clientQuery=new QueryClient()
  return<>
   <QueryClientProvider client={clientQuery}>

      <CartContextProvider>
  <AuthProvider>
    <RouterProvider router={router}/>
    </AuthProvider>
    <ToastContainer  limit={3} autoClose={2000} transition={Flip} stacked closeOnClick theme='colored' position='top-right'/>
    </CartContextProvider>
   
    </QueryClientProvider>
  
    <Offline>
       
            <div className="offline position-fixed bottom-0 start-0 bg-dark text-white p-2 rounded-3">
              Oops! You are offline now..🔴
            </div>
         
      </Offline>

  
</>
}