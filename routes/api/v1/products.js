const Controler = require('../../../controller/ProductController');
const Validator = require('../../../validator/product_validator');

const auth = { strategy: 'default', scope: ['admin'] };
const validate = {
  payload: Validator.productSchema,
};

const optValidateAtuh = { auth, validate };

/**
 *
 * @param {string} prefixs
 * @returns
 */
const products = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'GET', handler: Controler.index },
    { path: prefixs, method: 'POST', handler: Controler.store, options: optValidateAtuh },
    { path: `${prefixs}/{id}`, method: 'GET', handler: Controler.show },
    { path: `${prefixs}/{sku}/sku`, method: 'GET', handler: Controler.showSKU },
    { path: `${prefixs}/{id}`, method: 'PUT', handler: Controler.update, options: optValidateAtuh },
    { path: `${prefixs}/{id}`, method: 'DELETE', handler: Controler.delete, options: { auth } },
    // { path: `${prefixs}/{id}`, method: 'PATCH', handler: Controler.patch },
  ];
  return routes;
};

module.exports = products;
