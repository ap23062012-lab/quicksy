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
    const { name, description, price, image } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to add product",
    });
  }
});

module.exports = router;