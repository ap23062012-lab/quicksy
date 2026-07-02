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

// Many-to-Many relationship
User.belongsToMany(Product, {
  through: Wishlist,
});

Product.belongsToMany(User, {
  through: Wishlist,
});

// Direct associations (needed for include:)
Wishlist.belongsTo(User);

Wishlist.belongsTo(Product);

User.hasMany(Wishlist);

Product.hasMany(Wishlist);

module.exports = Wishlist;