const customeError = require('../helper/customeError');
const errorHandler = require('../helper/ErrorHandler');
const UserService = require('../services/UserService');
const CryptoPass = require('../utils/cryptoPass');
const JWT = require('../utils/jwt');

/* eslint-disable no-unused-vars */
class AuthController {
  static async login(req, h) {
    try {
      const { email, password } = req.payload;
      const [user] = await UserService.findOne(email); // FInd user by email
      if (!user) throw customeError(401, 'Wrong Email / Password');
      const passMatch = CryptoPass.compare(password, user.password); // Compare password with hash
      if (!passMatch) throw customeError(401, 'Wrong Email / Password');
      const token = JWT.sign({ email: user.email, id: user.id, scope: 'admin' }); // Create JWT token
      const { full_name, role } = user;
      const response = { token, user: { email, full_name, role } };
      return { response, status: 200, message: 'Login Success' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async forgot() {
    return { response: 'Under Development' };
  }
}

module.exports = AuthController;
