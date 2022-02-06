const Controller = require('../../../controller/AuthController');

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [{ path: prefixs, method: 'POST', handler: Controller.login }];
  return routes;
};

module.exports = router;
