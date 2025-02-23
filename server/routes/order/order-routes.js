

const express = require('express');
const router = express.Router();

const {createOrder,capturePayment,getAllOrdersByUser,getOrderDetails} = require('../../controlers/order/order-controller');

router.route('/create').post(createOrder);
router.route('/capture').post(capturePayment);
router.get('/list/:userId',getAllOrdersByUser);
router.get('/details/:id',getOrderDetails);


module.exports = router