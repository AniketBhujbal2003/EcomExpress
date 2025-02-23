import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from "axios"

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        let response = await axios.post('http://localhost:5000/auth/register',
            formData,
            {
                withCredentials: true,
            }
        )

        console.log(response);

        return response.data;
    }

)


export const loginUser = createAsyncThunk('/auth/login',
    async (formData) => {
        let response = await axios.post('http://localhost:5000/auth/login',
            formData,
            {
                withCredentials: true,
            }
        )

        console.log(response);
        return response.data;
    }
)

export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        let response = await axios.post('http://localhost:5000/auth/logout',
            {
                withCredentials: true,
            }
        )

        console.log(response);
        return response.data;
    }
)

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async () => {
        let response = await axios.get('http://localhost:5000/auth/check-auth',
             {
                withCredentials:true,
                headers: {
                    'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
                    Expires: 0,
                }

             }

        );

        return response.data


       
        
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
        })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                // console.log("User from extrareduce/regisUser/  : ",state.user);
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = (action?.payload?.success ? action.payload.user : null);
                state.isAuthenticated = action?.payload?.success ? true : false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(checkAuth.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = (action?.payload?.success ? action.payload.user : null);
                state.isAuthenticated = action?.payload?.success ? true : false;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.pending, (state,action)=>{
                state.isLoading=true;
            })
            .addCase(logoutUser.fulfilled,(state,action)=>{
                state.isLoading = false;
                state.user=null;
                state.isAuthenticated=false;
            })
    }
})

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

