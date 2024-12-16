import * as waterService from '../services/water.js';

export const addWaterRecord = async (req, res, next) => {
  // changed

  // const { userId, amount } = req.body;
  console.log(req.user);
  const { _id: userId } = req.user;
  const newRecord = await waterService.addWaterRecord({
    ...req.body,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a water record!',
    data: newRecord,
  });
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
export const getWaterConsumptionController = async (req, res) => {
  console.log(req.user);
  const { _id: userId } = req.user;
  const dailyWaterGoal = 2000;
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const startofDayQuery = startOfDay.toISOString().slice(0, 16);
  const endofDayQuery = endOfDay.toISOString().slice(0, 16);
  console.log(startofDayQuery);
  console.log(endofDayQuery);

  const data = await waterService.getWaterConsamption(
    startofDayQuery,
    endofDayQuery,
    userId,
  );
  const totalWaterConsumed = data.reduce(
    (sum, record) => sum + record.amount,
    0,
  );
  const percentageOfGoal = Math.round(
    (totalWaterConsumed / dailyWaterGoal) * // user.dailyWaterGoal
      100,
  );
  res.json({
    status: 200,
    message: 'Successfully found data!',
    percentageOfGoal,
    records: data,
  });
};
