const express = require("express");
const Product = require("../models/Product");

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

// ADD PRODUCT
router.post("/", async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
    } = req.body;

    const product = await Product.create({
      seller_id: "00000000-0000-0000-0000-000000000001",
      name,
      description,
      price,
      category,
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