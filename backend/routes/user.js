const express = require('express');
const router = express.Router();
const auth = require('../models/user'); // passe par models

const userCtrl = require('../controllers/user');
const protectLog = require('../middleware/protectLog'); // passe par middleware protectLog

//console.log("pass routes users");

//---------------------
// crea user dans bdd
router.post('/api/auth/signup', (req, res, next) => { // passe par auth

    console.log(req.body);

    delete req.body._id;
    const users = new Users({   // nouveau user
        ...req.body        
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'user enregistré !'}))
        .catch(error => res.status(400).json({ error }));
    });
    
//--------------

router.post('/signup', protectLog, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;