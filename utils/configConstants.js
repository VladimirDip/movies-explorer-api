const { NODE_ENV, JWT_SECRET, PORT = 3000 } = process.env;

const DEV_DATABASE = 'mongodb://mongodb:27017/bitfilmsdb';
const DEV_JWT_SECRET = 'dev-secret';
const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
const ALLOWEDCORS = [
  'http://diploma-dip.nomoredomainsicu.ru',
  'https://diploma-dip.nomoredomainsicu.ru',
  'http://localhost:3000',
  'https://localhost:3000',
];

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  PORT,
  DEV_DATABASE,
  DEV_JWT_SECRET,
  ALLOWEDCORS,
  DEFAULT_ALLOWED_METHODS,
};
