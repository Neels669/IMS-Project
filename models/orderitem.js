import { Model, DataTypes } from 'sequelize';

class OrderItem extends Model {
  static associate(models) {
    OrderItem.belongsTo(models.Order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}

export default (sequelize) => {
  OrderItem.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'OrderItem',
  });

  return OrderItem;
};
