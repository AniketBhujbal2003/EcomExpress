import React from 'react'
import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

const ShoppingLayout = () => {
    return (
        <div className=' flex flex-col bg-white overflow-hidden ' >

            {/* shopin Header  */}
            <ShoppingHeader></ShoppingHeader>

            <main className='flex flex-col w-full'>
                <Outlet></Outlet>
            </main>
            
        </div>
    )
}

export default ShoppingLayout