

import React, { useEffect, useState } from 'react'

import ShoppingOrderDetailsView from '@/pages/shopping-view/ShoppingOrderDetailsView'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

import { Button } from '../../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/OrderSlice'


const ShoppingOrders = () => {

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shoppingOrderSlice)

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  let handleFetchOrderDetails = (getId) => {
    dispatch(getOrderDetails(getId));
  }

  useEffect(() => {
    if (orderDetails !== null) setOpenDetailsDialog(true);
  }, [orderDetails]);

  // console.log('OrderList: ', orderList);
  // console.log('OrderDetails',orderDetails);


  return (

    <Card>

      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>

        <Table>

          <TableHeader>
            <TableRow>
              <TableHead className='max-[770px]:hidden' >Order ID</TableHead>
              <TableHead className='max-[450px]:hidden' >Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead className='sr-only' >Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>

            {orderList && orderList.length > 0 ?
              orderList.map((orderItem) => {
                return <TableRow>
                  <TableCell className='max-[770px]:hidden'> {orderItem?._id} </TableCell>
                  <TableCell className='max-[450px]:hidden'> {orderItem?.orderDate.split('T')[0]} </TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${orderItem?.orderStatus === "confirmed"
                        ? "bg-green-500"
                        : orderItem?.orderStatus === "rejected"
                          ? "bg-red-600"
                          : "bg-black"
                        }`}
                    >
                      {orderItem?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog open={openDetailsDialog} onOpenChange={() => { setOpenDetailsDialog(false); dispatch(resetOrderDetails()) }} >
                      <Button onClick={() => handleFetchOrderDetails(orderItem?._id)} >View Details</Button>
                      <ShoppingOrderDetailsView orderDetails={orderDetails} ></ShoppingOrderDetailsView>
                    </Dialog>
                  </TableCell>
                </TableRow>
              }) : null}

          </TableBody>

        </Table>

      </CardContent>

    </Card>
  )
}

export default ShoppingOrders