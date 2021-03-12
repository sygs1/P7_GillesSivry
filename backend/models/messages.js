'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
    title: DataTypes.STRING,
    message: DataTypes.TEXT,
    urlimage: DataTypes.STRING,
   // messagelike: DataTypes.INTEGER,
   // createdAt: DataTypes.STRING
  }, {});


  Message.associate = function (models) {
    // associations can be defined here
    models.Message.hasMany(models.Comment, { onDelete: 'cascade' })
    models.Message.hasMany(models.Like, { onDelete: 'cascade' })
  };
  return Message;
};
