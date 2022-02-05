const bcrypt = require('bcryptjs');
const config = require('../config');

class CryptoPass {
  /**
   *
   * @param {string} password
   * @returns
   */
  static hash(password) {
    const salt = bcrypt.genSaltSync(config.salt);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  /**
   *
   * @param {string} password
   * @param {string} hash
   * @returns
   */
  static compare(password, hash) {
    const match = bcrypt.compareSync(password, hash);
    return match;
  }
}

module.exports = CryptoPass;
