'use strict';
module.exports = (sequelize, DataTypes) => {
  const CouponDistribution = sequelize.define('CouponDistribution', {
    couponId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    usageStatus: DataTypes.INTEGER
  }, {});
  CouponDistribution.associate = function (models) {
    // associations can be defined here
    CouponDistribution.belongsTo(models.User)
    CouponDistribution.belongsTo(models.Coupon)
    CouponDistribution.belongsTo(models.Order)
  };
  return CouponDistribution;
};