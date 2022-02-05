const Controller = require('../../../controller/SyncProduct');

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'GET', handler: Controller.index },
    { path: prefixs, method: 'POST', handler: Controller.store },
    { path: `${prefixs}/{id}`, method: 'GET', handler: Controller.show },
    // { path: `${prefixs}/{id}`, method: 'PUT', handler: Controller.update },
    // { path: `${prefixs}/{id}`, method: 'PATCH', handler: Controller.patch },
    // { path: `${prefixs}/{id}`, method: 'DELETE', handler: Controller.delete },
  ];
  return routes;
};

module.exports = router;
