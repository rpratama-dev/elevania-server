const cfg = require('.');

const config = {
  development: {
    username: 'postgres',
    password: 'root',
    use_env_variable: cfg.DB_URI,
    database: 'dd29l2o7sj8ov4',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: 'postgres',
    password: 'root',
    use_env_variable: cfg.DB_URI,
    database: 'dd29l2o7sj8ov4',
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
