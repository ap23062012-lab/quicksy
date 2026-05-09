const express = require("express");

const router = express.Router();

// Temporary users storage
const users = [];

// SIGNUP ROUTE
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Create new user
  const newUser = {
    name,
    email,
    password,
  };

  users.push(newUser);

  return res.status(201).json({
    message: "Account created successfully",
    user: newUser,
  });
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (user) =>
      user.email === email &&
      user.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  return res.status(200).json({
    message: "Login successful",
    user,
  });
});

module.exports = router;