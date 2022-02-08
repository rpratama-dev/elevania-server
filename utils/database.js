const { Client } = require('pg');
const format = require('pg-format');
const config = require('../config/config');
const customeError = require('../helper/customeError');

const env = process.env.NODE_ENV || 'development';

const dbconfig = config[env];

const client = new Client({
  user: dbconfig.username,
  host: dbconfig.host,
  database: dbconfig.database,
  password: dbconfig.password,
  port: dbconfig.port || 5432,
});

/**
 *
 * @param {string} queryText
 * @returns
 */
const queryExecute = (queryText) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const res = await client.query(queryText);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    })();
  });

/**
 *
 * @param {string} tabel
 * @param {Array<{ [key: string]: any }>} params
 * @returns
 */
const queryCreateMany = async (tabel, params) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const keys = Object.keys(params[0]);
        const fields = keys.join('","');
        const values = [];
        params.forEach((obj) => {
          const temps = keys.map((key) => obj[key]);
          values.push(temps);
        });
        const query = format(`INSERT INTO "${tabel}" ("${fields}") VALUES %L returning *`, values);
        console.log('query', query);
        const response = await client.query(query);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });

/**
 *
 * @param {{
 *  [key: string]: any,
 * }} params
 */
const queryCreate = async (tabel, params) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        const keys = Object.keys(params);
        const fields = keys.join('","');
        const alias = keys.map((el, i) => `$${i + 1}`).join(',');
        const query = {
          text: `INSERT INTO "${tabel}" ("${fields}") VALUES (${alias}) RETURNING *`,
          values: keys.map((el) => params[el]),
        };

        const response = await client.query(query);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });

/**
 *
 * @param {{
 *  text: string,
 *  values: string[],
 * }} query
 * @returns
 */
const queryRead = async (query) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        if (!query) throw customeError(400, 'Invalid parameter');

        const response = await client.query(query);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });

/**
 *
 * @param {string} tabel
 * @param {{
 *  [key: string]: any,
 * }} params
 * @param {string} keyId
 * @returns
 */
const queryUpdate = async (tabel, params, keyId) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        if (!tabel || !params || !keyId) throw customeError(400, 'Invalid parameter');
        const keys = Object.keys(params).filter((el) => el !== keyId);
        const fields = keys.map((el, i) => `"${el}" = $${i + 1}`).split(',');
        keys.push(keyId); // insert again key id
        const query = {
          text: `UPDATE ${tabel} SET ${fields} WHERE ${keyId} = $${keys.length} RETURNING *`,
          values: keys.map((el) => params[el]),
        };

        const response = await client.query(query);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });

/**
 *
 * @param {string} tabel
 * @param {string} keyId
 * @returns
 */
const queryDelete = async (tabel, keyId) =>
  new Promise((resolve, reject) => {
    (async () => {
      try {
        if (!tabel || !keyId) throw customeError(400, 'Invalid parameter');
        const query = {
          text: `DELETE FROM ${tabel} WHERE ${keyId} = $1`,
          values: [keyId],
        };

        const response = await client.query(query);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    })();
  });

module.exports = {
  queryCreateMany,
  queryCreate,
  queryRead,
  queryUpdate,
  queryDelete,
  queryExecute,
  client,
};
