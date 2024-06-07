import { Model, DataTypes } from 'sequelize';

class StockMovement extends Model {
  static associate(models) {
    StockMovement.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

export default (sequelize) => {
  StockMovement.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'StockMovement',
  });

  return StockMovement;
};
