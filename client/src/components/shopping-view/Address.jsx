import React, { useEffect, useState } from 'react'
import CommonFormM from '../common/CommonFormM';
import { addressFormControls } from '@/config';
import AddressCard from './AddressCard';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useDispatch, useSelector } from 'react-redux';
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/AddressSlice';
import { toast } from 'react-toastify';




const initialAddressFormData = {
    address: "",
    city: "",
    phone: "",
    pincode: "",
    notes: "",
};

const Address = ({setCurrentSelectedAddress, selectedId}) => {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { addressLIst } = useSelector((state) => state.shoppingAddress)

    let handleManageAddress = (event) => {

        event.preventDefault();

        
        if (currentEditedId !== null) {
            dispatch(editAddress({ userId: user.id, addressId: currentEditedId, formData })).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user.id))
                    setCurrentEditedId(null);
                    setFormData(initialAddressFormData);

                    toast.success('Address Edited Succesfully', {
                        position: "top-right",
                        autoClose: 2000,
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

            return; // very important

        }


        if(addressLIst.length>=5 ){
          
            toast.warn('You can add at most 5 Address!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                // transition: Bounce,
                });

                setFormData(initialAddressFormData);

                return;
        }





        dispatch(addNewAddress({
            ...formData,
            userId: user?.id,
        })
        ).then((data) => {
            console.log(data)
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id))
                setFormData(initialAddressFormData);
                toast.success('Address added Succesfully', {
                    position: "top-right",
                    autoClose: 2000,
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

    // console.log(addressLIst);
    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== "")
            .every((item) => item);
    }

    function handleDeleteAddress(getCurrentAddress) {
        //  console.log(getCurrentAddress);
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then((data) => {
            if (data.payload.success) {
                dispatch(fetchAllAddress(user?.id))
            }
        })
    }
    function handleEditAddress(getCurrentAddress) {
        // console.log(getCurrentAddress);
        setCurrentEditedId(getCurrentAddress._id)
        setFormData({
            ...formData,
            address: getCurrentAddress.address,
            city: getCurrentAddress.city,
            phone: getCurrentAddress.phone,
            pincode: getCurrentAddress.pincode,
            notes: getCurrentAddress.notes,
        })
    }

    return (

        <Card>

            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2'>
                {
                    addressLIst && addressLIst.length > 0 ?
                        addressLIst.map((singleAddressItem) => {
                            return <AddressCard
                                handleDeleteAddress={handleDeleteAddress}
                                handleEditAddress={handleEditAddress}
                                addressInfo={singleAddressItem}
                                setCurrentSelectedAddress={setCurrentSelectedAddress}
                                selectedId={selectedId}
                            >

                            </AddressCard>
                        }) : null
                }
            </div>

            <CardHeader>
                <CardTitle>{currentEditedId == null ? 'Add New Address' : 'Edit Address'}</CardTitle>
            </CardHeader>

            <CardContent className='space-y-3' >

                <CommonFormM
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Edit" : "Add"}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                >
                </CommonFormM>
            </CardContent>
        </Card>

    )
}

export default Address