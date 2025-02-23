import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import InventoryIcon from '@mui/icons-material/Inventory';




const adminSidebarMenuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon></DashboardIcon>
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ProductionQuantityLimitsIcon></ProductionQuantityLimitsIcon>
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <InventoryIcon></InventoryIcon>
  },
  {
    id: 'feature',
    label: 'Feature',
    path: '/admin/features',
    icon: <FeaturedPlayListIcon></FeaturedPlayListIcon>
  },

]


const AdminSidebar = ({ open, setOpen }) => {

  const navigate = useNavigate();

  return (
    <Fragment>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side='left' className=' w-64 ' >
          <div className='flex flex-col h-full' >

            <div onClick={() => navigate("/admin/dashboard")} className=' my-4 border-b flex items-center gap-2 text-2xl ' >
              < SignalCellularAltIcon ></SignalCellularAltIcon>
              <h1 className=' font-bold' >Admin Panel</h1>
            </div>

            <div className='flex flex-col mt-8 gap-2' >
              {
                adminSidebarMenuItems.map((menuItem, idx) => {
                  return <div className='flex gap-3 bg-slate-300 hover:bg-slate-400 cursor-pointer items-center px-3 py-2 rounded-md' key={menuItem.id} onClick={()=>{setOpen(false); navigate(menuItem.path);}} >
                    {menuItem.icon}
                    <span className=' text-lg ' >{menuItem.label}</span>
                  </div>
                })
              }
            </div>

          </div>
        </SheetContent>
      </Sheet>


      <aside className='hidden w-64 flex-col bg-background border-r p-6 lg:flex '>

        <div onClick={() => navigate("/admin/dashboard")} className=' flex items-center gap-2 text-2xl ' >
          < SignalCellularAltIcon sg={{ fontSize: '60px' }} ></SignalCellularAltIcon>
          <h1 className=' font-bold' >Admin Panel</h1>
        </div>

        <div className='flex flex-col mt-8 gap-2' >
          {
            adminSidebarMenuItems.map((menuItem, idx) => {
              return <div className='flex gap-3 bg-slate-300 hover:bg-slate-400 cursor-pointer items-center px-3 py-2 rounded-md' key={menuItem.id} onClick={() => navigate(menuItem.path)} >
                {menuItem.icon}
                <span className=' text-lg ' >{menuItem.label}</span>
              </div>
            })
          }
        </div>


      </aside>
    </Fragment>
  )
}

export default AdminSidebar