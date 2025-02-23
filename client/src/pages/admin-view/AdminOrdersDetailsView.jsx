
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useDispatch, useSelector } from 'react-redux'
import CommonFormM from '@/components/common/CommonFormM'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/orderSlice'
import { getAllOrdersByUserId } from '@/store/shop/OrderSlice'
import { toast } from 'react-toastify'

const initialFormData = {
    status:'',
}

const AdminOrdersDetailsView = ({ orderDetails }) => {

    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData,setFormData] = useState(initialFormData);

    let handleUpdateStatus = (event)=>{
        event.preventDefault();

        if(formData.status==""){
            toast.error('Please Select Order Status', {
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

                return ;
        }
        dispatch(updateOrderStatus({id:orderDetails._id, orderStatus: formData.status})).then((data)=>{
            if(data?.payload?.success){
                dispatch(getOrderDetailsForAdmin(orderDetails._id));
                dispatch(getAllOrdersForAdmin());
                setFormData(initialFormData);

                toast.success('Order Status Updated Successfully ', {
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


    return (

        <DialogContent className=' mt-2 max-[800px]:max-w-[80vw] max-w-[60vw] max-h-[90vh] overflow-auto ' >

            <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                    Hear are your order details:
                </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6">
                <div className='grid gap-2' >
                    <div className='flex mt-4 items-center justify-between '>
                        <p className='font-medium' >Order ID</p>
                        <Label> {orderDetails?._id} </Label>
                    </div>
                    <div className='flex mt-4 items-center justify-between '>
                        <p className='font-medium' >Order Date</p>
                        <Label>{orderDetails?.orderDate.split('T')[0]}</Label>
                    </div>
                    <div className='flex mt-4 items-center justify-between '>
                        <p className='font-medium' >Order Status</p>
                        <Label> {orderDetails?.orderStatus} </Label>
                    </div>
                    <div className='flex mt-4 items-center justify-between '>
                        <p className='font-medium' >Order Price</p>
                        <Label>$ {orderDetails?.totalAmount} </Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className="flex mt-2 items-center justify-between">
                        <p className="font-medium">Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>
                    </div>
                </div>

                <Separator />

                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Details</div>
                        <ul className="grid gap-3">
                            {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                                ? orderDetails?.cartItems.map((item) => (
                                    <li className="flex items-center justify-between">
                                        <span>Title: {item.title}</span>
                                        <span>Quantity: {item.quantity}</span>
                                        <span>Price: ${item.price}</span>
                                    </li>
                                ))
                                : null}
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Info</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>{user.userName}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>
                        </div>
                    </div>
                </div>


                <div>
                    <CommonFormM
                        formControls={[
                            {
                                label: "Order Status",
                                name: "status",
                                componentType: "select",
                                options: [
                                    { id: "pending", label: "Pending" },
                                    { id: "inProcess", label: "In Process" },
                                    { id: "inShipping", label: "In Shipping" },
                                    { id: "delivered", label: "Delivered" },
                                    { id: "rejected", label: "Rejected" },
                                ],
                            },
                        ]}
                        formData={formData}
                        setFormData={setFormData}
                        buttonText={"Update Order Status"}
                        onSubmit={handleUpdateStatus}
                    />
                </div>
            </div>


        
        </DialogContent >
    )
}

export default AdminOrdersDetailsView