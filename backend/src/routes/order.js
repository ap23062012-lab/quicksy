const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET MY ORDERS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        UserId: req.user.id,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// CREATE ORDER
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const order = await Order.create({
      products,
      totalAmount,
      UserId: req.user.id,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to place order",
    });
  }
});

module.exports = router;