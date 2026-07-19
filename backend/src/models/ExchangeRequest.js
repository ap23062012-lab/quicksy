const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = require("./User");
const Order = require("./Order");
const Product = require("./Product");

const ExchangeRequest = sequelize.define("ExchangeRequest", {
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "Approved",
      "Rejected",
      "Completed"
    ),
    defaultValue: "Pending",
  },
});

// Associations
User.hasMany(ExchangeRequest);
ExchangeRequest.belongsTo(User);

Order.hasMany(ExchangeRequest);
ExchangeRequest.belongsTo(Order);

Product.hasMany(ExchangeRequest);
ExchangeRequest.belongsTo(Product);

module.exports = ExchangeRequest;