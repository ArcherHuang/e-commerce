'use strict';
module.exports = (sequelize, DataTypes) => {
  const CouponDistribution = sequelize.define('CouponDistribution', {
    coupon_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    usage_status: DataTypes.INTEGER,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  CouponDistribution.associate = function (models) {
    // associations can be defined here
    CouponDistribution.belongsTo(models.User)
    CouponDistribution.belongsTo(models.Coupon)
    CouponDistribution.belongsTo(models.Order)
  };
  return CouponDistribution;
};