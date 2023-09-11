const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
const NotFound = require('../errors/notFoundErrors');
const Conflicted = require('../errors/confictErrors');
const BadRequest = require('../errors/badRequestErrors');
const {
  DUPLICATE_EMAIL_ERROR_TEXT,
  INVALID_USER_DATA_ERROR_TEXT,
  INVALID_PROFILE_DATA_ERROR_TEXT,
  USER_ID_NOT_FOUND_ERROR_TEXT,
} = require('../utils/errorConstants');
const {
  NODE_ENV,
  JWT_SECRET,
  DEV_JWT_SECRET,
} = require('../utils/configConstants');

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, email, password: hash }))
    .then((user) =>
      res.status(201).send({
        name: user.name,
        email: user.email,
      })
    )
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INVALID_USER_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new Conflicted(DUPLICATE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  return User.findById(_id)
    .orFail(() => {
      throw new NotFound(USER_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(INVALID_USER_DATA_ERROR_TEXT));
      } else if (err.name === 'NotFoundError') {
        next(new NotFound(USER_ID_NOT_FOUND_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

const updProfile = (req, res, next) => {
  const { name, email } = req.body;

  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      throw new NotFound(USER_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((user) => {
      res.send({ name: user.name, email: user.email });
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        next(new BadRequest(INVALID_PROFILE_DATA_ERROR_TEXT));
      } else if (err.code === 11000) {
        next(new Conflicted(DUPLICATE_EMAIL_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : DEV_JWT_SECRET,
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          maxAge: 7 * 24 * 60 * 60,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token })
        .end();
    })
    .catch(next);
};

const signout = (_, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
};

module.exports = {
  createUser,
  getCurrentUser,
  updProfile,
  login,
  signout,
};
