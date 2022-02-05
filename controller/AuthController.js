const { default: customeError } = require('../helper/customeError');
const UserService = require('../services/UserService');
const CryptoPass = require('../utils/cryptoPass');
const JWT = require('../utils/jwt');

/* eslint-disable no-unused-vars */
class AuthController {
  static async login(req, h) {
    const { email, password } = req.payload;
    const user = await UserService.findOne(['email', email]);
    if (!user) throw customeError(401, 'Wrong Email / Password');
    const passMatch = CryptoPass.compare(password, user.password);
    if (!passMatch) throw customeError(401, 'Wrong Email / Password');
    const token = JWT.sign({ email: user.email, id: user.id });
    const { full_name, role } = user;
    return { response: { token, user: { email, full_name, role } }, message: 'Login Success' };
  }

  static async forgot() {
    return { response: 'Under Development' };
  }
}

module.exports = AuthController;
