const express = require('express');
const { createOrder, fetchOrdersByUser, deleteOrder, updateOrder, fetchAllOrders } = require('../controller/Order');

const router = express.Router();
//  /orders is already added in base path
router.post('/', createOrder)
router.get('/', fetchAllOrders)
      .get('/:id', fetchOrdersByUser)
      .delete('/:id', deleteOrder)
      .patch('/:id', updateOrder)
module.exports = router;