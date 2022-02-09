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
      await UserService.update({ is_login: 1 }, email);
      const response = { token, user: { email, full_name, is_login: 1, role } };
      return { response, status: 200, message: 'Login Success' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async verify(req, h) {
    try {
      const { credentials } = req.auth;
      const userLogin = credentials.user;
      const response = userLogin;
      return { response, status: 200, message: 'Token is verified' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async logout(req, h) {
    try {
      const { credentials } = req.auth;
      const userLogin = credentials.user;
      await UserService.update({ is_login: 0 }, credentials.email);
      return { response: { ...userLogin, is_login: 0 }, status: 200, message: 'Logout success' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async forgot() {
    return { response: 'Under Development' };
  }
}

module.exports = AuthController;
