/* eslint-disable no-unused-vars */
const Hapi = require('@hapi/hapi');
const { config } = require('dotenv');
const routes = require('./routes');
const Auth = require('./middleware/Auth');

const cfg = { path: './.env.local' };
config(cfg);

const init = async () => {
  const server = Hapi.server({ port: 3000, host: 'localhost' });

  const scheme = () => ({ authenticate: Auth.authentication });
  server.auth.scheme('custom', scheme);
  server.auth.strategy('default', 'custom', {});

  server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: { strategy: 'default', scope: ['admin', 'customer'] },
      handler(request, h) {
        return request.auth;
      },
    },
  });
  routes(server);
  await server.start();
  console.log('Server running on port 3000');
};

init();
