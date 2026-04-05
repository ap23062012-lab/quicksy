const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  pool: {
    max: parseInt(process.env.DATABASE_POOL_SIZE) || 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✓ Database connection established');
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    throw error;
  }
};

module.exports = { sequelize, testConnection };