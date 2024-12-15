import * as waterService from '../services/water.js';

export const addWaterRecord = async (req, res, next) => {
  try {
    const { userId, amount } = req.body;

    const newRecord = await waterService.addWaterRecord(userId, amount);

    res.status(201).json({
      status: 201,
      message: 'Successfully created a water record!',
      data: newRecord,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export const updateWaterRecord = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { date, amount } = req.body;

    const updatedRecord = await waterService.updateWaterRecord(
      userId,
      date,
      amount,
    );

    res.json({
      status: 200,
      message: 'Successfully updated the water record!',
      data: updatedRecord,
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};

export const deleteWaterRecord = async (req, res, next) => {
  try {
    const { userId } = req.params;

    await waterService.deleteWaterRecord(userId);

    res.json({
      status: 200,
      message: 'Successfully deleted the water record!',
    });
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  }
};
