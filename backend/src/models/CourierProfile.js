module.exports = (sequelize, DataTypes) => {
  const CourierProfile = sequelize.define('CourierProfile', {
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
    company_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vehicle_type: {
      type: DataTypes.ENUM('bike', 'car', 'van'),
      allowNull: false,
    },
    vehicle_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    license_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    current_location: {
      type: DataTypes.JSON,
      defaultValue: { lat: 0, lng: 0 },
    },
    max_capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 50,
    },
    current_load: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    is_available: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    average_rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
    total_deliveries: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    total_earnings: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    bank_account: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verification_date: {
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
    tableName: 'courier_profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return CourierProfile;
};