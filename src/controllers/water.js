import * as waterService from '../services/water.js';
import { parseWaterFilterParams } from '../utils/parseWaterFilterParams.js';
import createHttpError from 'http-errors';

export const addWaterRecord = async (req, res) => {
  const { _id: userId } = req.user;
  const { date: reqDate, amount: amount } = req.body;
  const date = reqDate.slice(0, 16);
  // console.log('date: ', date);
  const newRecord = await waterService.addWaterRecord({
    date,
    amount,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a water record!',
    data: newRecord,
  });
};

export const updateWaterRecord = async (req, res) => {
  const { id: _id } = req.params;
  const payload = {};
  const { amount, date } = req.body;
  if (amount) {
    payload.amount = amount;
  }
  if (date) {
    payload.date = date.slice(0, 16);
  }
  // console.log('payload: ', payload);
  const updatedRecord = await waterService.updateWaterRecord({
    payload,
    _id,
  });
  if (!updatedRecord) {
    throw createHttpError(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully updated the water record!',
    data: updatedRecord,
  });
};

export const deleteWaterRecord = async (req, res) => {
  const { id: _id } = req.params;

  const data = await waterService.deleteWaterRecord({ _id });
  if (!data) {
    throw createHttpError(404, `Record with id=${_id} not found`);
  }
  res.status(204).send();
};
export const getWaterConsumptionController = async (req, res) => {
  const { _id: userId, daylyNorm: dailyWaterGoal } = req.user;
  const { date } = req.query;
  const sortBy = 'date';
  const sortOrder = 'asc';
  const startOfDay = new Date(date);
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
  res.json({
    status: 200,
    message: 'Successfully found water records!',
    percentageOfGoal:
      dailyWaterGoal === 0
        ? 0
        : Math.round((totalWaterConsumed / dailyWaterGoal) * 100),
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
  // console.log('dailyStats: ', dailyStats);
  const stats = Object.entries(dailyStats).map(([date, data]) => {
    const formattedDate = new Date(date);
    const day = formattedDate.getDate();
    const monthName = formattedDate.toLocaleString('default', {
      month: 'long',
    });
    return {
      date: `${day}, ${monthName}`,
      dailyGoal: `${(dailyWaterGoal / 1000).toFixed(1)} L`,
      percentageOfGoal:
        dailyWaterGoal === 0
          ? `0%`
          : `${Math.round((data.totalAmount / dailyWaterGoal) * 100)}%`,
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
