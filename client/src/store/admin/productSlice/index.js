import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Feather } from "lucide-react"


const initialState={
    isLoading:false,
    productList: [],
}

export const addNewProduct = createAsyncThunk('/products/addnewproduct',
    async (formData)=>{
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/admin/products/add`,
            formData,
            {
                headers:{
                   'Content-Type':'application/json',
                },
            }
        )
        return response?.data;
    }
)

export const fetchAllProducts = createAsyncThunk('/products/fetchallproducts',
    async ()=>{
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/products/get` );

        return response?.data;
    }
);


export const editProduct = createAsyncThunk('/products/editproduct',
    async ({id,formData})=>{

        console.log("I lvoe smkis :",id,formData);

        let response = await axios.put(`${import.meta.env.VITE_API_URL}/admin/products/edit/${id}`,
            formData,
            {
                headers:{
                   'Content-Type':'application/json',
                },
            }
        )

        return response?.data;
    }
)

export const deleteProduct = createAsyncThunk('/products/deleteProduct',
    async (id)=>{
        let response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/products/delete/${id}`)

        return response?.data;
    }
)


const AdminProductsSlice = createSlice(
    {
        name:'adminProducts',
        initialState,
        reducers:{
         
        },
        extraReducers:(builder)=>{
             builder.addCase(fetchAllProducts.pending,(state,action)=>{
                 state.isLoading=true;
             })
             .addCase(fetchAllProducts.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.productList = action.payload.data;
                console.log("fetch all products in adminSlice : ",action.payload);
             })
             .addCase(fetchAllProducts.rejected,(state,action)=>{
                state.isLoading=false;
                state.productList=[];
             })
             
        }
    }
)

export default AdminProductsSlice.reducer;