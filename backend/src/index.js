require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sequelize, testConnection } = require("./config/database");

require("./models/User");

const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Route
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    service: "QUICKSY Backend API",
  });
});

// API Routes
app.use("/api/v1/auth", authRoutes);

// Error Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: "Server Error",
  });
});

// Database Initialization
const initializeDatabase = async () => {
  try {
    await testConnection();

    await sequelize.sync();

    console.log("✓ Users table ready");
  } catch (error) {
    console.error("✗ Database initialization failed:", error.message);

    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  await initializeDatabase();

  app.listen(PORT, () => {
    console.log(`✓ QUICKSY Backend running on port ${PORT}`);

    console.log(
      `Health check: http://localhost:${PORT}/api/v1/health`
    );
  });
};

startServer();

module.exports = app;