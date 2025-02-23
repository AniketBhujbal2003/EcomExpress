const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        image:{
            type:String,
        },
        title:{
            type:String,
        },
        description:{
            type:String,
        },
        category:{
            type:String,
        },
        brand:{
            type:String,
        },
        price:{
            type:Number,
        },
        salesPrice:{
            type:Number,
        },
        totalStock:{
            type:Number,
        },
        averageReview:{
            type:Number,
        }
    },
    {
        timestamps:true,
    }
)

const Product = new mongoose.model('Product',ProductSchema);

module.exports = Product;