
import { configureStore } from "@reduxjs/toolkit"
import authReducer from './authSlice'
import adminProductReducer from './admin/productSlice/index.js'
import shopProductReducer from './shop/ProductSlice/index.js'
import shoppingCartReducer from './shop/CartSlice/index.js'
import shoppingAddressReducer from './shop/AddressSlice/index.js'
import shoppingOrderReducer from './shop/OrderSlice/index.js'
import adminOrderReducer from  './admin/orderSlice/index.js'

const store = configureStore(
    {
        reducer:{
           auth: authReducer,
           adminProducts: adminProductReducer,
           shopProducts: shopProductReducer,
           shoppingCart: shoppingCartReducer,
           shoppingAddress: shoppingAddressReducer,
           shoppingOrderSlice: shoppingOrderReducer,
           adminOrderSlice: adminOrderReducer,
        }
    }
)


export default store;