const { CONFLICT_ERROR_CODE } = require('../utils/errorConstants');

class Conflicted extends Error {
  constructor(message) {
    super(message);
    this.status = CONFLICT_ERROR_CODE;
  }
}

module.exports = Conflicted;
