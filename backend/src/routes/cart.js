const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET USER CART
router.get("/", authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: {
        UserId: req.user.id,
      },
      include: [Product],
    });

    res.json(cart);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ADD TO CART
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    const item = await Cart.create({
      ProductId: productId,
      UserId: req.user.id,
      quantity: 1,
    });

    res.status(201).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add to cart",
    });
  }
});

module.exports = router;