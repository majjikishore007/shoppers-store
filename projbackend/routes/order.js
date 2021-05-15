const express = require('express');
const router = express.Router();

const { isAuthenticated, isSignedIn, isAdmin } = require('../controllers/auth');
const { getUserById, pushOrderInPurchaseList } = require('../controllers/user');
const { UpdateStock } = require('../controllers/product');
const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
} = require('../controllers/order');

//prrams
router.param('userId', getUserById);
router.param('orderId', getOrderById);

//create
router.post(
  '/order/create/:userId',
  isSignedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  UpdateStock,
  createOrder
);
router.get('/order/all/:userId', isSignedIn, isAuthenticated, getAllOrders);
//status
router.get(
  '/order/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  getOrderStatus
);
router.put(
  '/order/:orderId/status/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateStatus
);

module.exports = router;
