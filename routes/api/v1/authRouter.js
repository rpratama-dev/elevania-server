const Controller = require('../../../controller/AuthController');

const auth = { strategy: 'default' };

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'POST', handler: Controller.login },
    { path: `${prefixs}/verify`, method: 'GET', handler: Controller.verify, options: { auth } },
  ];
  return routes;
};

module.exports = router;
