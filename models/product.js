'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT,
    categoryId: DataTypes.INTEGER
  }, {});
  Product.associate = function(models) {
    Product.belongsTo(models.Category);
    Product.hasMany(models.Order);
    Product.hasMany(models.StockMovement);
  };
  return Product;
};
