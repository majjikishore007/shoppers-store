const express = require('express');
const router = express.Router();

const {
  getProductById,
  createProduct,
  getProduct,
  photo,
  deleteProduct,
  updateProduct,
  getAllproducts,
  getAllUniqueCategories,
} = require('../controllers/product');
const {} = require('../controllers/category');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');

//parm
router.param('userId', getUserById);
router.param('productId', getProductById);

//create routes
router.post(
  '/product/create/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createProduct
);

//read routes
router.get('/product/:productId', getProduct);
router.get('/product/photo/:productId', photo);

//delete and update routes
router.delete(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteProduct
);
router.put(
  '/product/:productId/:userId',
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateProduct
);

//listing routes
router.get('/products', getAllproducts);

router.get('/products/categories', getAllUniqueCategories);

module.exports = router;
