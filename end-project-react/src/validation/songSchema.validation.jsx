import Joi from "joi-browser";

const songSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  description: Joi.string().min(6).max(1024).required(),
  lyric: Joi.string().min(10),
  image: Joi.string().min(9).max(1024),
  artist: Joi.string().min(5).max(255).required(),
});

export default songSchema;
