'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Carts', 'CouponDistributionId', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Carts', 'CouponDistributionId'),
    ]);
  }
};
