const express = require("express");
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// ==============================
// GET MY WISHLIST
// ==============================
router.get("/", authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findAll({
      where: {
        UserId: req.user.id,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    res.json(wishlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// ADD TO WISHLIST
// ==============================
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existing = await Wishlist.findOne({
      where: {
        UserId: req.user.id,
        ProductId: productId,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      UserId: req.user.id,
      ProductId: productId,
    });

    res.status(201).json(wishlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ==============================
// REMOVE FROM WISHLIST
// ==============================
router.delete("/:productId", authMiddleware, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      where: {
        UserId: req.user.id,
        ProductId: req.params.productId,
      },
    });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist item not found",
      });
    }

    await wishlist.destroy();

    res.json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;