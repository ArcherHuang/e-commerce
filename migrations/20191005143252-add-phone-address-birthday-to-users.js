'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('Users', 'phone', {
        type: Sequelize.STRING
      }),
      queryInterface.addColumn('Users', 'address', {
        type: Sequelize.STRING,
      }),
      queryInterface.addColumn('Users', 'birthday', {
        type: Sequelize.DATE,
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'phone'),
      queryInterface.removeColumn('Users', 'address'),
      queryInterface.removeColumn('Users', 'birthday')
    ]);
  }
};
