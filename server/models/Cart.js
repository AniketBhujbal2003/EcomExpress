const mongoose = require("mongoose")


const CartSchema = new mongoose.Schema(
    {
       userId:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true,
       },
       items:[
          {
            productId : {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required: true,
            },
            quantity:{
                type:Number,
                min:1,
                required:true,
            }
          }
       ]
    }
    ,
    {
        timestamps:true,
    }
);

const Cart = new mongoose.model('Cart',CartSchema);

module.exports = Cart;