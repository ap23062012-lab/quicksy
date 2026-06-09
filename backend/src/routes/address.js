const express = require("express");
const Address = require("../models/Address");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET MY ADDRESS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: {
        UserId: req.user.id,
      },
    });

    res.json(addresses);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// ADD ADDRESS
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
    } = req.body;

    const address = await Address.create({
      fullName,
      phone,
      house,
      area,
      city,
      state,
      pincode,
      UserId: req.user.id,
    });

    res.status(201).json(address);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to save address",
    });
  }
});

module.exports = router;