const DBError = require('./dbError');

class idNotUniqueError extends DBError {
  constructor(message) {
    super(message);
    this.name = 'IdNotUniqueError';
  }
}

module.exports = idNotUniqueError;
