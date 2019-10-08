'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('CartItems', 'productId', 'ProductId'),
      queryInterface.renameColumn('CartItems', 'cartId', 'CartId'),
      queryInterface.renameColumn('CouponDistributions', 'userId', 'UserId'),
      queryInterface.renameColumn('CouponDistributions', 'couponId', 'CouponId'),
      queryInterface.renameColumn('Likes', 'productId', 'ProductId'),
      queryInterface.renameColumn('Likes', 'userId', 'UserId'),
      queryInterface.renameColumn('Orders', 'userId', 'UserId'),
      queryInterface.renameColumn('Orders', 'couponDistributionId', 'CouponDistributionId'),
      queryInterface.renameColumn('OrderItems', 'orderId', 'OrderId'),
      queryInterface.renameColumn('OrderItems', 'productId', 'ProductId'),
      queryInterface.renameColumn('PageViews', 'productId', 'ProductId'),
      queryInterface.renameColumn('PageViews', 'userId', 'UserId'),
      queryInterface.renameColumn('Payments', 'orderId', 'OrderId'),
      queryInterface.renameColumn('Reviews', 'productId', 'ProductId'),
      queryInterface.renameColumn('Reviews', 'userId', 'UserId'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.renameColumn('CartItems', 'ProductId', 'productId'),
      queryInterface.renameColumn('CartItems', 'CartId', 'cartId'),
      queryInterface.renameColumn('CouponDistributions', 'UserId', 'userId'),
      queryInterface.renameColumn('CouponDistributions', 'CouponId', 'couponId'),
      queryInterface.renameColumn('Likes', 'ProductId', 'productId'),
      queryInterface.renameColumn('Likes', 'UserId', 'userId'),
      queryInterface.renameColumn('Orders', 'UserId', 'userId'),
      queryInterface.renameColumn('Orders', 'CouponDistributionId', 'couponDistributionId'),
      queryInterface.renameColumn('OrderItems', 'OrderId', 'orderId'),
      queryInterface.renameColumn('OrderItems', 'ProductId', 'productId'),
      queryInterface.renameColumn('PageViews', 'ProductId', 'productId'),
      queryInterface.renameColumn('PageViews', 'UserId', 'userId'),
      queryInterface.renameColumn('Payments', 'OrderId', 'orderId'),
      queryInterface.renameColumn('Reviews', 'ProductId', 'productId'),
      queryInterface.renameColumn('Reviews', 'UserId', 'userId'),
    ]);
  }
};
