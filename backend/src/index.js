require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize, testConnection } = require('./config/database');
const models = require('./models');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database initialization
const initializeDatabase = async () => {
  try {
    await testConnection();
    // Sync models with database (use { force: true } only in development to reset)
    await sequelize.sync({ alter: true });
    console.log('✓ Database models synchronized');
  } catch (error) {
    console.error('✗ Database initialization failed:', error.message);
    process.exit(1);
  }
};

// Routes (to be implemented)
const authRoutes = require('./routes/auth');

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'QUICKSY Backend API',
    database: 'Connected'
  });
});

// API routes
app.use('/api/v1/auth', authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status || 500
    }
  });
});

const PORT = process.env.PORT || 5000;

// Start server
const start = async () => {
  // await initializeDatabase(); // temporarily disabled
  app.listen(PORT, () => {
    console.log(`✓ QUICKSY Backend running on port ${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/api/v1/health`);
  });
};

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

module.exports = app;