const express = require("express");
const router = express.Router();
const { validate } = require("../middleware/validate");
const { wishListValidator } = require("../validators");

const {
  createWishList,
  fetchWishList,
  addItemToWishList,
  removeItemFromWishList,
  deleteWishListProducts,
  getWishListItems,
} = require("../controllers/wishListController");

router.post("/", fetchWishList); // origin
router.post(
  "/item",
  wishListValidator.itemRules(),
  validate,
  addItemToWishList
); // origin
router.post("/item/delete", removeItemFromWishList); // origin
router.delete("/", deleteWishListProducts); // origin
router.post("/", wishListValidator.rules(), validate, createWishList);
router.get("/items/:id", getWishListItems);

module.exports = router;
