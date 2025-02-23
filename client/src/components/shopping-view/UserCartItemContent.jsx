import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItems, fetchCartItems, updateCartQuantity } from '@/store/shop/CartSlice'
import { toast } from 'react-toastify'

const UserCartItemContent = ({ item }) => {
    
    // console.log(item,'For Checkout');
    const { user } = useSelector((state) => {
        return state.auth;
    })
    const dispatch = useDispatch();

    function handleCartItemDelete(getCurrentItem) {
        dispatch(deleteCartItems({ userId: user.id, productId: getCurrentItem?.productId })).then((data) => {
            if (data?.payload?.success) {
                toast.success('Product Deleted Succesfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            }
        })
    }

    const handleUpdateQuantity = (getCurrentItem, typeOfOperation) => {
        let quantity = getCurrentItem?.quantity;
        if (typeOfOperation == 'minus') {
            quantity--;
        }
        else {
            quantity++;
        }

        dispatch(updateCartQuantity(
            {
                userId: user.id,
                productId: getCurrentItem?.productId,
                quantity: quantity
            }
        )).then((data) => {
            // console.log(data)

            if (data?.payload?.success) {
                toast.success('Quantiy Modified Succesfully', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    // transition: Bounce,
                });
            }
        }
        )
    }



    return (
        <div className='flex items-center space-x-4 pr-2' >

            <img src={item?.image} alt={item?.title} className='rounded w-20 h-20 object-cover' />

            <div className="flex-1">

                <h3 className='font-extrabold' >{item?.title}</h3>

                <div className="flex items-center mt-1 gap-2 ">

                    <Button
                        onClick={() => handleUpdateQuantity(item, 'minus')}
                        variant='outline' className='h-8 w-8 rounded-full'
                        size='icon'
                        disabled={item?.quantity == 1}
                    >
                        <Minus className=' w-4 h-4' ></Minus>
                        <span className='sr-only' >Decrease</span>
                    </Button>

                    <span className="font-semibold"> {item?.quantity} </span>

                    <Button
                        onClick={() => handleUpdateQuantity(item, 'plus')}
                        variant='outline' className='h-8 w-8 rounded-full'
                        size='icon'
                    >
                        <Plus className=' w-4 h-4' ></Plus>
                        <span className='sr-only' >Decrease</span>
                    </Button>

                </div>

            </div>

            <div className='flex flex-col items-end' >
                <p className='font-semibold' >
                    ${
                        ((item?.salePrice > 0 ? item?.salePrice : item?.price) * (item?.quantity)).toFixed(2)
                    }
                </p>
                <Trash onClick={() => handleCartItemDelete(item)} className='cursor-pointer mt-1 h-4 w-4' ></Trash>
            </div>

        </div>
    )
}

export default UserCartItemContent