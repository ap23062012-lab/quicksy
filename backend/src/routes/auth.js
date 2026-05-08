const express = require("express");

const router = express.Router();

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Demo login
  if (email === "admin@gmail.com" && password === "123456") {
    return res.status(200).json({
      message: "Login successful",
      user: {
        email,
      },
    });
  }

  return res.status(401).json({
    message: "Invalid email or password",
  });
});

module.exports = router;