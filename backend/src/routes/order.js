const express = require("express");
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// GET MY ORDERS (CUSTOMER)
// ==============================
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

// ==============================
// GET SELLER ORDERS
// ==============================
router.get("/seller-orders", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Only sellers can access this",
      });
    }

    const allOrders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });

    const sellerOrders = allOrders.filter(
      (order) =>
        order.products &&
        order.products.some(
          (product) => product.sellerId === req.user.id
        )
    );

    res.json(sellerOrders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// CUSTOMER CANCEL ORDER
// ==============================
router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Only owner can cancel
    if (order.UserId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    // Only Pending orders
    if (order.status !== "Pending") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    order.status = "Cancelled";

    await order.save();

    res.json({
      message: "Order cancelled successfully",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// SELLER UPDATE ORDER STATUS
// ==============================
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Only sellers can update status",
      });
    }

    const { status } = req.body;

    const order = await Order.findByPk(req.params.id);
    // Don't allow updating cancelled orders
if (order.status === "Cancelled") {
  return res.status(400).json({
    message: "Cancelled orders cannot be updated.",
  });
}

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Allowed status flow
if (
  (order.status === "Pending" && status === "Shipped") ||
  (order.status === "Shipped" && status === "Delivered")
) {
  order.status = status;
} else {
  return res.status(400).json({
    message: "Invalid status update.",
  });
}

    await order.save();

    res.json({
      message: "Order status updated",
      order,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// CREATE ORDER
// ==============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      products,
      totalAmount,
      shippingAddress,
    } = req.body;

    const order = await Order.create({
      products,
      totalAmount,
      shippingAddress,
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
