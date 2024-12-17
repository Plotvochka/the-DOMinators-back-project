import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  // userId: Joi.string().required(),
  amount: Joi.number().required().min(1).max(50000),
  date: Joi.string().isoDate().required(),
});

export const updateWaterRecordSchema = Joi.object({
  date: Joi.string().isoDate().optional(),
  amount: Joi.number().required().min(1).max(50000),
});

export const deleteWaterRecordSchema = Joi.object({
  userId: Joi.string().required(),
});

export const monthlyWaterStatsSchema = Joi.object({
  month: Joi.number().integer().min(1).max(12).required().messages({
    'any.required': 'Month is required',
    'number.base': 'Month must be a number',
    'number.min': 'Month must be between 1 and 12',
    'number.max': 'Month must be between 1 and 12',
  }),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required()
    .messages({
      'any.required': 'Year is required',
      'number.base': 'Year must be a number',
      'number.min': 'Year must be a valid year',
      'number.max': 'Year cannot be in the future',
    }),
});
