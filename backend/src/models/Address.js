const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const User = require("./User");

const Address = sequelize.define("Address", {
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  house: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Address);
Address.belongsTo(User);

module.exports = Address;