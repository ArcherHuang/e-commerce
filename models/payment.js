'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    sn: DataTypes.STRING,
    paymentMethod: DataTypes.STRING,
    payAt: DataTypes.DATE,
    params: DataTypes.TEXT,
    orderId: DataTypes.INTEGER,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Payment.associate = function (models) {
    // associations can be defined here
    Payment.belongsTo(models.Order)
  };
  return Payment;
};