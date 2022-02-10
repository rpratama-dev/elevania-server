const Controller = require('../../../controller/AuthController');
const Validator = require('../../../validator/user_validator');

const auth = { strategy: 'default' };
const validate = {
  payload: Validator.loginSchema,
};

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'POST', handler: Controller.login, options: { validate } },
    { path: prefixs, method: 'GET', handler: Controller.verify, options: { auth } },
    { path: prefixs, method: 'DELETE', handler: Controller.logout, options: { auth } },
  ];
  return routes;
};

module.exports = router;
