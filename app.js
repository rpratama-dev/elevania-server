/* eslint-disable no-unused-vars */
const Hapi = require('@hapi/hapi');
const { config } = require('dotenv');
const routes = require('./routes');

const cfg = { path: './.env.local' };
config(cfg);

const init = async () => {
  const server = Hapi.server({ port: 3000, host: 'localhost' });
  server.route({ method: 'GET', path: '/', handler: () => 'Hello World!' });
  routes(server);
  await server.start();
  console.log('Server running on port 3000');
};

init();
