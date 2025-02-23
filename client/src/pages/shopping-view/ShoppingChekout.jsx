import React, { useState } from 'react'
import img from "../../assets/account.jpg";
import Address from '@/components/shopping-view/Address';
import UserCartItemContent from '@/components/shopping-view/UserCartItemContent';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components/ui/button'
import { createNewOrder } from '@/store/shop/OrderSlice';
import { toast } from 'react-toastify';

const ShoppingChekout = () => {

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  const { items: cartItems } = useSelector((state) => state.shoppingCart);
  // let cartItems = items;
  // console.log(cartItems.items)
  let totalAmount = cartItems && cartItems?.items && cartItems.items.length > 0 ?
    cartItems.items.reduce((acc, item) => {
      return acc + (item?.quantity) * (item?.price)
    }, 0)
    : 0

  const { user } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrderSlice)
  const dispatch = useDispatch();

  function handleInitiatePaypalPayment() {
    
    if(cartItems.length===0){
      toast.error('Your cart is empty', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
        });
        return;
    }
    if(currentSelectedAddress==null){
      toast.error('Address is not selected', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // transition: Bounce,
        });
        return;
    }


    let orderData = {

      userId: user?.id,
      cartId: cartItems._id,
      cartItems: cartItems.items.map(item => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item?.salePrice : item?.price,
        quantity: item?.quantity,
      })),

      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },

      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    }

    console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data);
      if (data?.payload?.success) {
        setIsPaymentStart(true);
      }
      else {
        setIsPaymentStart(false);
      }
    })

  }

  if (approvalURL) {
    window.location.href = approvalURL
  }

  return (

    <div className="flex flex-col">

      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">

        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        <div className="flex flex-col gap-4">

          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => {

              return <UserCartItemContent item={item} />
            }
            )
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePaypalPayment} className="w-full">
              {/* {isPaymentStart
                ? "Processing Paypal Payment..."
                : "Checkout with Paypal"} */}
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingChekout