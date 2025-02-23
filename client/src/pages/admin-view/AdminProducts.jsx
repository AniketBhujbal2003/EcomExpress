
import React, { Fragment, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import CommonFormM from '@/components/common/CommonFormM'
import { addProductFormElements } from '@/config'

import ImageUpload from './ImageUpload'
import AdminProductTile from '@/components/admin-view/AdminProductTile'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch, useSelector } from 'react-redux'
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/productSlice'
import { toast } from 'react-toastify'

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
  averageReview: 0,
};

const AdminProducts = () => {

  const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null)
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const [currectEditedId, setCurrentEditedId] = useState(null);

  const { productList } = useSelector((state) => state.adminProducts)
  const dispatch = useDispatch();

  const handlerDelete = (getCurrectProductId)=>{
        dispatch(deleteProduct(getCurrectProductId)).then((data)=>{
           dispatch(fetchAllProducts());
        })
  }

  const onSubmit = (event) => {
    event.preventDefault();

    if(currectEditedId!=null){ // we have to edit a product
        dispatch(editProduct({id:currectEditedId,formData})).then((data)=>{
          console.log("From adminProducts",data);

          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setImageFile(null);
            setFormData(initialFormData);
            setOpenCreateProductsDialog(false)
            setCurrentEditedId(null);
          }
    

        })
        console.log('samiksha');
        
        return;
    }

    dispatch(addNewProduct(
      {
        ...formData,
        image: uploadedImageUrl,
      }
    )).then((data) => {

      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setImageFile(null);
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false)

        toast.success('New product added Succesfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }

    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch])

  console.log(productList, "ProductList");

  return (
    <Fragment>
      <div className='w-full flex justify-end mb-4 ' onClick={() => setOpenCreateProductsDialog(true)} >
        <Button> Add new Products</Button>
      </div>
      <div className=' grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4  gap-4 ' >
        {
          productList && productList.length > 0 ?

            productList.map((product) => {
              return <AdminProductTile

                setCurrentEditedId={setCurrentEditedId}
                product={product}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                handleDelete={handlerDelete}
              >

              </AdminProductTile>
            })
            : null

        }
      </div>
      <Sheet open={openCreateProductsDialog} onOpenChange={() =>{  setOpenCreateProductsDialog(false); setFormData(initialFormData); setCurrentEditedId(null)}}>
        <SheetContent side='right' className='overflow-auto' >
          <SheetHeader>
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>

          <ImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currectEditedId}
          >

          </ImageUpload>

          <div className='py-6 px-1'>
            <CommonFormM
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText='Add' ></CommonFormM>
          </div>

        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts