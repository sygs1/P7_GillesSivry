//----------------------------------------------------init
const { Sequelize } = require('sequelize'); 

//-----------------------------------------------------connect
const sequelize = new Sequelize( 
    process.env.sqldb, 
    process.env.sqluser1, 
    process.env.sqlpassword,
    { dialect: "mysql",  host: "localhost:8080" }
);

//-----------------------------------------------------verif connect avec auth
try {   
    sequelize.authenticate();   
    console.log('Connecté à la base de données MySQL!'); 

} catch (error) {   console.error('Impossible de se connecter, erreur suivante :', error); 
};

//-----------------------------------------------------crea bdd
try {
    sequelize.authenticate();
   
    console.log('Connecté à la base de données MySQL!');
   
    sequelize.query("CREATE DATABASE `groupomania`;").then(([results, metadata]) => {
   
    console.log('Base de données créée !');
   
    })   
} catch (error) {
   
    console.error('Impossible de se connecter, erreur suivante :', error);
   
};

//-----------------------------------------------------

