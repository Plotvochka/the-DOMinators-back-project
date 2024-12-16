import WaterCollection from '../db/models/Water.js';

export const addWaterRecord = async (payload) => {
  // changed
  if (payload.amount > 5000 || payload.amount <= 0) {
    throw new Error('Amount must be between 1 and 5000ml.');
  }

  const newRecord = await WaterCollection.create(payload);
  return newRecord;
};

export const updateWaterRecord = async (userId, date, amount) => {
  if (amount > 5000 || amount <= 0) {
    throw new Error('Amount must be between 1 and 5000ml.');
  }

  const updatedRecord = await WaterCollection.findOneAndUpdate(
    { userId },
    { date, amount },
    { new: true },
  );

  if (!updatedRecord) {
    throw new Error('Record not found!');
  }

  return updatedRecord;
};

export const deleteWaterRecord = async (userId) => {
  const deletedRecord = await WaterCollection.findOneAndDelete({ userId });

  if (!deletedRecord) {
    throw new Error('Record not found!');
  }

  return deletedRecord;
};
export const getWaterConsamption = (startofDayQuery, endofDayQuery) =>
  WaterCollection.find().where('date').gte(startofDayQuery).lte(endofDayQuery);
