const { version1 } = require('./version');

/**
 *
 * @param {} server
 */
function routes(server) {
  server.route(version1());
  server.route([{ method: 'GET', path: '/api/v1', handler: () => 'Hello Api!' }]);
  // server.route([{ method: 'GET', path: '/v1', handler: (req, h) => 'Hello World!' }]);
}

module.exports = routes;
