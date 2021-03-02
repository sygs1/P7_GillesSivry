//----------------------------------------------------init
const { Sequelize, Model, DataTypes } = require('sequelize');
 
//-----------------------------------------------------connect
const sequelize = new Sequelize( 
    "groupomania2",
    "root",
    "gsoc2021",   
    { dialect: "mysql",  host: "localhost", port: 3306 }
);
//-----------------------------------------------------verif connect avec auth
try {   
    sequelize.authenticate(); 
    //console.log('----------------'); 
    //console.log('comseqbdd = auth sequelize 3306 ok'); 
    //console.log('----------------');

} catch (error) {   console.error('Impossible de se connecter, erreur suivante :', error); 
};



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
