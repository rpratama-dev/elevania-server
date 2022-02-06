/* eslint-disable no-unused-vars */
const customeError = require('../helper/customeError');
const errorHandler = require('../helper/ErrorHandler');
const UserService = require('../services/UserService');
const CryptoPass = require('../utils/cryptoPass');

class UserController {
  static async store(req, h) {
    try {
      const { full_name, email, password, retype_password } = req.payload;
      if (password !== retype_password) throw customeError(400, 'Password Not Match');
      const dateCreated = new Date().toISOString();
      const hashPass = CryptoPass.hash(password);
      const payload = [full_name, email, hashPass, 'admin', dateCreated, dateCreated];
      await UserService.create([payload]);
      const response = { full_name, email, role: 'admin' };
      return { response, status: 201 };
    } catch (error) {
      return errorHandler(error);
    }
  }

  static async show(req, h) {
    try {
      const { id } = req.params;
      const user = await UserService.findOne(id);
      return { response: user, status: 200 };
    } catch (error) {
      return errorHandler(error);
    }
  }
}

module.exports = UserController;
