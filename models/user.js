'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Order);
  };
  return User;
};
