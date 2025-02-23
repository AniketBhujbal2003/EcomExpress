const express = require("express");
const router = express.Router();
const {addToCart,deleteCartItems,fetchCartItems,updatateCartItemQuantity} = require("../../controlers/shop/cart-controllers")


router.route('/add').post(addToCart);
router.route('/get/:userId').get(fetchCartItems);
router.route('/update-cart').put(updatateCartItemQuantity);
router.route('/:userId/:productId').delete(deleteCartItems);

module.exports = router;