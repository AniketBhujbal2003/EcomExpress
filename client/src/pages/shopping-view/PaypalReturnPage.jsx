import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/OrderSlice";
import React from 'react'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";


const PaypalReturnPage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const paymentId = params.get("paymentId");
    const payerId = params.get("PayerID");

    useEffect(() => {
        console.log(payerId, payerId,'Aditi')
        if (paymentId && payerId) {
          const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));
    
          dispatch(capturePayment({ paymentId, payerId, orderId })).then((data) => {
            if (data?.payload?.success) {
              sessionStorage.removeItem("currentOrderId");
              window.location.href = "/shop/payment-success";
            }
          });
        }
      }, [paymentId, payerId, dispatch]);
    

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Processing Payment...Please wait!</CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}

export default PaypalReturnPage