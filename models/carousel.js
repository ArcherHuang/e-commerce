'use strict';
module.exports = (sequelize, DataTypes) => {
  const Carousel = sequelize.define('Carousel', {
    name: DataTypes.TEXT,
    image: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {});
  Carousel.associate = function (models) {
    // associations can be defined here
  };
  return Carousel;
};