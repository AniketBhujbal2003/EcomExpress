
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require('dotenv').config();


// all routers
const authRouters = require("./routes/auth/auth_routes.js");
const adminProductsRouter = require("./routes/admin/product_routes.js");
const adminOrderRouter = require('./routes/admin/order-routes.js')
const shopProductsRouter = require("./routes/shop/product-routes.js");
const shopCartRoutes = require("./routes/shop/cart-routers.js")
const shopAddressRoutes = require("./routes/shop/address-routes.js")
const shopOrderRoutes = require('./routes/order/order-routes.js')

// connet ot DB
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log("Database connection Error: ", err);
    })

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
    {
        origin: process.env.CLIENT_BASE_URL ,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma'
        ],
        credentials: true
    }
))

app.use(cookieParser());
app.use(express.json());

app.use('/auth', authRouters)
app.use('/admin/products', adminProductsRouter);
app.use('/admin/orders',adminOrderRouter)
app.use('/shop/products', shopProductsRouter);
app.use('/shop/cart', shopCartRoutes);
app.use('/shop/address',shopAddressRoutes);
app.use('/shop/order',shopOrderRoutes)

app.listen(PORT, () => {
    console.log(`Server is now running at port : ${PORT}`);
})