import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"



const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
}

export const fetchAllFillteredProducts = createAsyncThunk('/products/fetchallfillteredproducts',
    async ({ filterParams, sortParams }) => {
        const query = new URLSearchParams({
            ...filterParams,
            sortBy: sortParams
        })
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/shop/products/get?${query}`);
        return response?.data;
    }
);


export const fetchProductDetails = createAsyncThunk('/products/fetchProductDetails',
    async (id) => {

        let response = await axios.get(`${import.meta.env.VITE_API_URL}/shop/products/get/${id}`);
        return response?.data;
    }
);

const ShopProductsSlice = createSlice(
    {
        name: 'shopProducts',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(fetchAllFillteredProducts.pending, (state, action) => {
                state.isLoading = true;
            })
                .addCase(fetchAllFillteredProducts.fulfilled, (state, action) => {
                    state.isLoading = false;
                    console.log(action.payload);
                    state.productList = action.payload?.data;
                })
                .addCase(fetchAllFillteredProducts.rejected, (state, action) => {
                    state.isLoading = false;
                    state.productList = [];
                })
                .addCase(fetchProductDetails.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(fetchProductDetails.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.productDetails = action.payload?.data;
                })
                .addCase(fetchProductDetails.rejected, (state, action) => {
                    state.isLoading = false;
                    state.productDetails = null;
                })
        }
    }
)

export default ShopProductsSlice.reducer;