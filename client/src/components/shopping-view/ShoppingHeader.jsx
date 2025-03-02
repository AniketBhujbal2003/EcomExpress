import { House, LogOut, Menu, ShoppingCart, User, UserCog } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



import { Button } from '../../components/ui/button'
import { shoppingViewHeaderMenuItems } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, resetTokenAndCredentials } from '@/store/authSlice'
import UserCartWrapper from './UserCartWrapper'





function MenuItems() {

  const navigate = useNavigate();

  const handleNavigateToListingPage = (getCurrentMenuItem) => {
    // console.log("We are here")
    sessionStorage.removeItem('filters');
    const currentFilter = {
      category: [getCurrentMenuItem.id]
    }
    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  return <nav className='flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row' >
    {
      shoppingViewHeaderMenuItems.map((menuItem) => {
        return <Link className='font-medium' key={menuItem.id} to={menuItem.path}>
          {menuItem.label}

        </Link>
      })
    }
  </nav>
}

function HeaderRightContent() {

  const [openCartSheet, setOpenCartSheet] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => {
    return state.auth;
  })
  const { items } = useSelector((state) => {
    return state.shoppingCart
  })
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleLogout = () => {
    // dispatch(logoutUser());
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate('/auth/login');
  }

  return <div className='flex flex-col lg:items-center lg:flex-row gap-4' >

    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)} className=' ' >
      <Button onClick={() => setOpenCartSheet(true)} variant='outline' size='icon' >
        <ShoppingCart className='h-6 w-6' />
        <span className='sr-only' > User cart</span>
      </Button>
      <UserCartWrapper cartItems={items} ></UserCartWrapper>
    </Sheet>

    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className='bg-black' >
          {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
          <AvatarFallback className='font-bold text-white bg-black' >
            {user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Logged in as {user?.userName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate("/shop/account")}>
          <UserCog className="mr-2 h-4 w-4" />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}

const ShoppingHeader = () => {

  const { isAuthenticated, user } = useSelector((state) => {
    return state.auth;
  })

  // console.log('user',user);

  return (
    <header className=' sticky top-0 z-40 border-b  w-full px-6 ' >
      <div className=' flex h-16 items-center justify-between px:4 md:px:6 ' >
        <Link to='/shop/home' className='flex' >
          <House className='h-6 w-6' />
          <span className='font-bold' >Ecommerce</span>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className="lg:hidden " >
              <Menu className=' h-6 w-6  ' />
              <span className='sr-only'> Toggle header menu </span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className=' w-full mx-w-xs' >
            <MenuItems></MenuItems>
            <HeaderRightContent></HeaderRightContent>
          </SheetContent>
        </Sheet>

        <div className='hidden lg:block ' >
          <MenuItems></MenuItems>
        </div>
        <div className='hidden lg:block'>
          <HeaderRightContent></HeaderRightContent>
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader