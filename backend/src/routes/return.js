const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");

const ReturnRequest = require("../models/ReturnRequest");
const Order = require("../models/Order");

const router = express.Router();

/*
==================================
CUSTOMER CREATE RETURN REQUEST
==================================
*/

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      orderId,
      type,
      reason,
      image,
    } = req.body;

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.UserId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const deliveredDate = new Date(order.updatedAt);

const today = new Date();

const difference =
  (today - deliveredDate) /
  (1000 * 60 * 60 * 24);

if (difference > 7) {
  return res.status(400).json({
    message:
      "Return period has expired (7 days).",
  });
}
    if (order.status !== "Delivered") {
      return res.status(400).json({
        message: "Only delivered orders can be returned."
      });
    }

    const request = await ReturnRequest.create({
      type,
      reason,
      image,
      UserId: req.user.id,
      OrderId: order.id,
    });

    res.status(201).json(request);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
==================================
CUSTOMER RETURN HISTORY
==================================
*/

router.get("/my", authMiddleware, async (req, res) => {
  try {

    const requests = await ReturnRequest.findAll({
      where: {
        UserId: req.user.id,
      },
      include: [Order],
      order: [["createdAt", "DESC"]],
    });

    res.json(requests);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error",
    });

  }
});

module.exports = router;