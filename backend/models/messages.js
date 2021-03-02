const { Sequelize, DataTypes } = require('sequelize');
//require('../bdd/comseqbdd'); 


//console.log('pass model message');

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.message.belongTo(models.User,{
        foreignKey: {
          allowNull : TRUE          
        }
      })



    }
  };
  message.init({
    users_idusers: DataTypes.INTEGER,    
    titremessages: DataTypes.STRING,
    message: DataTypes.STRING,
    urlimage: DataTypes.STRING,
    likemessage: DataTypes.INTEGER   

  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};
//console.log('modele messages');