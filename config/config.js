const config = {
  development: {
    username: 'postgres',
    password: 'root',
    // use_env_variable: 'DB_URI',
    database: 'db_ecommerce',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    // use_env_variable: 'DB_URI',
    database: 'db_ecommerce',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'db_ecommerce',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
};

module.exports = config;
