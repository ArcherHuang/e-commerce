'use strict';
module.exports = (sequelize, DataTypes) => {
  const CouponDistribution = sequelize.define('CouponDistribution', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
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
    // CouponDistribution.hasMany(models.Order)
  };
  return CouponDistribution;
};