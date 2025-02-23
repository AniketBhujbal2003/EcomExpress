import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

const AdminLayout = () => {

  const [openSidebar,setOpenSidebar] = useState(false);

  return (
    <div className='flex min-h-screen ' >

        {/* admin sidebar */}
        <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} ></AdminSidebar>

        <div className='flex flex-1 flex-col'>
               {/* admin-hearer  */}
               <AdminHeader setOpen={setOpenSidebar} ></AdminHeader>
               
               <main className=' flex-1 flex-col flex p-4 md:pd-6 bg-muted/40'>
                    <Outlet></Outlet>
               </main>
        </div>

    </div>
  )
}

export default AdminLayout