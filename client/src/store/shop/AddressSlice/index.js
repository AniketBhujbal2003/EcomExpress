import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    isLoading: false,
    addressLIst: []
}

export const addNewAddress = createAsyncThunk('/addresses/addNewAddress',
    async (formdata) => {
        const response = await axios.post('http://localhost:5000/shop/address/add',
            formdata
        )

        return response.data
    }
)


export const fetchAllAddress = createAsyncThunk('/addresses/fetchAllAddress',
    async (userId) => {
        const response = await axios.get(`http://localhost:5000/shop/address/get/${userId}`)

        return response.data
    }
)

export const editAddress = createAsyncThunk('/addresses/editAddress',
    async ({ userId, addressId, formData }) => {
        const response = await axios.put(`http://localhost:5000/shop/address/update/${userId}/${addressId}`,
            formData
        )

        return response.data
    }
)

export const deleteAddress = createAsyncThunk('/addresses/deleteAddress',
    async ({ userId, addressId }) => {
        const response = await axios.delete(`http://localhost:5000/shop/address/delete/${userId}/${addressId}`)

        return response.data
    }
)

const addressSlice = createSlice(
    {
        name: 'shoppingAddress',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder
                .addCase(addNewAddress.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(addNewAddress.fulfilled, (state, action) => {
                    state.isLoading = false;
                    // console.log('From shop/address-slice: ',action)
                    // state.addressLIst = action.payload.data;
                })
                .addCase(addNewAddress.rejected, (state) => {
                    state.isLoading = false;
                    // state.addressLIst
                })
                .addCase(fetchAllAddress.pending, (state) => {
                    state.isLoading = true;
                })
                .addCase(fetchAllAddress.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.addressLIst = action.payload.data;
                })
                .addCase(fetchAllAddress.rejected, (state) => {
                    state.isLoading = false;
                    state.addressLIst = [];
                });

        }
    }
)

export default addressSlice.reducer;