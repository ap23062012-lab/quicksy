const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Notification = sequelize.define("Notification", {
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true, // e.g., "/orders"
  },
  UserId: {
    type: DataTypes.UUID, // Using UUID if your User model uses UUIDs
    allowNull: false,
  }
});

module.exports = Notification;