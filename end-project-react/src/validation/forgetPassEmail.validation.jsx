import Joi from "joi-browser";

const forgetPassSchema = Joi.object({
  email: Joi.string().email().max(64).required(),
});

export default forgetPassSchema;
