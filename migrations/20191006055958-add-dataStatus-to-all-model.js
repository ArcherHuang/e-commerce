'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Carts', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('CartItems', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Categories', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Coupons', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('CouponDistributions', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Likes', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Orders', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('OrderItems', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('PageViews', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Payments', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Products', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.addColumn('Reviews', 'dataStatus', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Carts', 'dataStatus'),
      queryInterface.removeColumn('CartItems', 'dataStatus'),
      queryInterface.removeColumn('Categories', 'dataStatus'),
      queryInterface.removeColumn('Coupons', 'dataStatus'),
      queryInterface.removeColumn('CouponDistributions', 'dataStatus'),
      queryInterface.removeColumn('Likes', 'dataStatus'),
      queryInterface.removeColumn('Orders', 'dataStatus'),
      queryInterface.removeColumn('OrderItems', 'dataStatus'),
      queryInterface.removeColumn('PageViews', 'dataStatus'),
      queryInterface.removeColumn('Payments', 'dataStatus'),
      queryInterface.removeColumn('Products', 'dataStatus'),
      queryInterface.removeColumn('Reviews', 'dataStatus'),
    ]);
  }
};
