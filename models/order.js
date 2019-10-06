'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    sn: DataTypes.STRING,
    totalAmount: DataTypes.FLOAT,
    shippingStatus: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    couponDistributionId: DataTypes.INTEGER,
    addDiscount: DataTypes.FLOAT
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
      foreignKey: 'orderId'
    });
  };
  return Order;
};