const express = require("express");
const { getFillteredProducts,getProductDetails } = require("../../controlers/shop/products-controllers");
const router = express.Router();


router.route('/get').get(getFillteredProducts);
router.route('/get/:id').get(getProductDetails);
module.exports = router;