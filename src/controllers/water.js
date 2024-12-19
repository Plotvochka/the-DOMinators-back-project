import * as waterService from '../services/water.js';

export const addWaterRecord = async (req, res, next) => {
  const { _id: userId } = req.user;

  const newRecord = await waterService.addWaterRecord({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a water record!',
    data: {
      id: newRecord.id,
      userId: newRecord.userId,
      amount: newRecord.amount,
      date: newRecord.date,
      createdAt: newRecord.createdAt,
      updatedAt: newRecord.updatedAt,
    },
  });
};

export const updateWaterRecord = async (req, res, next) => {
  const { _id: userId } = req.user;

  const updatedRecord = await waterService.updateWaterRecord({
    ...req.body,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully updated the water record!',
    data: {
      id: updatedRecord._id,
      userId: updatedRecord.userId,
      amount: updatedRecord.amount,
      date: updatedRecord.date,
      createdAt: updatedRecord.createdAt,
      updatedAt: updatedRecord.updatedAt,
    },
  });
};

export const deleteWaterRecord = async (req, res, next) => {
  const { _id } = req.params;

  await waterService.deleteWaterRecord({ _id });

  res.json({
    status: 200,
    message: 'Successfully deleted the water record!',
  });
};
