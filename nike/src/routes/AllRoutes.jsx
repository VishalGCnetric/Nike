import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import PrivateRoute from './PrivateRoute'
import ShoppingLoader from '../Component/Loader/ShoppingLoader'
import CartPage from '../Component/cart/CartPage'
import SignUp from '../Pages/SignUp'
import SingIn from '../Pages/SingIn'
import Order from '../Pages/Order'
const Checkout = lazy(() => import('../Pages/Checkout'));


const AllRoutes = () => {
  return (
    <Suspense fallback={<ShoppingLoader />}>

    <Routes>
             <Route path='/auth/signup' element={<SignUp/>}/>
             <Route path='/auth/signin' element={<SingIn/>}/>

       <Route path='/' element={<Homepage/>}/>
       <Route path='/cart' element={<CartPage/>}/>
       <Route path='/checkout/:step' element={<PrivateRoute><Checkout /></PrivateRoute>} />    </Routes>
       </Suspense>
  )
}

export default AllRoutes