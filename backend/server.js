const http = require('http') ;  // http
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) { // verif port
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORTBACK || '4200'); // prendre port 3000 si pas de port deja utilise dans l'environnement
app.set('port', port);


const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; // cadrage + affichage
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' necessite davantage de droit');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' deja utilisé');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app); // creation du server http

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});
console.log('--------------');
server.listen(port);
console.log('server en attente');

/*server.listen(8080,function () {
  console.log('serveur prêt');
  console.log('--------------');
});
*/
