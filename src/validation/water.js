import Joi from 'joi';

export const addWaterRecordSchema = Joi.object({
  // userId: Joi.string().required(),
  amount: Joi.number().required().min(1).max(50000),
});

export const updateWaterRecordSchema = Joi.object({
  date: Joi.string().isoDate().optional(),
  amount: Joi.number().required().min(1).max(50000),
});

// export const deleteWaterRecordSchema = Joi.object({
//   recordId: Joi.string().length(24).hex().required(),
// });
