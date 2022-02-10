const invalidInput = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'Invalid request payload input',
};

const dataRegister = {
  response: {
    full_name: 'riyan',
    email: 'riyan@mail.com',
    role: 'admin',
    is_login: 0,
  },
  status: 201,
};

const dataDuplicate = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'duplicate key value violates unique constraint "Users_email_key"',
};

const dataLoginBlank = {
  statusCode: 400,
  error: 'Bad Request',
  message: 'All field required',
};

const dataLoginWrong = {
  statusCode: 401,
  error: 'Unauthorized',
  message: 'Wrong Email / Password',
};

const dataLoginValid = {
  response: {
    token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9',
    user: {
      email: 'riyan@mail.com',
      full_name: 'riyan',
      is_login: 1,
      role: 'admin',
    },
  },
  status: 200,
  message: 'Login Success',
};

module.exports = {
  invalidInput,
  dataRegister,
  dataDuplicate,
  dataLoginBlank,
  dataLoginWrong,
  dataLoginValid,
};
