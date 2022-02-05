const ProductController = require('../../../controller/ProductController');

/**
 *
 * @param {string} prefixs
 * @returns
 */
const products = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'GET', handler: ProductController.index },
    { path: prefixs, method: 'POST', handler: ProductController.store },
    { path: `${prefixs}/{id}`, method: 'GET', handler: ProductController.show },
    { path: `${prefixs}/{id}`, method: 'PUT', handler: ProductController.update },
    // { path: `${prefixs}/{id}`, method: 'PATCH', handler: ProductController.patch },
    { path: `${prefixs}/{id}`, method: 'DELETE', handler: ProductController.delete },
  ];
  return routes;
};

module.exports = products;
