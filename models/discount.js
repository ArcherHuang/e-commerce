'use strict';
module.exports = (sequelize, DataTypes) => {
  const Discount = sequelize.define('Discount', {
    name: DataTypes.STRING,
    requireAmount: DataTypes.INTEGER,
    discountAmount: DataTypes.INTEGER,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Discount.associate = function (models) {
    // associations can be defined here
  };
  return Discount;
};