import Joi from "joi-browser";

const loginSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
  password: Joi.string().min(6).max(64).required(),
});

export default loginSchema;
