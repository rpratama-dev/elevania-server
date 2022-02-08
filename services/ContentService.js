const { queryCreateMany, queryRead, queryDelete } = require('../utils/database');

class ContentService {
  static async selectIN(IDs = []) {
    const alias = [];
    for (let i = 1; i <= IDs.length; i += 1) alias.push(`$${i}`);
    const query = `SELECT "prod_no" FROM Products WHERE "prod_no" IN (${alias.join(',')});`;
    const result = await queryRead({ text: query, values: IDs });
    const newIDs = result.rows.map((el) => el.prod_no);
    return newIDs;
  }

  static async addContent(contents = []) {
    const result = await queryCreateMany('Contents', contents);
    return result.rows;
  }

  static async deleteMany(id) {
    const result = await queryDelete('Contents', id);
    return result[0];
  }
}

module.exports = ContentService;
