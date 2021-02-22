'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class moderateurs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.moderateurs.belongTo(models.User,{
        foreignKey: {
          allowNull : true          
        }
      })


    }
  };
moderateurs.init({
    idmoderateurs: DataTypes.INTEGER,
    login: DataTypes.STRING, 
    password :  DataTypes.STRING, 
    isAdmin: DataTypes.BOOLEAN
     
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};