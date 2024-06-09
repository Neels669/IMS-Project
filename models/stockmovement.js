'use strict';
module.exports = (sequelize, DataTypes) => {
  const StockMovement = sequelize.define('StockMovement', {
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    change: DataTypes.INTEGER
  }, {});
  StockMovement.associate = function(models) {
    StockMovement.belongsTo(models.Product);
    StockMovement.belongsTo(models.Category);
  };
  return StockMovement;
};
