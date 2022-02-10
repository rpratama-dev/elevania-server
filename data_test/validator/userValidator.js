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

const verifiedUser = {
  response: {
    id: 1,
    full_name: 'riyan',
    email: 'riyan@mail.com',
    role: 'admin',
    createdAt: '2022-02-10T00:15:26.857Z',
    updatedAt: '2022-02-10T00:18:50.602Z',
    is_login: 1,
  },
  status: 200,
  message: 'Token is verified',
};

const logoutUser = {
  response: {
    id: 1,
    full_name: 'riyan',
    email: 'riyan@mail.com',
    role: 'admin',
    createdAt: '2022-02-10T00:33:31.570Z',
    updatedAt: '2022-02-10T00:33:31.838Z',
    is_login: 0,
  },
  status: 200,
  message: 'Logout success',
};

module.exports = {
  invalidInput,
  dataRegister,
  dataDuplicate,
  dataLoginBlank,
  dataLoginWrong,
  dataLoginValid,
  verifiedUser,
  logoutUser,
};
