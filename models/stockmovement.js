'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StockMovement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      StockMovement.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
    }
  }
  StockMovement.init({
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'StockMovement',
  });
  return StockMovement;
};
