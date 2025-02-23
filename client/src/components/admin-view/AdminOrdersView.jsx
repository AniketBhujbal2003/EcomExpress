

import React, { useEffect, useState } from 'react'

import AdminOrdersDetailsView from '@/pages/admin-view/AdminOrdersDetailsView'

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
import { Button } from '../ui/button'
import { Badge } from "@/components/ui/badge"
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, resetOrderDetails } from '@/store/admin/orderSlice'
import { getOrderDetails } from '@/store/shop/OrderSlice'


const AdminOrdersView = () => {

   const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
   const { orderList, orderDetails } = useSelector((state) => state.adminOrderSlice)
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getAllOrdersForAdmin());
   }, [dispatch]);

   let handleFetchOrderDetails = (getId) => {
      dispatch(getOrderDetailsForAdmin(getId));
   }

   useEffect(() => {
      if (orderDetails !== null) setOpenDetailsDialog(true);
   }, [orderDetails]);

   console.log('orderList:', orderList);

   return (
      <Card className='pl-0'>

         <CardHeader >
            <CardTitle>Order History</CardTitle>
         </CardHeader>
         <CardContent className='pl-0'>

            <Table >

               <TableHeader>
                  <TableRow>
                     <TableHead className='max-sm:hidden' >Order ID</TableHead>
                     <TableHead className='max-[390px]:hidden' >Order Date</TableHead>
                     <TableHead>Order Status</TableHead>
                     <TableHead>Order Price</TableHead>
                     <TableHead className='sr-only' >Details</TableHead>
                  </TableRow>
               </TableHeader>

               <TableBody>

                  {orderList && orderList.length > 0 ?
                     orderList.map((orderItem) => {
                        return <TableRow>
                           <TableCell className='max-sm:hidden'  > {orderItem?._id} </TableCell>
                           <TableCell className='max-[390px]:hidden' > {orderItem?.orderDate.split('T')[0]} </TableCell>
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
                                 <AdminOrdersDetailsView orderDetails={orderDetails} ></ AdminOrdersDetailsView>
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

export default AdminOrdersView;