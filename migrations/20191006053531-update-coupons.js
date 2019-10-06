'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Coupons', 'numberOfLimitation', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Coupons', 'expireDate', {
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Coupons', 'amount', {
        type: Sequelize.INTEGER,
      }),
      queryInterface.removeColumn('Coupons', 'number_of_limitation'),
      queryInterface.removeColumn('Coupons', 'expire_date'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Coupons', 'number_of_limitation', {
        type: Sequelize.INTEGER
      }),
      queryInterface.addColumn('Coupons', 'expire_date', {
        type: Sequelize.DATE,
      }),
      queryInterface.removeColumn('Coupons', 'numberOfLimitation'),
      queryInterface.removeColumn('Coupons', 'expireDate'),
      queryInterface.removeColumn('Coupons', 'amount'),
    ]);
  }
};
