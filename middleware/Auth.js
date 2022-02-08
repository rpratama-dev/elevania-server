const Boom = require('@hapi/boom');
const UserService = require('../services/UserService');
const JWT = require('../utils/jwt');

class Auth {
  static async authentication(request, h) {
    try {
      const { access_token, authorization } = request.headers;
      let token = access_token || authorization;
      if (token.startsWith('Bearer ')) token = token.slice(7);
      if (!token || ['null', 'undefine'].includes(token)) throw new Error('Access denied');
      const { decoded } = await JWT.verify(token);
      const [user] = await UserService.findOne(decoded.email);
      if (!user.is_login) throw new Error('Access denied');
      delete user.password;
      return h.authenticated({ credentials: { ...decoded, user } });
    } catch (error) {
      return h.unauthenticated(Boom.unauthorized(error.message));
    }
  }
}

module.exports = Auth;
