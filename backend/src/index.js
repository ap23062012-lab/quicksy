const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize, testConnection } = require("./config/database");

const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

// LOAD MODELS
require("./models/User");
require("./models/Product");
require("./models/Cart");

const app = express();

const PORT = process.env.PORT || 10000;

// MIDDLEWARE
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);

// HEALTH CHECK
app.get("/api/v1/health", (req, res) => {
  res.json({
    message: "QUICKSY Backend Running",
  });
});

// START SERVER
const startServer = async () => {
  try {
    await testConnection();

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log(
        `✓ QUICKSY Backend running on port ${PORT}`
      );

      console.log(
        `Health check: http://localhost:${PORT}/api/v1/health`
      );
    });
  } catch (error) {
    console.error(
      "✗ Database initialization failed:",
      error.message
    );
  }
};

startServer();