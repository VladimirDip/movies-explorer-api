const { UNAUTHORIZED_ERROR_CODE } = require('../utils/errorConstants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.status = UNAUTHORIZED_ERROR_CODE;
  }
}

module.exports = Unauthorized;
