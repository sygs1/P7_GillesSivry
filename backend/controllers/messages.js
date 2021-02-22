const Message = require("../models/messages");
const fs = require('fs'); // file system de node

// crea message
exports.createMessage = (req, res, next) => {
    const messageObject = JSON.parse(req.body.message);
    delete messageObject._id; 
    const message = new Message({ // new dans mongoose crée un champ _id
      ...messageObject, // opérateur spread = copie tous les éléments
      likes: 0,
      dislikes: 0,
      usersLiked: [],  // RAZ déjç dans models par défaut mais ... o k u
      usersDisliked: [],      
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.userId // init userId pour compare in front
    });
    message.save()
      .then(() => res.status(201).json({ message: 'Message enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  
// modifier message dans mysql 
exports.modifyMessage = (req, res, next) => {
  const messsageObject = req.file ?
    {
      ...JSON.parse(req.body.message),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  
  Message.updateOne({ _id: req.params.id, userId : req.userId  }, { ...messageObject, _id: req.params.id })  // verification du userId
  
    .then(() => res.status(200).json({ message: 'Message modifié !'}))
    .catch(error => res.status(400).json({ error }));
 
};


// supprime message
exports.deleteMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id, userId : req.userId }) // _id de mongoDB + verification du userId
      .then(message => {
        const filename = message.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          message.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Message supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

    
 // recup un seul message
exports.getOneMessage = (req, res, next) => {
    Message.findOne({ _id: req.params.id })   
        .then(message => res.status(200).json(message))   
        .catch(error => res.status(404).json({ error }));

};

// recup ts les messages 
exports.getMessages = (req, res, next) => {
    Messages.find()
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json({ error }));
};
    

// like message /------------------------------
exports.likerMessage = (req, res, next) => { 

  const choix = req.body.like 
  const userId = req.body.userId
  //console.log('-----------------');
  //console.log('table req.body = ');
  //console.table(req.body);
      //----------------------

   if (choix === 1 ){  // vote pour
      Message.updateOne({ _id: req.params.id }, {    
        //  
        $inc: { likes: 1 },                        
        // incrémente
        $push: { usersLiked: userId }              
        // ajoute 
      })
        .then(() => { res.status(201).json({ message: "bien vu ! " }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
           //----------------------
      } else if (choix === 0 ){           //  change d'avis                                      
      Message.findOne({ _id: req.params.id })
      
        .then((message) => {
          if (message.usersLiked.find( user => user === userId)) {  // on cherche userId dans table
            Message.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                           
              $pull: { usersLiked: userId }    // on retire userId de la table
              
            })
              .then(() => { res.status(201).json({ message: "bon ... ok."}); }) 
              .catch((error) => { res.status(400).json({error}); });              
          } 
        //--------------  

          if (message.usersDisliked.find(user => user === req.body.userId)) {  
            Message.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: userId }
            })
              .then(() => { res.status(201).json({ message: "merci ! " }); })
              .catch((error) => { res.status(400).json({error}); });
          }
        })
        .catch((error) => { res.status(404).json({error}); });
      
      //----------------------
      } else if (choix === -1 ){  // vote contre
    
     Message.updateOne({ _id: req.params.id }, {         
        $inc: { dislikes: 1 },                               
        $push: { usersDisliked: userId }            
      })
        .then(() => { res.status(201).json({ message: "vous êtes sûr ? " }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
         
      }
      
    };
  
