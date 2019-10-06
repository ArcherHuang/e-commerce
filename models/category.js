'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    product_id: DataTypes.INTEGER,
    data_status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Product)
  };
  return Category;
};