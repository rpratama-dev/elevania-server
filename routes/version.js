/* eslint-disable no-unused-vars */
const { Server } = require('@hapi/hapi');
const productRouter = require('./api/v1/products');
const syncRouter = require('./api/v1/syncProduct');
const userRouter = require('./api/v1/userRouter');
const authRouter = require('./api/v1/authRouter');

function version1() {
  const prefix = '/api/v1';
  const user = userRouter(`${prefix}/users`);
  const auth = authRouter(`${prefix}/auth`);
  const products = productRouter(`${prefix}/products`);
  const syncProduct = syncRouter(`${prefix}/products/sync`);
  const result = [...user, ...auth, ...products, ...syncProduct];
  return result;
}

module.exports = { version1 };
