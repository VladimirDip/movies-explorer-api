const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorizedErrors');
const { UNAUTHORIZED_ERROR_TEXT } = require('../utils/errorConstants');
const {
  NODE_ENV,
  JWT_SECRET,
  DEV_JWT_SECRET,
} = require('../utils/configConstants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET
    );
  } catch (err) {
    throw new Unauthorized(UNAUTHORIZED_ERROR_TEXT);
  }
  req.user = payload;
  next();
};

module.exports = auth;
