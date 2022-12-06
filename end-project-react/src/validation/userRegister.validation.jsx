import Joi from "joi-browser";

const registerSchema = Joi.object({
  first_Name: Joi.string().min(2).max(255).required(),
  email: Joi.string().min(6).max(64).required().email(),
  password: Joi.string()
    .min(6)
    .max(255)
    .regex(
      new RegExp(
        "^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*() ]).{6,12}$"
      )
    )
    .required(), //encryption happens after the first validation
  confirm_Password: Joi.ref("password"),
});

export default registerSchema;
