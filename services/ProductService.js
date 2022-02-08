const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models');
const { queryExecute, queryCreateMany } = require('../utils/database');
const ContentService = require('./ContentService');

class ProductService {
  static async selectIN(IDs = []) {
    // eslint-disable-next-line quotes
    const ids = `('${IDs.join("','")}')`;
    const query = `SELECT "prod_no" FROM "Products" WHERE "prod_no" IN ${ids};`;
    const result = await queryExecute(query);
    const newIDs = result.rows.map((el) => el.prod_no);
    return newIDs;
  }

  static async addProduct(products = []) {
    const result = await queryCreateMany('Products', products);
    return result.rows;
  }

  static async find() {
    const query = 'SELECT * FROM "Products";';
    const result = await sequelize.query(query);
    return result[0];
  }

  static async findProdNo() {
    const query = 'SELECT prod_no FROM "Products";';
    const result = await sequelize.query(query);
    return result[0];
  }

  static async findJoinContent(id) {
    // const query =
    //   'SELECT * FROM "Products" INNER JOIN "Contents" ON "Products"."prod_no" = "Contents"."prod_no";';
    let qr1 =
      'SELECT "P".*, "C"."id" as "c_id", "C"."prod_no" as "no", "C"."image_type" AS "image_type", "C"."image_url" AS "image_url" FROM "Products" as "P" LEFT JOIN "Contents" as "C" ON "P"."prod_no" = "C"."prod_no"';
    const qr2 = 'ORDER BY "P"."id" DESC LIMIT 20';
    if (id && !Number.isNaN(+id)) qr1 += ` WHERE "P"."id" < ${id}`;
    const query = `${qr1} ${qr2}`;
    const result = await sequelize.query(query);
    return result[0];
  }

  static async findOneJoinContent(prod_no) {
    const query = `SELECT * FROM "Contents" INNER JOIN "Products" ON "Contents"."prod_no" = "Products"."prod_no" AND "Products"."prod_no" = '${prod_no}';`;
    const result = await sequelize.query(query);
    return result;
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

  static async findSKU(sku = '') {
    const query = `SELECT * FROM "Products" WHERE "sku" = '${sku.toUpperCase()}';`;
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
    const result = await sequelize.query(query, {
      type: QueryTypes.UPDATE,
      returning: true,
    });
    return result;
  }

  static async deleteOne(prod_no) {
    const query = `DELETE FROM "Products" WHERE "prod_no" = '${prod_no}';`;
    const result = await sequelize.query(query);
    await ContentService.deleteMany(prod_no);
    return result[0];
  }
}

module.exports = ProductService;
