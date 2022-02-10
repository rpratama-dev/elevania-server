const Joi = require('joi');

const registerSchema = Joi.object({
  full_name: Joi.string().required().min(1),
  email: Joi.string().required().min(1).email(),
  password: Joi.string().required().min(1),
  repeat_password: Joi.ref('password'),
}).with('password', 'repeat_password');

const loginSchema = Joi.object({
  email: Joi.string().required().min(1).email(),
  password: Joi.string().required().min(1),
});

module.exports = {
  registerSchema,
  loginSchema,
};
