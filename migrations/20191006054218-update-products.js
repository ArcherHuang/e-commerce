'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Products', 'length', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Products', 'width', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Products', 'height', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Products', 'weight', {
        type: Sequelize.FLOAT
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Products', 'length'),
      queryInterface.removeColumn('Products', 'width'),
      queryInterface.removeColumn('Products', 'height'),
      queryInterface.removeColumn('Products', 'weight'),

    ]);
  }
};
