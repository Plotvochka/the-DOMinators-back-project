import Joi from 'joi';

export const registrUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be at most 64 characters long',
    'any.required': 'Password is required',
  }),
  // repeatPassword: Joi.string().valid(Joi.ref('password')).required()
  //   .messages({
  //     'any.only': 'Passwords must match',
  //     'any.required': 'Repeat password is required',
  //   }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'string.max': 'Password must be at most 64 characters long',
    'any.required': 'Password is required',
  }),
});

export const requestresetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});
