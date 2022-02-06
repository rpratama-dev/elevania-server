/* eslint-disable no-unused-vars */
const Hapi = require('@hapi/hapi');
const { config } = require('dotenv');
const routes = require('./routes');
const myPlugin = require('./plugin/myPlugin');
const Auth = require('./middleware/Auth');

const cfg = { path: './.env.local' };
config(cfg);

const init = async () => {
  const server = Hapi.server({ port: 3000, host: 'localhost' });
  await server.register({
    plugin: myPlugin,
    options: {
      name: 'Bob',
    },
  });
  // const scheme = (svr, options) => ({
  //   authenticate: Auth.authentication,
  // });

  server.auth.scheme('custom', (svr, options) => ({
    authenticate: Auth.authentication,
  }));

  server.auth.strategy('default', 'custom', {});
  // server.auth.default({
  //   strategy: 'default',
  //   scope: 'admin',
  // });
  // server.route({
  //   method: 'GET',
  //   path: '/',
  //   options: {
  //     auth: { strategy: 'default', mode: 'optional', scope: ['admin', 'customer'] },
  //     handler: function (request, h) {
  //       return request.auth;
  //     },
  //   },
  // });
  routes(server);
  await server.start();
  console.log('Server running on port 3000');
};

init();
