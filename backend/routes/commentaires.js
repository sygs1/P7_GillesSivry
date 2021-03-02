const express = require('express');
//
const router = express.Router(); //logique router Express


// controle avec hash
const auth = require('../middleware/auth'); // authentification
//
const multer = require('../middleware/multer-config'); // gestion dossier
//
//const messagesCtrl = require('../controllers/messages'); // ref controller messages

const commentairesCtrl = require('../controllers/commentaires'); // ref ctrl commentaires


// recup liste commentaires dans bdd
router.get('/', auth, commentairesCtrl.getCommentaires);
// recup un message 
router.get('/:id', auth, commentairesCtrl.getOneCommentaire);
// crea message
router.post('/', auth, multer, commentairesCtrl.createCommentaire);
// modif message
router.put('/:id', auth, multer, commentairesCtrl.modifyCommentaire);  
// supp message
router.delete('/:id', auth, commentairesCtrl.deleteCommentaire);

// like/dislike un commentaire
router.post("/:id/like", auth, commentairesCtrl.likerCommentaire);



//-------------
module.exports = router; // retour logique router dans app.js

