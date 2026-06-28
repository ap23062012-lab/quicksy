const express = require("express");
const Product = require("../models/Product");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// GET SELLER PRODUCTS
router.get(
  "/my-products",
  authMiddleware,
  async (req, res) => {
    try {
      const products = await Product.findAll({
        where: {
          UserId: req.user.id,
        },
      });

      res.json(products);
    } catch (error) {
      console.error(error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// ADD PRODUCT
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
    } = req.body;

    if (req.user.role !== "seller") {
      return res.status(403).json({
        message: "Only sellers can add products",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      UserId: req.user.id,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("PRODUCT ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;