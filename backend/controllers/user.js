const bcrypt = require('bcrypt'); // algo bcrypt pour hash
const jwt = require('jsonwebtoken'); // pack attribution Token
const express = require('express');
const router = express.Router();
const userCtrl = require('./user');
//const User = require('../models/user'); // récup modele bdd
//require('../bdd/comseqbdd');
//console.log(User);
const {sequelize} = require('../bdd/comseqbdd');
const User = sequelize.models.User;

//-------------------------------- // SIGNUP
//console.log("pass ctrl signup");

exports.signup = (req, res, next) => {

  console.log('req.body ===========');
  console.log(req.body); 

    bcrypt.hash(req.body.password, 10) // envoi user à la méthode hash de bcrypt
      .then(hash => { // recup hash
                
        console.log(User);

        User.create({ //créa user selon modèle
          email: req.body.email, // envoi mail saisi
          password: hash //  récup mdp hasshé
        }) // sauv dans bdd 

          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error })); // si existe déjà
      })
      .catch(error => console.log(error) || res.status(500).json({ error })); 
};

//-------------------------------  LOGIN
//console.log("pass crtl login");

exports.login = (req, res, next) => {
  
  console.log('req.body ===========');
  console.log(req.body); 

    User.findOne({ email: req.body.email }) // recherche mail dans bdd
      .then(user => {
        if (!user) { // on l'a trouvé
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        console.log(req.body);
        bcrypt.compare(req.body.password, user.password) // compare hash (meme string origine)
          .then(valid => {
            if (!valid) { // si pas ok
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } // si ok
            res.status(200).json({
              userId: user._id,
              token: jwt.sign( // renvoi nouveau token au front
                { userId: user._id }, // verif pour sécuriser modif message ?? voir pour acces moderateurs || userId: idmoderateurs
                process.env.RANDOM_JWT_SECRET, // cle encodage
                { expiresIn: '24h' } // durée validité
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => console.log(error) || res.status(500).json({ error }));
  };


  //console.log('control user');