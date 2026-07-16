const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  // NEW
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  // NEW
  sold: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  // NEW
  exchangeAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

// RELATIONSHIP
User.hasMany(Product);
Product.belongsTo(User);

module.exports = Product;