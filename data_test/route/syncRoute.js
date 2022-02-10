const request = require('supertest');
require('dotenv').config({ path: './.env.local' });

const api = request(process.env.BASE_URL);

class SyncRouter {
  static getProducts(token, page) {
    return api
      .get(`/products/sync?pageNumber=${page}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send();
  }

  static getProduct(token, prod_no) {
    return api
      .get(`/products/sync/${prod_no}`)
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send();
  }

  static getImported(token) {
    return api
      .get('/products/sync/imported')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send();
  }

  static import(token, body) {
    return api
      .post('/products/sync')
      .set('Content-type', 'application/json')
      .set('Accept', 'application/json')
      .set('access_token', token)
      .send(body);
  }
}

module.exports = SyncRouter;
