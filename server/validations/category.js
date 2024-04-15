import Joi from "joi";

export const categorySchema = Joi.object({
  name: Joi.string().required(),
  slug: Joi.string().required(),
  products: Joi.array().items(Joi.string()),
  hide: Joi.boolean(),
});
