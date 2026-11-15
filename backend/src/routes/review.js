const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Review = require("../models/Review");
const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User"); // 👈 ADDED USER IMPORT

const router = express.Router();

// GET REVIEWS FOR A PRODUCT
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { ProductId: req.params.productId },
      include: [{ model: User, attributes: ["name"] }], // 👈 ADDED USER INCLUDE
      order: [["createdAt", "DESC"]],
    });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE A REVIEW (STRICT VALIDATION)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!productId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Valid productId and rating (1-5) are required." });
    }

    const existingReview = await Review.findOne({
      where: { ProductId: productId, UserId: req.user.id },
    });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product." });
    }

    const orders = await Order.findAll({
      where: { UserId: req.user.id, status: "Delivered" },
    });

    let hasBoughtProduct = false;
    for (const order of orders) {
      const products = Array.isArray(order.products) ? order.products : [];
      if (products.some((p) => Number(p.id) === Number(productId))) {
        hasBoughtProduct = true;
        break;
      }
    }

    if (!hasBoughtProduct) {
      return res.status(403).json({ 
        message: "You can only review products you have purchased and received." 
      });
    }

    const review = await Review.create({
      ProductId: productId,
      UserId: req.user.id,
      rating: Number(rating),
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;