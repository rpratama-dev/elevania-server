const UserService = require('../services/UserService');
const JWT = require('../utils/jwt');

class Auth {
  static async authentication(request, h) {
    try {
      const { access_token, authorization } = request.headers;
      let token = access_token || authorization;
      if (token.startsWith('Bearer ')) token = token.slice(7);
      if (!token || ['null', 'undefine'].includes(token)) throw new Error('Unauthorized');
      const { decoded } = await JWT.verify(token);
      if (!token) throw new Error('Unauthorized');
      const [user] = await UserService.findOne(decoded.email);
      delete user.password;
      return h.authenticated({ credentials: { ...decoded, user } });
    } catch (error) {
      return h.unauthenticated(new Error('Unauthorized'));
    }
  }
}

module.exports = Auth;
