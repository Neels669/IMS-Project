import { Model, DataTypes } from 'sequelize';

class User extends Model {
  static associate(models) {
    User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
  }
}

export default (sequelize) => {
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  return User;
};
