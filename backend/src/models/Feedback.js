const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User"); // 👈 IMPORT USER

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

// 👇 ADD THE ASSOCIATION HERE 👇
Feedback.belongsTo(User, { foreignKey: "UserId" });
User.hasMany(Feedback, { foreignKey: "UserId" });

module.exports = Feedback;