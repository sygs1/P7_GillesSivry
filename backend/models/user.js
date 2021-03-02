const { Sequelize, DataTypes } = require('sequelize');
//require('../bdd/comseqbdd');


//console.log("pass model user");

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
    email: DataTypes.STRING,    
    password: DataTypes.STRING,   
    pseudo: DataTypes.STRING,    
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users'
  });
  return User;
  
};

//console.log('modele user');