'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    Order.belongsTo(models.User);
    Order.belongsTo(models.Product);
  };
  return Order;
};
