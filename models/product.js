import { Model, DataTypes } from 'sequelize';

class Product extends Model {
  static associate(models) {
    Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' });
    Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Product.hasMany(models.StockMovement, { foreignKey: 'productId', as: 'stockMovements' });
  }
}

export default (sequelize) => {
  Product.init({
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    stock: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};
