import React, { useState } from 'react'
import { Link } from 'react-router-dom'


import CommonFormM from '@/components/common/CommonFormM'
import { loginFormControls } from '@/config'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/store/authSlice'
import { toast } from 'react-toastify'

let initialState = {
  email: '',
  password: ''
}

const AuthLogin = () => {

  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  let onSubmit = (event) => {

    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {

      console.log('Data from Login form Dispatch: ', data);
      let msg = data.payload.message;

      if (data?.payload?.success) {

        toast.success(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        });
        setFormData(initialState);

      }
      else {

        toast.error(msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          // transition: Bounce,
        });


      }



    })


  }

  return (
    <div className=' mx-auto w-full mx-w-md space-y-6  ' >
      <div className=' text-center '>
        <h1 className='text-3xl tracking-tight font-bold text-foreground ' > Sign in to you Account</h1>
        <p className='mt-2'>Dont  have an Account
          <Link className='font-medium text-primary hover:underline ml-2' to="/auth/register">Register</Link>
        </p>

      </div>


      <CommonFormM
        formControls={loginFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={'Sign In'}
      >

      </CommonFormM>


      {/* <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={'Sign Up'}
      >

      </CommonForm> */}
    </div>
  )
}

export default AuthLogin