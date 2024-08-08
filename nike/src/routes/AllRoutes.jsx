import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import CartPage from '../Component/cart/CartPage'
import SignUp from '../Pages/SignUp'
import SingIn from '../Pages/SingIn'
import Order from '../Pages/Order'

const AllRoutes = () => {
  return (
    <Routes>
             <Route path='/auth/signup' element={<SignUp/>}/>
             <Route path='/auth/signin' element={<SingIn/>}/>

       <Route path='/' element={<Homepage/>}/>
       <Route path='/cart' element={<CartPage/>}/>
       <Route path= "/checkout/orderSummary" element={<Order/>}/>
    </Routes>
  )
}

export default AllRoutes