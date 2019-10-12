'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    name: DataTypes.STRING,
    sn: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    numberOfLimitation: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    expireDate: DataTypes.DATE,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Coupon.associate = function (models) {
    // associations can be defined here
    Coupon.hasMany(models.CouponDistribution)
    Coupon.belongsToMany(models.User, {
      as: 'owners',
      through: {
        model: models.CouponDistribution, unique: false
      },
      foreignKey: 'CouponId'
    });
  };
  return Coupon;
};