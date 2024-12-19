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

export const updateWaterRecord = async (payload) => {
  const { userId, date, amount } = payload;

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

export const deleteWaterRecord = async ({ _id }) => {
  const deletedRecord = await WaterCollection.findByIdAndDelete(_id);

  if (!deletedRecord) {
    throw new Error('Record not found!');
  }

  return deletedRecord;
};
