const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;

const DEV_DATABASE = 'mongodb://mongodb:27017/bitfilmsdb';
const DEV_JWT_SECRET = 'dev-secret';
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
// const ALLOWEDCORS = [
//   'http://diploma-dip.nomoredomainsicu.ru',
//   'https://diploma-dip.nomoredomainsicu.ru',
//   'http://localhost:3000',
//   'https://localhost:3000',
// ];

// const ALLOWEDCORS = {
//   origin: [
//     'http://diploma-dip.nomoredomainsicu.ru',
//     'https://diploma-dip.nomoredomainsicu.ru',
//     'http://localhost:3000',
//     'https://localhost:3000',
//     'http://api-diploma-dip.nomoredomainsicu.ru',
//     'https://api-diploma-dip.nomoredomainsicu.ru',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   allowedHeaders: [
//     'Content-Type',
//     'Origin',
//     'Referer',
//     'Accept',
//     'Authorization',
//   ],
//   credentials: true,
// };

// const ALLOWEDCORS = {
//   origin: '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
//   credentials: true,
// };

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DEV_DATABASE,
  DEV_JWT_SECRET,
  ALLOWEDCORS,
  DEFAULT_ALLOWED_METHODS,
};
