
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '../ui/button';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/store/authSlice';

const AdminHeader = ({setOpen}) => {

  let dispatch = useDispatch();
  let handleLogout = ()=>{
     dispatch(logoutUser());
  }

  return (
    <div className=' flex items-center justify-between px-4 py-3 bg-background border-b '>

      <Button className="lg:hidden sm:block " onClick={()=>setOpen(true)} >
        <MenuIcon color='black'  ></MenuIcon>
        <span className=" sr-only" >
          toggle menu
        </span>
      </Button>

      <div className='flex flex-1 justify-end' >
        <Button 
        className='inline-flex gap-2 items-center rounded-md px-4 py-4 text-sm font-medium shadow '
        onClick ={handleLogout}
            >
          <LogoutIcon></LogoutIcon>
          Logout
        </Button>
      </div>
    </div>
  )
}

export default AdminHeader

