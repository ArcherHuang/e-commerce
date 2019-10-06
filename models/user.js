'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    is_valid: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Order)
    User.hasMany(models.Review)
    User.hasMany(models.Like)
    User.hasMany(models.PageView)
    User.hasMany(models.CouponDistribution)

    User.belongsToMany(models.Coupon, {
      as: 'coupons',
      through: {
        model: models.CouponDistribution, unique: false
      },
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Product, {
      as: 'productViewd',
      through: {
        model: models.PageView, unique: false
      },
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Product, {
      as: 'productLiked',
      through: {
        model: models.Like, unique: false
      },
      foreignKey: 'user_id'
    });
    User.belongsToMany(models.Product, {
      as: 'productReviewed',
      through: {
        model: models.Review, unique: false
      },
      foreignKey: 'user_id'
    });
  };
  return User;
};