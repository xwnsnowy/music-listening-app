import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
  age: Joi.number(),
  role: Joi.string(),
  phoneNumber: Joi.string(),
  address: Joi.string(),
  avatar: Joi.string(),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});
