import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from "axios"

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
    token: null,
}

export const registerUser = createAsyncThunk('/auth/register',
    async (formData) => {
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,
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
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,
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
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`,
            {
                withCredentials: true,
            }
        )

        console.log(response);
        return response.data;
    }
)

// export const checkAuth = createAsyncThunk('/auth/checkauth',
//     async () => {
//         let response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`,
//              {
//                 withCredentials:true,
//                 headers: {
//                     'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
//                     Expires: 0,
//                 }

//              }

//         );

//         return response.data


       
        
//     }
// )

export const checkAuth = createAsyncThunk('/auth/checkauth',
    async (token) => {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`,
            {
                withCredentials: true,
    
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
                    // Expires: 0,
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

        },
        resetTokenAndCredentials:(state,action)=>{
            state.token = null;
            state.isAuthenticated=false;
            state.user = null;
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
                state.token = action?.payload?.token;
                sessionStorage.setItem('token',JSON.stringify(action?.payload?.token));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.token = null;
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

export const { setUser,resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer;

