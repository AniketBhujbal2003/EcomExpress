

const express = require('express');
const router = express.Router();

const {getAllOrdersOfAllUsers, getOrderDetailsForAdmin,updateOrderStatus} = require('../../controlers/admin/order-controller');


router.get('/get',getAllOrdersOfAllUsers);
router.get('/details/:id',getOrderDetailsForAdmin);
router.put('/update/:id',updateOrderStatus);




module.exports = router