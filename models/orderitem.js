'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  OrderItem.associate = function (models) {
    // associations can be defined here
    OrderItem.belongsTo(models.Order)
    OrderItem.belongsTo(models.Product)
  };
  return OrderItem;
};