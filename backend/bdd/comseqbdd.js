const User = require('../models/user');


//----------------------------------------------------init
const { Sequelize, Model, DataTypes } = require('sequelize');
//-----------------------------------------------------connect
const sequelize = new Sequelize( 
    "groupomania",
    "root",
    "gsoc2021",   
    { dialect: "mysql",  host: "localhost", port: 3306 }
    
);
//----------------
try {
    sequelize.authenticate();
    console.log('Connection groupomania = success'); 

   User(sequelize, DataTypes);

  } catch (error) {
    console.error('Unable to connect database:', error);   
  }
exports.sequelize=sequelize;












/*
//-----------------------------------------------------auth connection // crea bdd
try {
    sequelize.authenticate();
   
    //console.log('auth connection seq MySQL!');
   
    sequelize.query("CREATE DATABASE `groupomania`;").then(([results, metadata]) => {
   
    console.log('Base de données créée !');
   
    })   
} catch (error) {
   
   console.error('Impossible de se connecter, erreur suivante :', error);
   
};


//-----------------------------------------------------
*/
