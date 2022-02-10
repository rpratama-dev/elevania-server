const request = require('supertest');
require('dotenv').config({ path: './.env.local' });

const api = request(process.env.BASE_URL);

class ProductRouter {
  static getProducts() {
    return api
      .get('/products')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send();
  }

  static getProduct(id) {
    return api
      .get(`/products/${id}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .send();
  }

  static getProductSKU(token, skucode) {
    return api
      .get(`/products/${skucode}/sku`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send();
  }

  static addProduct(token, body) {
    return api
      .post('/products')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send(body);
  }

  static updateProduct(token, id, body) {
    return api
      .put(`/products/${id}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send(body);
  }

  static deleteProduct(token, id) {
    return api
      .delete(`/products/${id}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send();
  }
}

module.exports = ProductRouter;
