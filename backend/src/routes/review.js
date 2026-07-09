const express = require("express");
const Review = require("../models/Review");
const Product = require("../models/Product");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// GET REVIEWS OF A PRODUCT
// ==============================
router.get("/:productId", async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: {
        ProductId: req.params.productId,
      },
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// ADD REVIEW
// ==============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existing = await Review.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "You already reviewed this product",
      });
    }

    const review = await Review.create({
      rating,
      comment,
      UserId: req.user.id,
      ProductId: productId,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;