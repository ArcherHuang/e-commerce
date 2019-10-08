'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'description', {
        type: Sequelize.TEXT
      }),
      queryInterface.removeColumn('Products', 'discription'),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'discription', {
        type: Sequelize.TEXT
      }),
      queryInterface.removeColumn('Products', 'description'),
    ]);
  }
};
