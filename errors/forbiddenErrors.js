const { FORBIDDEN_ERROR_CODE } = require('../utils/errorConstants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.status = FORBIDDEN_ERROR_CODE;
  }
}

module.exports = Forbidden;
