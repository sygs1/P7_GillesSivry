const express = require('express'); // cadrage techno
//const mongoose = require('mongoose');  // cadrage techno
const { Sequelize, Model, DataTypes } = require('sequelize'); 
const app = express();

const userRoutes = require('./routes/user');
const messagesRoutes = require('./routes/messages');
const commentairesRoutes = require('./routes/commentaires');

//const mysql = require('mysql');
//--
const bodyParser = require('body-parser');
const path = require('path'); //gestion dossier

//---
const helmet = require('helmet') // protect https - prev attaque XSS

const rateLimit = require("express-rate-limit"); // protect bruteForce
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});
////
require('dotenv').config(); // import environnement
//-----------------------------------------------------
require('./bdd/comseqbdd');

//-----------------------------------------------------
app.use("/api/", apiLimiter); // prevention Force Brute le plus tôt possible//
app.use(helmet()) // XSS
app.use(bodyParser.json());
//console.log('---passage setheader app.js'); //cors

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  // tout le monde
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next();
  });

app.use('/images', express.static(path.join(__dirname, 'images'))); // static de express

app.use('/api/commentaires', commentairesRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/auth', userRoutes); // bcrypt pour hash + controleLog (/middleware)

module.exports = app;