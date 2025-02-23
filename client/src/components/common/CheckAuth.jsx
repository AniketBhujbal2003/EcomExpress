import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {

    let locaiton = useLocation();

    console.log("from chekAuth: ", locaiton.pathname);

    if (!isAuthenticated &&
        !(locaiton.pathname.includes('/login') ||
            locaiton.pathname.includes('/register'))
    ) {
        console.log("sam");
        return (<Navigate to="/auth/login"> </Navigate>)
    }

    if (isAuthenticated &&
        (locaiton.pathname.includes('/login') ||
            locaiton.pathname.includes('/register'))
    ) {
        if(user?.role==='admin'){
            return ( <Navigate to="/admin/dashboard" ></Navigate> )
        }
        else{
            console.log('Anik')
            return (<Navigate to="/shop/home"></Navigate>)
        }
    }

    if(isAuthenticated && user?.role!=='admin' && locaiton.pathname.includes('admin')){
        return (<Navigate to="/unauth-page" ></Navigate>)
    }
    if(isAuthenticated && user?.role==='admin' && !locaiton.pathname.includes('admin')){
        return (<Navigate to="/admin/dashboard" ></Navigate>)
    }

    return (<>{children}</>)
}

export default CheckAuth