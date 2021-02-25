// ancienne version bdd= schema 1


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likescommentaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.likescommentaire.belongTo(models.User,{
        foreignKey: {
          allowNull : true          
        }
      })



    }
  };
  likescommentaire.init({
    idlikecommentaire: DataTypes.INTEGER,
    likecommentaire: DataTypes.INTEGER   
     
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};