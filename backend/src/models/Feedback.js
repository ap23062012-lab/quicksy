const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Feedback = sequelize.define("Feedback", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER, // Links to the user who submitted it
    allowNull: true, // Allow null just in case, but we will pass it
  }
});

module.exports = Feedback;