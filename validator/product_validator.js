const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required().min(1),
  sku: Joi.string().required().min(1),
  price: Joi.number().required().min(1),
  description: Joi.string().allow('', null),
});

module.exports = {
  productSchema,
};
