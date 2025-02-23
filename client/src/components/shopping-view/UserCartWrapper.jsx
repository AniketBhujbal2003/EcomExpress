import React, { useEffect } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button'
import UserCartItemContent from './UserCartItemContent'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCartItems } from '@/store/shop/CartSlice'
import { useNavigate } from 'react-router-dom'


const UserCartWrapper = ({cartItems}) => {
    
    const navigate = useNavigate();

    const {user} = useSelector((state)=>{
        return state.auth;
    })
   
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCartItems(user?.id));
    },[dispatch])

    console.log("From cart Wropper",cartItems)

    let totalAmount = cartItems && cartItems?.items && cartItems.items.length>0 ?
         cartItems.items.reduce((acc,item)=>{
            return acc + (item?.quantity) * (item?.price)
         },0)
         : 0 
    
         

    return (
        <SheetContent className=' max-h-screen sm:max-w-md overflow-auto ' >
            <SheetHeader>
                <SheetTitle>Your Cart</SheetTitle>
            </SheetHeader>

            <div className=" mt-6 flex flex-col gap-4 max-h-[500px] overflow-auto">
                 {
                    cartItems && cartItems?.items && cartItems.items.length>0 ?
                    cartItems.items.map((item)=>{
                        return <UserCartItemContent item={item}></UserCartItemContent>
                    })
                    : null
                 }
            </div>
            <div className="mt-8 space-y-4">
                <div className="flex justify-between ">
                     <span className='font-bold'>Total</span>
                     <span className="font-bold">${totalAmount}</span>
                </div>
            </div>

            <Button className='w-full mt-7 bg-cyan-400 hover:bg-cyan-500' onClick={()=> navigate('/shop/chekout')} >CheckOut</Button>

        </SheetContent>

    )
}

export default UserCartWrapper