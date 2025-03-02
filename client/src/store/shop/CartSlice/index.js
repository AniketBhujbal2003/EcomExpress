import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    isLoading: false,
}

export const addToCart = createAsyncThunk('shop/cart/addToCart',

    async ({ userId, productId, quantity }) => {
        console.log(userId,productId,quantity)
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/shop/cart/add`,
            {
                userId,
                productId,
                quantity
            }
        )

        return response.data;
    }
)


export const fetchCartItems = createAsyncThunk('shop/cart/fetchCartItems',

    async (userId) => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/shop/cart/get/${userId}`)

        return response.data;
    }
)

export const deleteCartItems = createAsyncThunk('shop/cart/deleteCartItems',

    async ({ userId, productId }) => {
        console.log("Samiksha",userId,productId);
        let response = await axios.delete(`${import.meta.env.VITE_API_URL}/shop/cart/${userId}/${productId}`)

        return response.data;
    }
)

export const updateCartQuantity = createAsyncThunk('shop/cart/updateCartQuantity',

    async ({ userId, productId, quantity }) => {
        console.log('spruha')
        let response = await axios.put(`${import.meta.env.VITE_API_URL}/shop/cart/update-cart`,
            {
                userId,
                productId,
                quantity
            }
        )

        return response.data;
    }
)


const shoppingCartSlice = createSlice(
    {
        name: 'shoppingCart',
        initialState,
        reducers: {

        },
        extraReducers: (builder) => {
            builder.addCase(addToCart.pending, (state, action) => {
                state.isLoading = true;
            })
                .addCase(addToCart.fulfilled, (state, action) => {
                    state.isLoading = false;
                    console.log('From shopCartSlice/addtoCrt: ', action.payload?.data)
                    state.items = action.payload?.data;
                })
                .addCase(addToCart.rejected, (state, action) => {
                    state.isLoading = false;
                    state.items = [];
                })
                .addCase(fetchCartItems.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(fetchCartItems.fulfilled, (state, action) => {
                    state.isLoading = false;
                    console.log('From shopCartSlice/fetchCartItems : ', action.payload?.data)
                    state.items = action.payload?.data;
                })
                .addCase(fetchCartItems.rejected, (state, action) => {
                    state.isLoading = false;
                    state.items = [];
                })
                .addCase( updateCartQuantity.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(updateCartQuantity.fulfilled, (state, action) => {
                    state.isLoading = false;
                    console.log('From shopCartSlice/updateCartQuantity : ', action.payload?.data)
                    state.items = action.payload?.data;
                })
                .addCase(updateCartQuantity.rejected, (state, action) => {
                    state.isLoading = false;
                    state.items = [];
                })
                .addCase( deleteCartItems.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(deleteCartItems.fulfilled, (state, action) => {
                    state.isLoading = false;
                    console.log('From shopCartSlice/deleteCartItems: ', action.payload?.data)
                    state.items = action.payload?.data;
                })
                .addCase(deleteCartItems.rejected, (state, action) => {
                    state.isLoading = false;
                    state.items = [];
                })
        }
    }
)

export default shoppingCartSlice.reducer;