const { queryCreate, queryRead } = require('../utils/database');

class UserService {
  /**
   *
   * @param {{[key: string] : value: any }} user
   * @returns
   */
  static async create(user) {
    const dateCreated = new Date().toISOString();
    const times = { createdAt: dateCreated, updatedAt: dateCreated };
    const result = await queryCreate('Users', { ...user, ...times });
    return result.rows;
  }

  /**
   *
   * @param {[key: string, val: string | number]} option
   * @returns
   */
  static async findOne(email) {
    if (!email) throw new Error('Email required');
    const query = { text: 'SELECT * FROM "Users" WHERE "email" = $1', values: [email] };
    const result = await queryRead(query);
    return result.rows;
  }
}

module.exports = UserService;
