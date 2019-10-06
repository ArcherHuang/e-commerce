'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  CartItem.associate = function (models) {
    // associations can be defined here
    CartItem.belongsTo(models.Cart)
    CartItem.belongsTo(models.Product)
  };
  return CartItem;
};