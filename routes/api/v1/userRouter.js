const Controller = require('../../../controller/UserController');

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'POST', handler: Controller.store },
    { path: `${prefixs}/{id}`, method: 'GET', handler: Controller.show },
  ];
  return routes;
};

module.exports = router;
