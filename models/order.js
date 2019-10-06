'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    sn: DataTypes.STRING,
    total_amount: DataTypes.FLOAT,
    shipping_status: DataTypes.STRING,
    payment_status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    coupon_distribution_id: DataTypes.INTEGER,
    add_discount: DataTypes.FLOAT,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Order.associate = function (models) {
    // associations can be defined here
    Order.belongsTo(models.User)
    Order.hasMany(models.Payment)
    Order.hasOne(models.CouponDistribution)
    Order.belongsToMany(models.Product, {
      as: 'items',
      through: {
        model: models.OrderItem, unique: false
      },
      foreignKey: 'order_id'
    });
  };
  return Order;
};