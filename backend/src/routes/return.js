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
    const { orderId, type, reason, image } = req.body;

    if (!orderId || !type) {
      return res.status(400).json({ message: "orderId and type are required" });
    }

    if (!["Return", "Exchange"].includes(type)) {
      return res.status(400).json({ message: "Invalid request type" });
    }

    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.UserId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (order.status !== "Delivered") {
      return res.status(400).json({ message: "Only delivered orders can be returned." });
    }

    // 7-day window
    const deliveredDate = new Date(order.updatedAt);
    const today = new Date();
    const difference = (today - deliveredDate) / (1000 * 60 * 60 * 24);
    if (difference > 7) {
      return res.status(400).json({ message: "Return period has expired (7 days)." });
    }

    // ✅ NEW: prevent duplicate requests for the same order
    const existing = await ReturnRequest.findOne({
      where: { OrderId: order.id },
    });
    if (existing) {
      return res.status(400).json({
        message: `A ${existing.type.toLowerCase()} request already exists for this order (status: ${existing.status}).`,
      });
    }

    // ✅ NEW: exchange-specific validation (uses order snapshot saved at checkout)
    if (type === "Exchange") {
      const products = Array.isArray(order.products) ? order.products : [];
      const exchangeable = products.filter(
        (p) => p.exchangeAvailable === true && Number(p.stock) > 0
      );

      if (exchangeable.length === 0) {
        return res.status(400).json({
          message:
            "Exchange is not available for the product(s) in this order (exchange disabled or out of stock).",
        });
      }
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
    res.status(500).json({ message: "Server error" });
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
      where: { UserId: req.user.id },
      include: [Order],
      order: [["createdAt", "DESC"]],
    });
    res.json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*
==================================
SELLER VIEW RETURN/EXCHANGE REQUESTS
==================================
*/
router.get("/seller", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can access this" });
    }

    const allRequests = await ReturnRequest.findAll({
      include: [Order],
      order: [["createdAt", "DESC"]],
    });

    // ✅ NEW: only show requests where the order contains a product owned by this seller
    const myRequests = allRequests.filter((request) => {
      const products = Array.isArray(request.Order?.products)
        ? request.Order.products
        : [];
      return products.some((p) => Number(p.sellerId) === Number(req.user.id));
    });

    res.json(myRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

/*
==================================
SELLER APPROVE / REJECT
==================================
*/
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "seller") {
      return res.status(403).json({ message: "Only sellers can update requests" });
    }

    const request = await ReturnRequest.findByPk(req.params.id);

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Status must be Approved or Rejected" });
    }

    request.status = status;
    await request.save();

    res.json({ message: "Status updated", request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;