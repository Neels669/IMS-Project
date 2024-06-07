import { Model, DataTypes } from 'sequelize';

class Order extends Model {
  static associate(models) {
    Order.hasMany(models.OrderItem, { foreignKey: 'orderId', as: 'orderItems' });
    Order.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  }
}

export default (sequelize) => {
  Order.init({
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING,
    total: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'Order',
  });

  return Order;
};
