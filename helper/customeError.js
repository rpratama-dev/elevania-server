const createHttpError = require('http-errors');

function customeError(status, message, option = {}) {
  const error = createHttpError(status, message);
  Object.assign(error, { option });
  return error;
}

module.exports = customeError;
