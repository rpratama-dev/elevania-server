const { queryCreate, queryRead, queryUpdate } = require('../utils/database');

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
   * @param {{
   *  full_name: string,
   *  email: string,
   *  role: number,
   *  description: string,
   *  password: string,
   * }} user
   * @param {string} email
   * @returns
   */
  static async update(user, email) {
    user.updatedAt = new Date().toISOString();
    user.email = email;
    const result = await queryUpdate('Users', user, 'email');
    return result;
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
