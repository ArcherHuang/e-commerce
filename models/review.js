'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: DataTypes.TEXT,
    product_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.Product)
    Review.belongsTo(models.User)
  };
  return Review;
};