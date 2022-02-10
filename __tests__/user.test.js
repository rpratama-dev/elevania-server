/* eslint-disable no-undef */
const matcher = require('jest-json-schema').matchers;
const endpoint = require('../data_test/route/userRoute');
const schema = require('../data_test/schema/userSchema.json');
const bodyValidator = require('../data_test/validator/userValidator');
const dataRequest = require('../data_test/data_request/userData');

expect.extend(matcher);

describe('Post Create User', () => {
  test('Data Register Blank', async () => {
    const response = await endpoint.userAdd(dataRequest.dataRegisterBlank);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.invalidInput);
  });

  test('Data Register Invalid Email', async () => {
    const response = await endpoint.userAdd(dataRequest.dataEmailInvalid);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.invalidInput);
  });

  test('Password Not Match', async () => {
    const response = await endpoint.userAdd(dataRequest.passNoMatch);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.invalidInput);
  });

  test('Register Success', async () => {
    const response = await endpoint.userAdd(dataRequest.dataRegister);
    const { dataRegister } = bodyValidator;
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual(201);
    expect(response.body.response).toBeValidSchema(schema.registerSuccess);
    expect(response.body.response.email).toEqual(dataRegister.response.email);
    expect(response.body.response.full_name).toEqual(dataRegister.response.full_name);
    expect(response.body.response.is_login).toEqual(dataRegister.response.is_login);
    expect(response.body.response.role).toEqual(dataRegister.response.role);
  });

  test('Register Duplicate User', async () => {
    const response = await endpoint.userAdd(dataRequest.dataRegister);
    expect(response.status).toEqual(400);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.dataDuplicate);
  });
});

describe('User Login', () => {
  test('Login Field Blank', async () => {
    const response = await endpoint.userLogin(dataRequest.dataLoginBlank);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.invalidInput);
  });

  test('Login Wrong Email', async () => {
    const response = await endpoint.userLogin(dataRequest.dataLoginWrongEmail);
    expect(response.status).toEqual(401);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.dataLoginWrong);
  });

  test('Login Wrong Password', async () => {
    const response = await endpoint.userLogin(dataRequest.dataLoginWrongPass);
    expect(response.status).toEqual(401);
    expect(response.body).toMatchSchema(schema.errorSchema);
    expect(response.body).toEqual(bodyValidator.dataLoginWrong);
  });

  test('Login Success', async () => {
    const response = await endpoint.userLogin(dataRequest.dataLoginValid);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schema.loginSuccess);
    expect(response.body.response.user).toEqual(bodyValidator.dataLoginValid.response.user);
    expect(response.body.status).toEqual(200);
    expect(response.body.message).toEqual('Login Success');
  });
});
