'use strict';
module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    content: DataTypes.TEXT,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Notification.associate = function (models) {
    // associations can be defined here
  };
  return Notification;
};