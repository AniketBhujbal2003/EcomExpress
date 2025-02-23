import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


import CommonFormM from '@/components/common/CommonFormM'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/authSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

let initialState = {
  username: '',
  email: '',
  password: ''
}

const AuthRegister = () => {

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let onSubmit = (event) => {

    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      
      console.log(data)
      if (data?.payload?.success) {

        setFormData(initialState);
        navigate('/auth/login');

        toast.success('Registration Succesfull', {
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
      else{
          let msg = data?.payload?.message;
          console.log(data.payload);
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
        <h1 className='text-3xl tracking-tight font-bold text-foreground ' > Create New Account </h1>
        <p className='mt-2'>Allready have an Account
          <Link className='font-medium text-primary hover:underline ml-2' to="/auth/login">Login</Link>
        </p>

      </div>


      <CommonFormM
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText={'Sign Up'}
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

export default AuthRegister