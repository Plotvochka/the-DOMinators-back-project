import WaterCollection from '../db/models/Water.js';

export const addWaterRecord = async (payload) => {
  if (payload.amount > 5000 || payload.amount <= 0) {
    throw new Error('Amount must be between 1 and 5000ml.');
  }

  const newRecord = await WaterCollection.create({
    ...payload,
    userId: payload.userId,
  });

  return {
    id: newRecord._id,
    userId: newRecord.userId,
    amount: newRecord.amount,
    date: newRecord.date,
    createdAt: newRecord.createdAt,
    updatedAt: newRecord.updatedAt,
  };
};

export const updateWaterRecord = async ({ _id, payload, options = {} }) => {
  const data = await WaterCollection.findOneAndUpdate({ _id }, payload, {
    ...options,
    new: true,
  });

  return data;
};

export const deleteWaterRecord = (filter) =>
  WaterCollection.findByIdAndDelete(filter);

export const getWaterConsamption = async (filter, sortBy, sortOrder) => {
  const query = WaterCollection.find();
  if (filter.startofDayQuery && filter.endofDayQuery) {
    query.where('date').gte(filter.startofDayQuery).lte(filter.endofDayQuery);
  }
  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }
  const data = await query.sort({ [sortBy]: sortOrder });
  return data;
};

export const getMonthlyWaterConsamption = async (filter, sortBy, sortOrder) => {
  const query = WaterCollection.find();
  if (filter.startofMonthQuery && filter.endofMonthQuery) {
    query
      .where('date')
      .gte(filter.startofMonthQuery)
      .lte(filter.endofMonthQuery);
  }
  if (filter.userId) {
    query.where('userId').equals(filter.userId);
  }
  const data = await query.sort({ [sortBy]: sortOrder });
  return data;
};
