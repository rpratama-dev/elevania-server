/* eslint-disable no-unused-vars */
const { Server } = require('@hapi/hapi');
const productRouter = require('./api/v1/products');
const syncRouter = require('./api/v1/syncProduct');

function version1() {
  const prefix = '/api/v1';
  const products = productRouter(`${prefix}/products`);
  const syncProduct = syncRouter(`${prefix}/products/sync`);
  const result = [...products, ...syncProduct];
  return result;
}

module.exports = { version1 };
