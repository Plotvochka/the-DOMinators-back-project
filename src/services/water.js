import WaterCollection from '../db/models/Water.js';

export const addWaterRecord = async (userId, amount) => {
  if (amount > 50000 || amount <= 0) {
    throw new Error('Amount must be between 1 and 50000ml.');
  }

  const newRecord = await WaterCollection.create({ userId, amount });
  return newRecord;
};

export const updateWaterRecord = async (userId, date, amount) => {
  if (amount > 50000 || amount <= 0) {
    throw new Error('Amount must be between 1 and 50000ml.');
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
