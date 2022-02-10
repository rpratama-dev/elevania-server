const Controller = require('../../../controller/UserController');
const Validator = require('../../../validator/user_validator');

const options = {
  validate: {
    payload: Validator.registerSchema,
  },
};

/**
 *
 * @param {string} prefixs
 * @returns
 */
const router = (prefixs) => {
  const routes = [
    { path: prefixs, method: 'POST', handler: Controller.store, options },
    // { path: `${prefixs}/{id}`, method: 'GET', handler: Controller.show },
  ];
  return routes;
};

module.exports = router;
