'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'description', {
        type: Sequelize.FLOAT
      }),
      queryInterface.removeColumn('Products', 'discription'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'discription', {
        type: Sequelize.FLOAT
      }),
      queryInterface.removeColumn('Products', 'description'),
    ]);
  }
};
