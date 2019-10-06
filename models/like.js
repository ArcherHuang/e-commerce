'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    dataStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Like.associate = function (models) {
    // associations can be defined here
    Like.belongsTo(models.User)
    Like.belongsTo(models.Product)
  };
  return Like;
};