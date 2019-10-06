'use strict';
module.exports = (sequelize, DataTypes) => {
  const Coupon = sequelize.define('Coupon', {
    name: DataTypes.STRING,
    sn: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    number_of_limitation: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    expire_date: DataTypes.DATE,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Coupon.associate = function (models) {
    // associations can be defined here
    Coupon.hasMany(models.CouponDistribution)
    Coupon.belongsToMany(models.User, {
      as: 'users',
      through: {
        model: models.CouponDistribution, unique: false
      },
      foreignKey: 'coupon_id'
    });
  };
  return Coupon;
};