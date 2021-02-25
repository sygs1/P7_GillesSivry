//const { Sequelize } = require('sequelize'); 

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.message)
    }
  };
  User.init({
    iduser: DataTypes.INTEGER,
    username: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    email: DataTypes.STRING,    
    password: DataTypes.STRING,    
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
console.log('userModels');
