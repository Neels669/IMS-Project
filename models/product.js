'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
      Product.hasMany(models.StockMovement, { foreignKey: 'productId', as: 'stockMovements' });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
