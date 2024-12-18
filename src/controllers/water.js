import * as waterService from '../services/water.js';
import { parseWaterFilterParams } from '../utils/parseWaterFilterParams.js';

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
  const { _id: userId, daylyNorm: dailyWaterGoal } = req.user;
  const sortBy = 'date';
  const sortOrder = 'asc';
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const startofDayQuery = startOfDay.toISOString().slice(0, 16);
  const endofDayQuery = endOfDay.toISOString().slice(0, 16);
  const filter = {
    userId: userId,
    startofDayQuery: startofDayQuery,
    endofDayQuery: endofDayQuery,
  };
  const data = await waterService.getWaterConsamption(
    filter,
    sortBy,
    sortOrder,
  );
  const totalWaterConsumed = data.reduce(
    (sum, record) => sum + record.amount,
    0,
  );
  const percentageOfGoal = Math.round(
    (totalWaterConsumed / dailyWaterGoal) * 100,
  );
  res.json({
    status: 200,
    message: 'Successfully found data!',
    percentageOfGoal,
    records: data,
  });
};
export const getMonthlyWaterConsumptionController = async (req, res) => {
  const { _id: userId, daylyNorm: dailyWaterGoal } = req.user;
  const { month, year } = req.query;
  const { parsedYear, parsedMonth } = parseWaterFilterParams(month, year);
  const sortBy = 'date';
  const sortOrder = 'asc';

  const startOfMonth = new Date(parsedYear, parsedMonth - 1, 1);
  const endOfMonth = new Date(parsedYear, parsedMonth, 0);
  endOfMonth.setHours(23, 59, 59, 999);

  const startofMonthQuery = startOfMonth.toISOString().slice(0, 16);
  const endofMonthQuery = endOfMonth.toISOString().slice(0, 16);
  const filter = {
    startofMonthQuery: startofMonthQuery,
    endofMonthQuery: endofMonthQuery,
    userId: userId,
  };
  console.log('filter: ', filter);
  // Пошук записів за місяць
  const waterMonthRecords = await waterService.getMonthlyWaterConsamption(
    filter,
    sortBy,
    sortOrder,
  );
  const dailyStats = {};

  waterMonthRecords.forEach((record) => {
    const dateKey = record.date.split('T')[0];
    if (!dailyStats[dateKey]) {
      dailyStats[dateKey] = { totalAmount: 0, count: 0 };
    }
    dailyStats[dateKey].totalAmount += record.amount;
    dailyStats[dateKey].count += 1;
  });
  console.log('dailyStats: ', dailyStats);
  const stats = Object.entries(dailyStats).map(([date, data]) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const monthName = formattedDate.toLocaleString('default', {
      month: 'long',
    });
    return {
      date: `${day}, ${monthName}`,
      dailyGoal: `${(dailyWaterGoal / 1000).toFixed(1)} L`,
      percentageOfGoal: `${Math.round(
        (data.totalAmount / dailyWaterGoal) * 100,
      )}%`,
      recordsCount: data.count,
    };
  });
  console.log('Monthly statistic', stats);
  res.json({
    status: 200,
    message: 'Successfully found data!',
    data: stats,
  });
};
