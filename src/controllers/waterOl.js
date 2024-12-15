import * as waterConsamptionServices from '../services/waterOl.js';

export const getWaterConsumptionController = async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);
  const startofDayQuery = startOfDay.toISOString().slice(0, 16);
  const endofDayQuery = endOfDay.toISOString().slice(0, 16);
  console.log(startofDayQuery);
  console.log(endofDayQuery);

  const data = await waterConsamptionServices.getWaterConsamption(
    startofDayQuery,
    endofDayQuery,
  );

  res.json({
    status: 200,
    message: 'Successfully found data!',
    data,
  });
};
