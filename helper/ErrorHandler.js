const Boom = require('@hapi/boom');

/**
 *
 * @param {any} err
 * @returns
 */
function errorHandler(err) {
  // const name = err.name || 'InternalError';
  console.log('err.status', err.stack || err.message);
  const payload = { status: err.status || 500, response: err.message || 'Internal Server Error' };
  if (err.response) {
    payload.status = err.response.status;
    payload.response = err.response.statusText;
  }
  if (payload.status === 401) {
    return Boom.unauthorized(payload.response);
  }
  return Boom.badRequest(payload.response, payload);
}

module.exports = errorHandler;
