const { NOT_FOUND_ERROR_CODE } = require('../utils/errorConstants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = NOT_FOUND_ERROR_CODE;
  }
}

module.exports = NotFound;
