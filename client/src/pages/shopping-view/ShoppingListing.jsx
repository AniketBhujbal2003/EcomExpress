import React, { useEffect, useState } from 'react'
import ProductFilter from '@/components/shopping-view/ProductFilter'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@mui/material'
import { ArrowUpDown } from 'lucide-react'
import { sortOptions } from '@/config'
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@radix-ui/react-dropdown-menu'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllProducts } from '@/store/admin/productSlice'
import { fetchAllFillteredProducts, fetchProductDetails } from '@/store/shop/ProductSlice'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { createSearchParams, useSearchParams } from 'react-router-dom'
import { addToCart, fetchCartItems } from '@/store/shop/CartSlice'
import { toast } from 'react-toastify'
// import ProductDetailsDialog from '@/components/shopping-view/ProductDetailsDialog'



const createSearchParamsHelper = (filterParams) => {
  let queryParams = [];

  for (let [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(',');
      queryParams.push(`${key} = ${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join('&');
}

const ShoppingListing = () => {

  const dispatch = useDispatch();

  const [filters, setFilters] = useState(null);
  const [sort, setSort] = useState(null);
  const [openProductDetails, setOpenProductDetails] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const { user } = useSelector((state) => {
    return state.auth;
  })
  const { items } = useSelector((state) => {
    return state.shoppingCart
  })

  const { productList, productDetails } = useSelector((state) => {
    return state.shopProducts
  })
  
  useEffect(()=>{
    dispatch(fetchAllFillteredProducts({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  },[]);

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(fetchAllFillteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort])

  // console.log("All Products List: ",productList);

  const handleSort = (value) => {
    setSort(value);
    console.log(sort);
  }


  function handleFilters(getSectionId, getCurrentOption) {

    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption],
      };
    }
    else {
      const indexOfCurrentOption =
        cpyFilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  console.log(filters);

  useEffect(() => {
    setSort('price-lowtohigh');
    setFilters(JSON.parse((sessionStorage.getItem('filters'))) || {});
  }, [])

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      let temp = new URLSearchParams(createQueryString);
      setSearchParams(temp.toString());
    }
  }, [filters])

  console.log(searchParams);


  const handleGetProductDetails = (getProductId) => {
    // console.log(getProductId);
    dispatch(fetchProductDetails(getProductId));
  }

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    console.log(getCurrentProductId);
    dispatch(addToCart(
      {
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1
      }
    )).then((data) => {
      console.log('From handleAddtoCArt: ', data);
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));

        toast.success('Product Added Succesfully', {
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
      }
    })
  }

  // console.log('User CartItems : ',items);


  console.log('Product Details: ', productDetails);

  // useEffect(()=>{
  //   if(productDetails!=null){
  //      setOpenProductDetails(true);
  //   }
  // },[productDetails])

  console.log("Product List Sami: ",productList)

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6' >

      <ProductFilter filters={filters} handleFilters={handleFilters} ></ProductFilter>

      <div className=' bg-background w-full shadow-sm  rounded-lg'>
        <div className='p-4 flex items-center justify-between' >
          <h2 className='text-lg font-semibold' >All products</h2>
          <div className='flex items-center gap-2' >
            <span className='text-muted-foreground' >{productList.length} Products</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild >
              <Button
                variant='outline'
                size='sm'
                className='flex items-center gap-1 border-pink-700 '
              >
                <ArrowUpDown />
                <span>sort by</span>

              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]' >
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSort} className=' cursor-pointer' >
                {
                  sortOptions.map((sortItem) => {
                    return (
                      <>
                        <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id} >
                          {sortItem.label}
                        </DropdownMenuRadioItem>
                        <DropdownMenuSeparator></DropdownMenuSeparator>
                      </>
                    )
                  })
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>


        <div className=' pt-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4' >
          {
            productList && productList.length > 0 ?
              productList.map((product) => {
                return <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={product}
                  handleAddtoCart={handleAddToCart}
                >

                </ShoppingProductTile>
              })
              : null
          }
        </div>

        {/* <ProductDetailsDialog
          open={openProductDetails}
          setOpen={setOpenProductDetails} 
        >

        </ProductDetailsDialog> */}



      </div>


    </div>
  )
}

export default ShoppingListing