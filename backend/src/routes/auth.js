const express = require('express');
const router = express.Router();

// Placeholder auth routes
router.post('/register', (req, res) => {
  res.json({ message: 'Register endpoint - TODO' });
});

router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint - TODO' });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout endpoint - TODO' });
});

module.exports = router;