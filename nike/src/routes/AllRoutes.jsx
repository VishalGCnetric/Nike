import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Pages/Homepage'
import PrivateRoute from './PrivateRoute'
import ShoppingLoader from '../Component/Loader/ShoppingLoader'
import CartPage from '../Component/cart/CartPage'
import SignUp from '../Pages/SignUp'
import SingIn from '../Pages/SingIn'
import Order from '../Pages/Order'

import ProductDetails from '../Pages/ProductDetails'
import ProfilePage from '../Pages/Profile'
import OrderList from '../Pages/OrderList'

const Checkout = lazy(() => import('../Pages/Checkout'));


const AllRoutes = () => {
  return (
    <Suspense fallback={<ShoppingLoader />}>

    <Routes>
             <Route path='/auth/signup' element={<SignUp/>}/>
             <Route path='/auth/signin' element={<SingIn/>}/>

       <Route path='/' element={<Homepage/>}/>
       <Route path='/cart' element={<CartPage/>}/>

       <Route path='/product/:id' element={<ProductDetails/>}/>
       <Route path= "/checkout/orderSummary" element={<Order/>}/>
       <Route path='/checkout/:step' element={<PrivateRoute><Checkout /></PrivateRoute>} />   
       {/* <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />    */}
       <Route path='/profile' element={<ProfilePage />} />   
       <Route path='/all-orders' element={<PrivateRoute><OrderList /></PrivateRoute>} />   
    </Routes>

       </Suspense>

  )
}

export default AllRoutes