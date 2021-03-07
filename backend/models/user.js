'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,    
    password: DataTypes.STRING,
    pseudo: DataTypes.STRING,
    
  }, {});

  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Message)
    models.User.hasMany(models.Comment)
  };

  return User;
};