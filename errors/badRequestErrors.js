const { BAD_REQUEST_ERROR_CODE } = require('../utils/errorConstants');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = BAD_REQUEST_ERROR_CODE;
  }
}

module.exports = BadRequest;
