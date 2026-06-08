const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const router = express.Router();

// GET CART
router.get("/", async (req, res) => {
  try {
    const cart = await Cart.findAll({
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
router.post("/", async (req, res) => {
  try {
    const { productId } = req.body;

    const item = await Cart.create({
      ProductId: productId,
      UserId: 1,
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