import Joi from 'joi';

export const referralSchema = Joi.object({
  referrerName: Joi.string().required(),
  referrerEmail: Joi.string().email().required(),
  referrerPhone: Joi.string().pattern(/^\d{10}$/).required(),
  refereeName: Joi.string().required(),
  refereeEmail: Joi.string().email().required(),
  refereePhone: Joi.string().pattern(/^\d{10}$/).required(),
  courseInterest: Joi.string().required(),
});