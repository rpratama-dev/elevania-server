const { sequelize } = require('../models');

class UserService {
  /**
   *
   * @param {string[][]} user
   * @returns
   */
  static async create(user = []) {
    // eslint-disable-next-line quotes
    const values = user.map((el) => `('${el.join("','")}')`);
    // full_name, email, password, role;
    const qInsert =
      'INSERT INTO "Users" ("full_name", "email", "password", "role", "createdAt", "updatedAt")';
    const qValue = `VALUES ${values.join(',')}`;
    const query = `${qInsert} ${qValue}`;
    const result = await sequelize.query(query);
    return result;
  }

  static async find() {
    const query = 'SELECT * FROM "Users";';
    const result = await sequelize.query(query);
    return result[0];
  }

  /**
   *
   * @param {[key: string, val: string | number]} option
   * @returns
   */
  static async findOne(option) {
    if (option[0] !== 'id') option[1] = `'${option[1]}'`;
    const where = `"${option[0]}"=${option[1]}`;
    const query = `SELECT * FROM "Users" WHERE ${where};`;
    const result = await sequelize.query(query);
    return result[0];
  }
}

module.exports = UserService;
