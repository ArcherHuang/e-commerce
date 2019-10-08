'use strict';
module.exports = (sequelize, DataTypes) => {
  const PageView = sequelize.define('PageView', {
    viewCount: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  PageView.associate = function (models) {
    // associations can be defined here
    PageView.belongsTo(models.User)
    PageView.belongsTo(models.Product)
  };
  return PageView;
};