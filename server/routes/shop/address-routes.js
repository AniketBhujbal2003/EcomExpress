const express = require("express");
const router = express.Router();
const {addAddress,editAddress,deleteAddress,fetchAllAddress} = require("../../controlers/shop/address-controllers")

router.route('/add').post(addAddress);
router.route('/update/:userId/:addressId').put(editAddress);
router.route('/delete/:userId/:addressId').delete(deleteAddress);

router.route('/get/:userId').get(fetchAllAddress);

module.exports = router;