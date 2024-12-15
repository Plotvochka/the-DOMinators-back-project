import Joi from 'joi';

export const updateUserInfoSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().email(),
  password: Joi.string().min(8).max(64),
  oldPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid('male', 'female'),
});

export const avatarUserSchema = Joi.object({
  avatarUrl: Joi.string(),
});

export const waterRateUserSchema = Joi.object({
  daylyNorm: Joi.number().required().min(0).max(15000),
});