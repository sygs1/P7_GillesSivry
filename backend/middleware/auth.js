
const jwt = require('jsonwebtoken'); // cadrage techno
//require('dotenv').config();

//console.log("pass auth token");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // recup header ()
    const decodedToken = jwt.verify(token, process.env.RANDOM_JWT_SECRET); //cle complexe
    const userId = decodedToken.userId;     //decodage token = objet js classique
    if (req.body.userId && req.body.userId !== userId) { // si tt ko -> throw sinon next
      throw 'Invalid user ID';
    } else {
      req.userId = userId
      //console.log("auth req.userId =" + req.userId);
      next();
    }
  } catch {
    //console.log(error);
    res.status(401).json({
      error: new Error('Requete non identifiée !')
    });
  }
};
