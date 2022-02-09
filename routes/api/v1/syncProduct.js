const Controller = require('../../../controller/SyncProduct');

const auth = { strategy: 'default', scope: ['admin'] };
/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'GET', handler: Controller.index, options: { auth } },
    { path: prefixs, method: 'POST', handler: Controller.store, options: { auth } },
    {
      path: `${prefixs}/imported`,
      method: 'GET',
      handler: Controller.showImported,
      options: { auth },
    },
    { path: `${prefixs}/{id}`, method: 'GET', handler: Controller.show, options: { auth } },
  ];
  return routes;
};

module.exports = router;
