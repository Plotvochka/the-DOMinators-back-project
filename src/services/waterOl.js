import WaterCollection from '../db/models/waterOl.js';

export const getWaterConsamption = (startofDayQuery, endofDayQuery) =>
  WaterCollection.find().where('date').gte(startofDayQuery).lte(endofDayQuery);
