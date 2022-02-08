const { queryExecute, queryCreateMany, queryCreate } = require('../utils/database');
const { queryRead, queryUpdate, queryDelete } = require('../utils/database');
const ContentService = require('./ContentService');

class ProductService {
  /**
   *
   * @param {Array<string>} IDs
   * @returns
   */
  static async selectIN(IDs) {
    const alias = [];
    for (let i = 1; i <= IDs.length; i += 1) alias.push(`$${i}`);
    const query = `SELECT "prod_no" FROM "Products" WHERE "prod_no" IN (${alias.join(',')});`;
    const result = await queryRead({ text: query, values: IDs });
    const newIDs = result.rows.map((el) => el.prod_no);
    return newIDs;
  }

  /**
   *
   * @param {Array<[{
   * sku: string,
   * price: number,
   * name: string,
   * prod_no: string,
   * description: string,
   * createdAt: Date,
   * updatedAt: Date,
   * }]>} products
   * @returns
   */
  static async addManyProduct(products) {
    const result = await queryCreateMany('Products', products);
    return result.rows;
  }

  /**
   *
   * @param {{ [key: string]: string }} product
   * @returns
   */
  static async addProduct(product) {
    if (!product) throw new Error('Product required');
    const dateCreated = new Date().toISOString();
    const times = { createdAt: dateCreated, updatedAt: dateCreated };
    const result = await queryCreate('Products', { ...product, ...times });
    return result.rows;
  }

  static async find() {
    const query = 'SELECT * FROM "Products";';
    const result = await queryExecute(query);
    return result.rows;
  }

  static async findProdNo() {
    const query = 'SELECT prod_no FROM "Products";';
    const result = await queryExecute(query);
    return result.rows;
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  static async findJoinContent(id) {
    let qry1 = `SELECT "P".*, "C"."id" as "c_id", "C"."prod_no" as "no", "C"."image_type" AS "image_type", "C"."image_url" AS "image_url" 
                FROM "Products" as "P"
                LEFT JOIN "Contents" as "C" ON "P"."prod_no" = "C"."prod_no"`;

    const qry2 = 'ORDER BY "P"."id" DESC LIMIT 20';
    if (id && !Number.isNaN(+id)) qry1 += ' WHERE "P"."id" < $1';
    const query = `${qry1} ${qry2}`;
    const result = await queryRead({ text: query, values: id ? [id] : [] });
    return result.rows;
  }

  /**
   *
   * @param {string} prod_no
   * @returns
   */
  static async findOneJoinContent(prod_no) {
    const query = `SELECT * FROM "Contents" 
                    INNER JOIN "Products" ON "Contents"."prod_no" = "Products"."prod_no" AND "Products"."prod_no" = $1;`;
    const result = await queryRead({ text: query, values: [prod_no] });
    return result.rows;
  }

  static async pagination() {
    const query = 'SELECT * FROM "Products";';
    const result = await queryExecute(query);
    return result[0];
  }

  /**
   *
   * @param {string} prod_no
   * @returns
   */
  static async findOne(prod_no) {
    const query = 'SELECT * FROM "Products" WHERE "prod_no" = $1;';
    const result = await queryRead({ test: query, values: [prod_no] });
    return result[0];
  }

  /**
   *
   * @param {string} sku
   * @returns
   */
  static async findSKU(sku = '') {
    const query = 'SELECT * FROM "Products" WHERE "sku" = $1;';
    const result = await queryRead({ text: query, values: [sku] });
    return result[0];
  }

  /**
   *
   * @param {{
   *  name: string,
   *  sku: string,
   *  price: number,
   *  description: string,
   * }} product
   * @param {string} prod_no
   * @returns
   */
  static async updateOne(product, prod_no) {
    product.updatedAt = new Date().toISOString();
    product.prod_no = prod_no;
    const result = await queryUpdate('Products', product, 'prod_no');
    return result;
  }

  /**
   *
   * @param {string} id
   * @returns
   */
  static async deleteOne(id) {
    const result = await queryDelete('Products', id);
    await ContentService.deleteMany(id);
    return result[0];
  }
}

module.exports = ProductService;
