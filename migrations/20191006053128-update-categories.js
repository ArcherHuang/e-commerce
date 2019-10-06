'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Categories', 'description', {
        type: Sequelize.TEXT
      }),
      queryInterface.addColumn('Categories', 'productId', {
        type: Sequelize.INTEGER,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Categories', 'description'),
      queryInterface.removeColumn('Categories', 'productId'),
    ]);
  }
};
