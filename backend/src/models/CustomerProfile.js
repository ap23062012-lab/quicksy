module.exports = (sequelize, DataTypes) => {
  const CustomerProfile = sequelize.define('CustomerProfile', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    default_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    saved_addresses: {
      type: DataTypes.JSON,
      defaultValue: [],
    },
    loyalty_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    preferred_language: {
      type: DataTypes.STRING,
      defaultValue: 'en',
    },
    last_order_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'customer_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return CustomerProfile;
};