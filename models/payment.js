'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    sn: DataTypes.STRING,
    payment_method: DataTypes.STRING,
    pay_at: DataTypes.DATE,
    params: DataTypes.TEXT,
    order_id: DataTypes.INTEGER,
    data_status: {
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