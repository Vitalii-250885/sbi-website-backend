import Joi from 'joi';

export const createStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  admission: Joi.date().required(),
  gender: Joi.string().valid('male', 'female').required(),
  subjects: Joi.array().items(Joi.object()),
  userId: Joi.string().required(),
});

export const updateStudentSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  admission: Joi.date(),
  gender: Joi.string().valid('male', 'female'),
  subjects: Joi.array().items(Joi.object()),
});
