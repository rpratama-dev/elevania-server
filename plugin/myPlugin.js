const myPlugin = {
  name: 'myPlugin',
  version: '1.0.0',
  async register(server, options) {
    // Create a route for example
    server.route({
      method: 'GET',
      path: '/test',
      handler(request, h) {
        console.log('hello world');
        return 'hello, world';
      },
    });

    // etc ...
    console.log('Plugin Execute');
  },
};

module.exports = myPlugin;
