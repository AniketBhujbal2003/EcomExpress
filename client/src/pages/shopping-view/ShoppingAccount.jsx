import React from 'react'
import accImg from '../../assets/account.jpg'
import Address from '@/components/shopping-view/Address'
import ShoppingOrders from '@/components/shopping-view/ShoppingOrders'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const ShoppingAccount = () => {
  return (
    <div className="flex flex-col ">
      <div className='relative h-[350px] w-ful overflow-hidden' >
        <img
          src={accImg}
          className='h-full w-full object-cover object-center'
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8 ">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <Tabs defaultValue='orders' >
            <TabsList>
              <TabsTrigger value='orders' >Orders</TabsTrigger>
              <TabsTrigger value='address'>Addresses</TabsTrigger>
            </TabsList>
            <TabsContent value='orders'>
              <ShoppingOrders></ShoppingOrders>
            </TabsContent>
            <TabsContent value='address'>
                <Address></Address>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount