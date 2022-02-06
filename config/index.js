const getEnv = require('../helper/getEnv');
const PairKey = require('../utils/pairkeys');

let pubKey = PairKey.getPubKey();
let privKey = PairKey.getPrivKey();

if (!pubKey || !privKey) {
  const pairKey = PairKey.generateKey();
  pubKey = pairKey.publicKey;
  privKey = pairKey.privateKey;
}

/**
 * All Config System is store in here;
 */
module.exports = {
  port: getEnv('PORT'),
  salt: +getEnv('SALT') || 10,
  DB_URI: getEnv('DB_URI'),
  publicKey: pubKey,
  privateKey: privKey,
};
