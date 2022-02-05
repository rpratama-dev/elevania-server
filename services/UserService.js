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
    const qInsert = 'INSERT INTO "Products" ("full_name", "email", "password", "role")';
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

  /**
   *
   * @param {{
   * `prod_no: string,
   * `name: string,
   * `sku: string,
   * `price: number,
   * `description: string,
   * }} new_product=
   * @param {*} prod_no
   * @returns
   */
  static async updateOne(new_product = {}, prod_no) {
    const keys = ['name', 'sku', 'price', 'description', 'updatedAt'];
    let newSet = '';
    new_product.updatedAt = new Date().toISOString();
    keys.forEach((el) => {
      if (el === 'price') {
        newSet += `"${el}"=${+new_product[el]}, `;
      } else newSet += `"${el}"='${new_product[el]}', `;
    });
    newSet = newSet.slice(0, -2);
    const query = `UPDATE "Products" SET ${newSet} WHERE "prod_no" = '${prod_no}';`;
    const result = await sequelize.query(query);
    return result;
  }

  static async deleteOne(prod_no) {
    const query = `DELETE FROM "Products" WHERE "prod_no" = '${prod_no}';`;
    const result = await sequelize.query(query);
    console.log('result', result);
    return result[0];
  }
}

module.exports = UserService;
