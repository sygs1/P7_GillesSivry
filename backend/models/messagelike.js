'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    idmessage: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Message',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    isLike: DataTypes.INTEGER
  }, {});

  Like.associate = function (models) {
    // associations between tables
    //Many to many association with a join table
    models.User.belongsToMany(models.Message, {
      through: models.Like,
      foreignKey: 'userId',
      otherKey: 'idmessage',
    });

    models.Message.belongsToMany(models.User, {
      through: models.Like,
      foreignKey: 'idmessage',
      otherKey: 'userId',
    });

    models.Like.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });

    models.Like.belongsTo(models.Message, {
      foreignKey: 'idmessage',
      as: 'message',
    });


  };
  return Like;
};