'use strict';
module.exports = (sequelize, DataTypes) => {
  const PageView = sequelize.define('PageView', {
    view_count: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    data_status: {
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