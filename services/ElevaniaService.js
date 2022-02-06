const parseXml = require('../helper/ParseXML');
const elevaniaHost = require('../utils/elevaniaHost');

class Elevania {
  static parseOptionalDetail(product) {
    if (!Array.isArray(product.ProductOptionDetails)) {
      product.ProductOptionDetails = [product.ProductOptionDetails];
    }
    return product;
  }

  static async find(page) {
    const response = await elevaniaHost({
      url: `/prodservices/product/listing/?page=${page}`,
      method: 'GET',
    });
    const respJSON = JSON.parse(parseXml(response));
    const products = respJSON.Products.product ? respJSON.Products.product : [];
    const newProducts = products.map((el) => Elevania.parseOptionalDetail(el));
    return newProducts;
  }

  static async findOne(id) {
    const response = await elevaniaHost({
      url: `/prodservices/product/details/${id}`,
      method: 'GET',
    });
    const respJSON = JSON.parse(parseXml(response));
    if (respJSON.ClientMessage) return null;
    const product = Elevania.parseOptionalDetail(respJSON.Product);
    return product;
  }
}

module.exports = Elevania;
