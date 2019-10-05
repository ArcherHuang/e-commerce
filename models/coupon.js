'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    name: DataTypes.STRING,
    sn: DataTypes.STRING,
    number_of_limitation: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    expire_date: DataTypes.DATE
  }, {});
  Coupon.associate = function(models) {
    // associations can be defined here
  };
  return Coupon;
};