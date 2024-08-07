import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import CartPage from '../Component/cart/CartPage'

const AllRoutes = () => {
  return (
    <Routes>
       <Route path='/' element={<Homepage/>}/>
       <Route path='/cart' element={<CartPage/>}/>
    </Routes>
  )
}

export default AllRoutes