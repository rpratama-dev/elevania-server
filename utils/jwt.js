const jwt = require('jsonwebtoken');
const customeError = require('../helper/customeError');
const config = require('../config');

const { privateKey, publicKey } = config;

class JWT {
  /**
   *
   * @param {{
   *  id: string,
   *  email: string,
   *  name: string,
   *  sign: string,
   *  session: string,
   * }} object
   * @param {*} options
   * @returns
   */
  static sign(object, options) {
    const params = {
      ...(options || {}),
      algorithm: 'RS256',
      issuer: 'MY STORE',
    };
    return jwt.sign(object, privateKey, params);
  }

  static verify(token) {
    return new Promise((resolve, reject) => {
      (() => {
        try {
          const decoded = jwt.verify(token, publicKey, {
            algorithms: ['RS256'],
          });
          resolve({
            valid: true,
            expired: false,
            decoded,
          });
        } catch (e) {
          reject(
            customeError(401, 'Invalid jwt', {
              expected: 'a valid token',
              message: e.message === 'jwt expired',
              received: null,
            }),
          );
        }
      })();
    });
  }
}

module.exports = JWT;
