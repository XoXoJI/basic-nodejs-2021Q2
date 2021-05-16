const DBError = require('./dbError');

class IdNotUniqueError extends DBError {
  constructor(message) {
    super(message);
    this.name = 'IdNotUniqueError';
  }
}

module.exports = IdNotUniqueError;
