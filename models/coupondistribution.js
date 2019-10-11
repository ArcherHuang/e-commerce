'use strict';
module.exports = (sequelize, DataTypes) => {
  const CouponDistribution = sequelize.define('CouponDistribution', {
    CouponId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    usageStatus: DataTypes.INTEGER,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  CouponDistribution.associate = function (models) {
    // associations can be defined here
    CouponDistribution.belongsTo(models.User)
    CouponDistribution.belongsTo(models.Coupon)
    CouponDistribution.hasOne(models.Order)
  };
  return CouponDistribution;
};