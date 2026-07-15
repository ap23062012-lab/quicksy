const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = require("./User");
const Order = require("./Order");

const ReturnRequest = sequelize.define("ReturnRequest", {
  type: {
    type: DataTypes.ENUM("Return", "Exchange"),
    allowNull: false,
  },

  reason: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  image: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  sellerResponse: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  status: {
    type: DataTypes.ENUM(
      "Pending",
      "Approved",
      "Rejected",
      "Replacement Shipped",
      "Replacement Delivered",
      "Refund Initiated",
      "Refund Completed"
    ),
    defaultValue: "Pending",
  },
});

User.hasMany(ReturnRequest);
ReturnRequest.belongsTo(User);

Order.hasMany(ReturnRequest);
ReturnRequest.belongsTo(Order);

module.exports = ReturnRequest;