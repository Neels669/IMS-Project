import { Model, DataTypes } from 'sequelize';

class Category extends Model {
  static associate(models) {
    Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
  }
}

export default (sequelize) => {
  Category.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Category',
  });

  return Category;
};
