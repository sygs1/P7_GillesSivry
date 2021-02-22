const express = require('express');
//
const router = express.Router(); //logique router Express


// controle avec hash
const auth = require('../middleware/auth'); // authentification
//
const multer = require('../middleware/multer-config'); // gestion dossier
//
const messagesCtrl = require('../controllers/messages'); // ref controller messages

const commentaireCtrl = require('../controllers/commentaires'); // ref ctrl commentaires


// recup liste messages dans bdd
router.get('/', auth, messagesCtrl.getMessages);
// recup un message 
router.get('/:id', auth, messagesCtrl.getOneMessage);
// crea message
router.post('/', auth, multer, messagesCtrl.createMessages);
// modif message
router.put('/:id', auth, multer, messagesCtrl.modifyMessage);  
// supp message
router.delete('/:id', auth, messagesCtrl.deleteMessage);

// like/dislike un message
router.post("/:id/like", auth, messagesCtrl.likerMessage);

ReadableStreamDefaultController.post('/:id/like', auth, commentairesCtrl.likerCommentaire)

//-------------
module.exports = router; // retour logique router dans app.js

