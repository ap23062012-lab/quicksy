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
// REMOVE ITEM FROM CART
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Cart.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    await item.destroy();

    res.json({
      message: "Item removed from cart",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
// UPDATE QUANTITY
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { action } = req.body;

    const item = await Cart.findOne({
      where: {
        id: req.params.id,
        UserId: req.user.id,
      },
    });

    if (!item) {
      return res.status(404).json({
        message: "Cart item not found",
      });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    }

    await item.save();

    res.json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});
module.exports = router;