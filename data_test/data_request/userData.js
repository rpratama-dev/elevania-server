const dataRegisterBlank = {
  full_name: '',
  email: '',
  password: '',
  repeat_password: '',
};

const dataEmailInvalid = {
  full_name: 'riyan',
  email: 'riyan@mail',
  password: 'riyan123',
  repeat_password: 'riyan123X',
};

const passNoMatch = {
  full_name: 'riyan',
  email: 'riyan@mail.com',
  password: 'riyan123',
  repeat_password: 'riyan123X',
};

const dataRegister = {
  full_name: 'riyan',
  email: 'riyan@mail.com',
  password: 'riyan123',
  repeat_password: 'riyan123',
};

const dataLoginBlank = {
  email: '',
  password: '',
};

const dataLoginWrongEmail = {
  email: 'random@mail.com',
  password: 'riyan123',
};

const dataLoginWrongPass = {
  email: 'riyan@mail.com',
  password: 'wrongpass',
};

const dataLoginValid = {
  email: 'riyan@mail.com',
  password: 'riyan123',
};

module.exports = {
  dataEmailInvalid,
  dataRegisterBlank,
  dataRegister,
  passNoMatch,
  dataLoginBlank,
  dataLoginWrongEmail,
  dataLoginWrongPass,
  dataLoginValid,
};
