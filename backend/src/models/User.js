const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  profileImage: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  role: {
    type: DataTypes.ENUM("customer", "seller"),
    defaultValue: "customer",
  },
});

module.exports = User;