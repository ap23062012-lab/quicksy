const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Import models
const User = require('./User')(sequelize, DataTypes);
const CustomerProfile = require('./CustomerProfile')(sequelize, DataTypes);
const SellerProfile = require('./SellerProfile')(sequelize, DataTypes);
const CourierProfile = require('./CourierProfile')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);
const Order = require('./Order')(sequelize, DataTypes);
const OrderItem = require('./OrderItem')(sequelize, DataTypes);
const Notification = require('./Notification')(sequelize, DataTypes);
const Transaction = require('./Transaction')(sequelize, DataTypes);

// Define associations
User.hasOne(CustomerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CustomerProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(SellerProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
SellerProfile.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(CourierProfile, { foreignKey: 'user_id', onDelete: 'CASCADE' });
CourierProfile.belongsTo(User, { foreignKey: 'user_id' });

SellerProfile.hasMany(Product, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Product.belongsTo(SellerProfile, { foreignKey: 'seller_id' });

User.hasMany(Order, { foreignKey: 'customer_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'customer_id', as: 'customer' });

SellerProfile.hasMany(Order, { foreignKey: 'seller_id', onDelete: 'CASCADE' });
Order.belongsTo(SellerProfile, { foreignKey: 'seller_id' });

CourierProfile.hasMany(Order, { foreignKey: 'courier_id', onDelete: 'SET NULL' });
Order.belongsTo(CourierProfile, { foreignKey: 'courier_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id', onDelete: 'CASCADE' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(Notification, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Transaction, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  CustomerProfile,
  SellerProfile,
  CourierProfile,
  Product,
  Order,
  OrderItem,
  Notification,
  Transaction,
};