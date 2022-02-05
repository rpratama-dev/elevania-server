const { generateKeyPairSync } = require('crypto');
const path = require('path');
const fs = require('fs');

class PairKey {
  static generateKey() {
    const { publicKey, privateKey } = generateKeyPairSync('rsa', {
      modulusLength: 2048, // the length of your key in bits
      publicKeyEncoding: {
        type: 'spki', // recommended to be 'spki' by the Node.js docs
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8', // recommended to be 'pkcs8' by the Node.js docs
        format: 'pem',
        // cipher: 'aes-256-cbc', // *optional*
        // passphrase: config.secretKey, // *optional*
      },
    });
    fs.writeFileSync(path.join(__dirname, '../config', 'public.pub'), Buffer.from(publicKey));
    fs.writeFileSync(path.join(__dirname, '../config', 'private.pem'), Buffer.from(privateKey));
    return { publicKey, privateKey };
  }

  static getPubKey() {
    try {
      const pubKey = fs.readFileSync(path.join(__dirname, '../config', 'public.pub'), 'utf-8');
      return pubKey;
    } catch (error) {
      return '';
    }
  }

  static getPrivKey() {
    try {
      const privKey = fs.readFileSync(path.join(__dirname, '../config', 'private.pem'), 'utf-8');
      return privKey;
    } catch (error) {
      return '';
    }
  }
}

module.exports = PairKey;
