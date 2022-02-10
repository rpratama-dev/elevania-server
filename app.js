/* eslint-disable no-unused-vars */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const Auth = require('./middleware/Auth');

const appConfig = require('./config');
const { client } = require('./utils/database');

const init = async () => {
  const server = Hapi.server({
    port: appConfig.port,
    host: 'localhost',
    debug: { request: ['error'] },
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'access_token', 'x-requested-with'],
      },
      log: {
        collect: true,
      },
    },
  });

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
  await client.connect();
  await server.start();
  server.table().forEach((route) => console.log(`${route.method}\t${route.path}`));
  console.log('Server running on', server.info.uri);
};

init();
