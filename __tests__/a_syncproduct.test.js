const matcher = require('jest-json-schema').matchers;

// Data User
const endpointUser = require('../data_test/route/userRoute');
const dataRequestUser = require('../data_test/data_request/userData');
const schemaUser = require('../data_test/schema/userSchema.json');
const bodyValidatorUser = require('../data_test/validator/userValidator');

// Data Sync Product
const endpoint = require('../data_test/route/syncRoute');
const dataRequest = require('../data_test/data_request/syncData');
const schema = require('../data_test/schema/syncSchema.json');
const bodyValidator = require('../data_test/validator/syncValidator');

expect.extend(matcher);
let access_token = '';

// TODO: Test Add User

describe('Post Create User', () => {
  test('Data Register Blank', async () => {
    const response = await endpointUser.userAdd(dataRequestUser.dataRegisterBlank);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.invalidInput);
  });

  test('Data Register Invalid Email', async () => {
    const response = await endpointUser.userAdd(dataRequestUser.dataEmailInvalid);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.invalidInput);
  });

  test('Password Not Match', async () => {
    const response = await endpointUser.userAdd(dataRequestUser.passNoMatch);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.invalidInput);
  });

  test('Register Success', async () => {
    const response = await endpointUser.userAdd(dataRequestUser.dataRegister);
    const { dataRegister } = bodyValidatorUser;
    expect(response.status).toEqual(200);
    expect(response.body.status).toEqual(201);
    expect(response.body.response).toBeValidSchema(schemaUser.registerSuccess);
    expect(response.body.response.email).toEqual(dataRegister.response.email);
    expect(response.body.response.full_name).toEqual(dataRegister.response.full_name);
    expect(response.body.response.is_login).toEqual(dataRegister.response.is_login);
    expect(response.body.response.role).toEqual(dataRegister.response.role);
  });

  test('Register Duplicate User', async () => {
    const response = await endpointUser.userAdd(dataRequestUser.dataRegister);
    expect(response.status).toEqual(400);
    expect(response.body.statusCode).toEqual(400);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.dataDuplicate);
  });
});

describe('User Login', () => {
  test('Login Field Blank', async () => {
    const response = await endpointUser.userLogin(dataRequestUser.dataLoginBlank);
    expect(response.status).toEqual(400);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.invalidInput);
  });

  test('Login Wrong Email', async () => {
    const response = await endpointUser.userLogin(dataRequestUser.dataLoginWrongEmail);
    expect(response.status).toEqual(401);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.dataLoginWrong);
  });

  test('Login Wrong Password', async () => {
    const response = await endpointUser.userLogin(dataRequestUser.dataLoginWrongPass);
    expect(response.status).toEqual(401);
    expect(response.body).toMatchSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidatorUser.dataLoginWrong);
  });

  test('Login Success', async () => {
    const response = await endpointUser.userLogin(dataRequestUser.dataLoginValid);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schemaUser.loginSuccess);
    expect(response.body.response.user).toEqual(bodyValidatorUser.dataLoginValid.response.user);
    expect(response.body.status).toEqual(200);
    expect(response.body.message).toEqual('Login Success');
    access_token = response.body.response.token;
  });

  test('Verify User', async () => {
    const response = await endpointUser.verifyLogin(access_token);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schemaUser.verifiedUser);
    const { verifiedUser } = bodyValidatorUser;
    expect(response.body.response.full_name).toEqual(verifiedUser.response.full_name);
    expect(response.body.response.email).toEqual(verifiedUser.response.email);
    expect(response.body.response.role).toEqual(verifiedUser.response.role);
    expect(response.body.response.is_login).toEqual(verifiedUser.response.is_login);
    expect(response.body.status).toEqual(bodyValidatorUser.verifiedUser.status);
    expect(response.body.message).toEqual(bodyValidatorUser.verifiedUser.message);
  });

  test('Logout User', async () => {
    const response = await endpointUser.userLogout(access_token);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schemaUser.verifiedUser);
    const { logoutUser } = bodyValidatorUser;
    expect(response.body.response.full_name).toEqual(logoutUser.response.full_name);
    expect(response.body.response.email).toEqual(logoutUser.response.email);
    expect(response.body.response.role).toEqual(logoutUser.response.role);
    expect(response.body.response.is_login).toEqual(logoutUser.response.is_login);
    expect(response.body.status).toEqual(bodyValidatorUser.logoutUser.status);
    expect(response.body.message).toEqual(bodyValidatorUser.logoutUser.message);
  });
});

// TODO: Test Sync Product

describe('Sync Product: Login', () => {
  test('Login as Admin', async () => {
    const response = await endpointUser.userLogin(dataRequestUser.dataLoginValid);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schemaUser.loginSuccess);
    expect(response.body.response.user).toEqual(bodyValidatorUser.dataLoginValid.response.user);
    expect(response.body.status).toEqual(200);
    expect(response.body.message).toEqual('Login Success');
    access_token = response.body.response.token;
  });
});

describe('Sync Product', () => {
  test('Failed Get List Product Without Login', async () => {
    const response = await endpoint.getProducts('', 1);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual(bodyValidatorUser.accessDenied);
    expect(response.body).toBeValidSchema(schemaUser.accessDenied);
  });

  test('Get Products With Login', async () => {
    const response = await endpoint.getProducts(access_token, 1);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schema.getProducts);
    expect(response.body.status).toEqual(200);
  });

  test('Failed Get Single Product Without Login', async () => {
    const response = await endpoint.getProducts('', 1);
    expect(response.status).toEqual(401);
    expect(response.body).toBeValidSchema(schemaUser.accessDenied);
    expect(response.body).toEqual(bodyValidatorUser.accessDenied);
  });

  test('Get Single Products With Login', async () => {
    const response = await endpoint.getProduct(access_token, dataRequest.singleProdNo);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schema.getProduct);
    expect(response.body.status).toEqual(200);
  });

  test('Failed Get Single Product Number not Registered', async () => {
    const response = await endpoint.getProduct(access_token, dataRequest.singleProdRandom);
    expect(response.status).toEqual(400);
    expect(response.body).toBeValidSchema(schema.productNotFound);
    expect(response.body).toEqual(bodyValidator.notFoundProduct);
  });

  test('Import Products With Login', async () => {
    const response = await endpoint.import(access_token, dataRequest.idsToImport);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schema.importSuccess);
    expect(response.body.status).toEqual(bodyValidator.successImport.status);
    expect(response.body.message).toEqual(bodyValidator.successImport.message);
  });

  test('Failed Import Products Existing / Duplicate', async () => {
    const response = await endpoint.import(access_token, dataRequest.idsToImport);
    expect(response.status).toEqual(400);
    expect(response.body).toBeValidSchema(schemaUser.errorSchema);
    expect(response.body).toEqual(bodyValidator.allProductImported);
  });

  test('Get Imported Products', async () => {
    const response = await endpoint.getImported(access_token);
    expect(response.status).toEqual(200);
    expect(response.body).toBeValidSchema(schemaUser.getImportedIDs);
    expect(response.body).toEqual(bodyValidator.allImportedIds);
  });
});
