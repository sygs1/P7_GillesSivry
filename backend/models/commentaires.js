'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class commentaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.commentaires.belongTo(models.User,{
        foreignKey: {
          allowNull : true          
        }
      })


    }
  };
  commentaires.init({
    idcommentaires: DataTypes.INTEGER,
    messages_idmessages: DataTypes.INTEGER,
     
    commentaire: DataTypes.STRING,
    likecommentaire: DataTypes.INTEGER   
     
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};