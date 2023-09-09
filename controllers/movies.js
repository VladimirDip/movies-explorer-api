const Movie = require('../models/movie');
const NotFound = require('../errors/notFoundErrors');
const BadRequest = require('../errors/badRequestErrors');
const Forbidden = require('../errors/forbiddenErrors');
const {
  ACCESS_ERROR_TEXT,
  INVALID_MOVIE_DATA_ERROR_TEXT,
  INVALID_MOVIE_DATA_DELETE_ERROR_TEXT,
  MOVIE_ID_NOT_FOUND_ERROR_TEXT,
} = require('../utils/errorConstants');

const getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(INVALID_MOVIE_DATA_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound(MOVIE_ID_NOT_FOUND_ERROR_TEXT);
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        return Movie.findByIdAndRemove(movieId).then(() =>
          res.send({ message: 'Фильм удален' })
        );
      }
      return next(new Forbidden(ACCESS_ERROR_TEXT));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(INVALID_MOVIE_DATA_DELETE_ERROR_TEXT));
      } else if (err.name === 'NotFoundError') {
        next(new NotFound(MOVIE_ID_NOT_FOUND_ERROR_TEXT));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
