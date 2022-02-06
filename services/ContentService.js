const { sequelize } = require('../models');

class ContentService {
  static async selectIN(IDs = []) {
    const ids = `(${IDs.join(',')})`;
    const query = `SELECT prod_no FROM Products WHERE prod_no IN ${ids};`;
    const result = await sequelize.query(query);
    return result;
  }

  static async addContent(contents = []) {
    // eslint-disable-next-line quotes
    const values = contents.map((el) => `('${el.join("','")}')`);
    const qInsert =
      'INSERT INTO "Contents" ("prod_no", "image_type", "image_url", "createdAt", "updatedAt")';
    const qValue = `VALUES ${values.join(',')}`;
    const query = `${qInsert} ${qValue}`;
    const result = await sequelize.query(query);
    return result;
  }

  static async deleteMany(prod_no) {
    const query = `DELETE FROM "Contents" WHERE "prod_no" = '${prod_no}';`;
    const result = await sequelize.query(query);
    return result[0];
  }
}

module.exports = ContentService;
