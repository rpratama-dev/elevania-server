/* eslint-disable no-unused-vars */
const customeError = require('../helper/customeError');
const errorHandler = require('../helper/ErrorHandler');
const UserService = require('../services/UserService');
const CryptoPass = require('../utils/cryptoPass');

class UserController {
  static async store(req, h) {
    try {
      const { full_name, email, password, repeat_password } = req.payload;
      // TODO: Add Validation
      if (password !== repeat_password) throw customeError(400, 'Password Not Match');
      const dateCreated = new Date();
      const hashPass = CryptoPass.hash(password); // Hash user password
      // Create payload user
      const payload = { full_name, email, password: hashPass, role: 'admin', is_login: 0 };
      const [result] = await UserService.create(payload);
      delete result.password;
      return { response: result, status: 201 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async show(req, h) {
    try {
      const { id: email } = req.params;
      const user = await UserService.findOne(email);
      return { response: user, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

module.exports = UserController;
