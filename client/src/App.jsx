
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import AuthLayout from './components/auth/layout'
import AuthLogin from './pages/auth/AuthLogin'
import AuthRegister from './pages/auth/AuthRegister'

import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/AdminDashboard'
import AdminProducts from './pages/admin-view/AdminProducts'
import AdminFeatures from './pages/admin-view/AdminFeatures'
import AdminOrders from './pages/admin-view/AdminOrders'

import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import ShoppingAccount from './pages/shopping-view/ShoppingAccount'
import ShoppingChekout from './pages/shopping-view/ShoppingChekout'
import ShoppingHome from './pages/shopping-view/ShoppingHome'
import ShoppingListing from './pages/shopping-view/ShoppingListing'
import PaypalReturnPage from './pages/shopping-view/PaypalReturnPage'
import PaymentSuccess from './pages/shopping-view/PaymentSuccess'

import CheckAuth from './components/common/checkAuth'

import NotFound from './pages/not-found/NotFound'
import UnauthPage from './pages/unauth-page/UnauthPage'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice'

import CircularProgress from '@mui/material/CircularProgress';



const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch])


  const { user, isAuthenticated, isLoading } = useSelector((state) => {
    return state.auth;
  })

  console.log("From App.jsx: ", isAuthenticated, isLoading)

  if (isLoading) {
    return (
      <div>
        <div className='flex min-h-screen min-w-screen justify-center items-center '>
          <CircularProgress  size="4rem" color='black' />
        </div>
      </div>
    )
  }


  return (
    <div className=' flex flex-col overflow-hidden bg-white '>

   

      <Routes>

        <Route
          path='/auth'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <AuthLayout></AuthLayout>
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin></AuthLogin>} />
          <Route path="register" element={<AuthRegister></AuthRegister>} />
        </Route>

        <Route
          path='/admin'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <AdminLayout></AdminLayout>
            </CheckAuth>
          }
        >
          <Route path="products" element={<AdminProducts></AdminProducts>} />
          <Route path="dashboard" element={<AdminDashboard></AdminDashboard>} />
          <Route path="orders" element={<AdminOrders></AdminOrders>} />
          <Route path="features" element={<AdminFeatures></AdminFeatures>} />
        </Route>

        <Route
          path='/shop'
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <ShoppingLayout></ShoppingLayout>
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome></ShoppingHome>} />
          <Route path="listing" element={<ShoppingListing></ShoppingListing>} />
          <Route path="chekout" element={<ShoppingChekout></ShoppingChekout>} />
          <Route path="account" element={<ShoppingAccount></ShoppingAccount>} />
          <Route path="paypal-return" element={<PaypalReturnPage></PaypalReturnPage>} />
          <Route path="payment-success" element={<PaymentSuccess></PaymentSuccess>} />
        </Route>

        <Route path='/unauth-page' element={<UnauthPage></UnauthPage>}></Route>

        <Route path='*' element={<NotFound></NotFound>} />

      </Routes>

    </div>
  )
}

export default App