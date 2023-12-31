const Joi = require("joi");

const authorizeSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Missing required Password field",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required Password field",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Missing required Email field",
  }),
  token: Joi.string().default(null).messages({
    "string.base": "Token must be a string",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Missing required Email field",
  }),
  password: Joi.string().required().messages({
    "any.required": "Missing required Password field",
  }),
});
module.exports = { authorizeSchema, loginSchema };

