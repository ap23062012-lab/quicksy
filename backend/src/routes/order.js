const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET MY ORDERS (CUSTOMER)
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

// GET SELLER ORDERS
router.get(
  "/seller-orders",
  authMiddleware,
  async (req, res) => {
    try {
      // ONLY SELLERS CAN ACCESS
      if (req.user.role !== "seller") {
        return res.status(403).json({
          message: "Only sellers can access this",
        });
      }

      // GET ALL ORDERS
      const allOrders = await Order.findAll({
        order: [["createdAt", "DESC"]],
      });

      // FILTER ORDERS BELONGING TO THIS SELLER
      const sellerOrders = allOrders.filter(
        (order) =>
          order.products &&
          order.products.some(
            (product) =>
              product.sellerId === req.user.id
          )
      );

      res.json(sellerOrders);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

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