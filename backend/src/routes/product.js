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

// UPDATE PRODUCT
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.UserId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const {
      name,
      description,
      price,
      image,
      category,
    } = req.body;

    await product.update({
      name,
      description,
      price,
      image,
      category,
    });

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// DELETE PRODUCT
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.UserId !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await product.destroy();

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;