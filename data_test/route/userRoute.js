const request = require('supertest');
require('dotenv').config({ path: './.env.local' });

const api = request(process.env.BASE_URL);

const userAdd = (body) =>
  api
    .post('/users')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .send(body);

const userLogin = (body) =>
  api
    .post('/auth')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .send(body);

const verifyLogin = (token) =>
  api
    .get('/auth')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .set('access_token', token)
    .send();

const userLogout = (token) =>
  api
    .delete('/auth')
    .set('Content-type', 'application/json')
    .set('Accept', 'application/json')
    .set('access_token', token)
    .send();

module.exports = {
  userLogin,
  userAdd,
  verifyLogin,
  userLogout,
};
