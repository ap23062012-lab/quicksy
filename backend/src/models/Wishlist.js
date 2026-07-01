const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = require("./User");
const Product = require("./Product");

const Wishlist = sequelize.define(
  "Wishlist",
  {},
  {
    timestamps: true,
  }
);

User.belongsToMany(Product, {
  through: Wishlist,
});

Product.belongsToMany(User, {
  through: Wishlist,
});

module.exports = Wishlist;