const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Feedback = sequelize.define("Feedback", {
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  }
});

module.exports = Feedback;