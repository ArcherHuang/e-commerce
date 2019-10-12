'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    isValid: DataTypes.BOOLEAN,
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
      as: 'couponsOwned',
      through: {
        model: models.CouponDistribution, unique: false
      },
      foreignKey: 'UserId'
    });
    User.belongsToMany(models.Product, {
      as: 'productViewed',
      through: {
        model: models.PageView, unique: false
      },
      foreignKey: 'UserId'
    });
    User.belongsToMany(models.Product, {
      as: 'productLiked',
      through: {
        model: models.Like, unique: false
      },
      foreignKey: 'UserId'
    });
    User.belongsToMany(models.Product, {
      as: 'productReviewed',
      through: {
        model: models.Review, unique: false
      },
      foreignKey: 'UserId'
    });
  };
  return User;
};