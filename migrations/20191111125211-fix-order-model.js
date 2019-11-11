'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Orders'),
      queryInterface.createTable('Orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        sn: {
          type: Sequelize.STRING
        },
        totalAmount: {
          type: Sequelize.FLOAT
        },
        shippingStatus: {
          type: Sequelize.INTEGER
        },
        paymentStatus: {
          type: Sequelize.INTEGER
        },
        dataStatus: {
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        couponDistributionId: {
          type: Sequelize.INTEGER
        },
        addDiscount: {
          type: Sequelize.FLOAT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.dropTable('Orders'),
      queryInterface.createTable('Orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        name: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        address: {
          type: Sequelize.STRING
        },
        sn: {
          type: Sequelize.STRING
        },
        totalAmount: {
          type: Sequelize.FLOAT
        },
        shippingStatus: {
          type: Sequelize.STRING
        },
        paymentStatus: {
          type: Sequelize.STRING
        },
        dataStatus: {
          type: Sequelize.INTEGER
        },
        userId: {
          type: Sequelize.INTEGER
        },
        couponDistributionId: {
          type: Sequelize.INTEGER
        },
        addDiscount: {
          type: Sequelize.FLOAT
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ]);
  }
};
