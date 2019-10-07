'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'categoryId', {
        type: Sequelize.FLOAT
      }),
      queryInterface.removeColumn('Categories', 'productId'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Categories', 'productId', {
        type: Sequelize.FLOAT
      }),
      queryInterface.removeColumn('Products', 'categoryId'),
    ]);
  }
};
