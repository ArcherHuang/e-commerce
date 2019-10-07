'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    quantity: DataTypes.INTEGER,
    cartId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    dataStatus: {
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