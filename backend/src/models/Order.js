const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Order = sequelize.define("Order", {
  products: {
    type: DataTypes.JSON,
    allowNull: false,
  },

  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    defaultValue: "Pending",
  },
});

User.hasMany(Order);
Order.belongsTo(User);

module.exports = Order;