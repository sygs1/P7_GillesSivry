const Commentaire = require("../models/commentaires");
const fs = require('fs'); // file system de node
//require('../bdd/comseqbdd');

// crea commentaires
exports.createCommentaire = (req, res, next) => {
    const commentaireeObject = JSON.parse(req.body.commentaire);
    delete commentaireObject._id; 
    const commentaire= new Mesage({ // new dans mongoose crée un champ _id
      ...commentaireObject, // opérateur spread = copie tous les éléments
      likes: 0,
      dislikes: 0,
      usersLiked: [],  // RAZ déjç dans models par défaut mais ... o k u
      usersDisliked: [],      
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      userId: req.userId // init userId pour compare in front
    });
    message.save()
      .then(() => res.status(201).json({ message: 'Commentaire enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  
// modifier commentaire dans mysql 
exports.modifyCommentaire = (req, res, next) => {
  const commentaireObject = req.file ?
    {
      ...JSON.parse(req.body.commentaire),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };  
  Commentaire.updateOne({ _id: req.params.id, userId : req.userId  }, { ...commentaireObject, _id: req.params.id })  // verification du userId
  
    .then(() => res.status(200).json({ message: 'Commentaire modifié !'}))
    .catch(error => res.status(400).json({ error }));
 
};


// supprime commentaire
exports.deleteCommentaire = (req, res, next) => {
    Message.findOne({ _id: req.params.id, userId : req.userId }) // _id bdd + verification du userId
      .then(commentaire => {
        //const filename = commentaire.imageUrl.split('/images/')[1];
        //fs.unlink(`images/${filename}`, () => {
            commentaire.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'commentaire supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        //});
      })
      .catch(error => res.status(500).json({ error }));
  };

    
 // recup un seul commentaire
exports.getOneCommentaire = (req, res, next) => {
    Commentaire.findOne({ _id: req.params.id })   
        .then(message => res.status(200).json(message))   
        .catch(error => res.status(404).json({ error }));

};

// recup ts les commentaires
exports.getCommentaires = (req, res, next) => {
    Commentaire.find()
        .then(message => res.status(200).json(message))
        .catch(error => res.status(400).json({ error }));
};
    

// like commentaire /------------------------------
exports.likerCommentaire= (req, res, next) => { 

  const choix = req.body.like 
  const userId = req.body.userId
  const commentaireliked = req.body.idcommentaires

  //console.log('-----------------');
  //console.log('table req.body = ');
  //console.table(req.body);
      //----------------------
    // console.log(commntaireliked)

   if (choix === 1 ){  // vote pour
      Commentaire.updateOne({ _id: req.params.id }, {    
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
      Commentaire.findOne({ _id: req.params.id })
      
        .then((commentaire) => {
          if (commentaire.usersLiked.find( user => user === userId)) {  // on cherche userId dans table
            Commentaire.updateOne({ _id: req.params.id }, {         
              $inc: { likes: -1 },                           
              $pull: { usersLiked: userId }    // on retire userId de la table
              
            })
              .then(() => { res.status(201).json({ message: "bon ... ok."}); }) 
              .catch((error) => { res.status(400).json({error}); });              
          } 
        //--------------  

          if (commentaire.usersDisliked.find(user => user === req.body.userId)) {  
            Commentaire.updateOne({ _id: req.params.id }, {
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
    
     Commentaire.updateOne({ _id: req.params.id }, {         
        $inc: { dislikes: 1 },                               
        $push: { usersDisliked: userId }            
      })
        .then(() => { res.status(201).json({ message: "vous êtes sûr ? " }); }) 
        .catch((error) => { res.status(400).json({ error }); }); 
         
      }
      
    };
  
