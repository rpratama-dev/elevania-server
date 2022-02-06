const JWT = require('../utils/jwt');

class Auth {
  static async authentication(request, h) {
    try {
      const { access_token, authorization } = request.headers;
      console.log(request.headers);
      const token = access_token || authorization;
      if (!token || ['null', 'undefine'].includes(token)) throw new Error('Unauthorized');
      // const { decoded } = await JWT.verify(access_token || authorization);
      if (!token) throw new Error('Unauthorized');
      return h.authenticated({
        credentials: { user: 'john', scope: 'customer' },
        isAuthorized: true,
      });
    } catch (error) {
      return h.unauthenticated();
    }
  }
}

module.exports = Auth;
