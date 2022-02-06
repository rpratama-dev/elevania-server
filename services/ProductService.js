const { sequelize } = require('../models');

class ProductService {
  static async selectIN(IDs = []) {
    // eslint-disable-next-line quotes
    const ids = `('${IDs.join("','")}')`;
    const query = `SELECT "prod_no" FROM "Products" WHERE "prod_no" IN ${ids};`;
    const result = await sequelize.query(query);
    const newIDs = result[0].map((el) => el.prod_no);
    return newIDs;
  }

  static async addProduct(products = []) {
    // eslint-disable-next-line quotes
    const values = products.map((el) => `('${el.join("','")}')`);
    const qInsert =
      'INSERT INTO "Products" ("prod_no", "name", "sku", "price", "description", "createdAt", "updatedAt")';
    const qValue = `VALUES ${values.join(',')}`;
    const query = `${qInsert} ${qValue}`;
    const result = await sequelize.query(query);
    return result;
  }

  static async find() {
    const query = 'SELECT * FROM "Products";';
    const result = await sequelize.query(query);
    return result[0];
  }

  static async pagination() {
    const query = 'SELECT * FROM "Products";';
    const result = await sequelize.query(query);
    return result[0];
  }

  static async findOne(prod_no) {
    const query = `SELECT * FROM "Products" WHERE "prod_no" = '${prod_no}';`;
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
    return result[0];
  }
}

module.exports = ProductService;
