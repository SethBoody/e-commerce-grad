const express = require('express');
const router = express.Router();
const { validate } = require('../middleware/validate');
const { cartValidator } = require('../validators');

const {
  fetchCart,
  addItemToCart,
  deleteItemCart,
  deleteAllItemsCart,
} = require('../controllers/cartController');

router.post('/', fetchCart);
router.post('/item', cartValidator.rules(), validate, addItemToCart);
router.post('/item/:id', deleteItemCart);
router.delete('/', deleteAllItemsCart);

module.exports = router;
