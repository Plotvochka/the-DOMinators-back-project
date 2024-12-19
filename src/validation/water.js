import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  amount: Joi.number().optional().min(1).max(5000),
  date: Joi.string().isoDate().optional(),
});

export const updateWaterRecordSchema = Joi.object({
  date: Joi.string().isoDate().optional(),
  amount: Joi.number().optional().min(1).max(5000),
});
