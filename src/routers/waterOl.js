import { Router } from 'express';
import * as WaterConsumptionControllers from '../controllers/waterOl.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
const waterRouter = Router();
waterRouter.get(
  '/today',
  ctrlWrapper(WaterConsumptionControllers.getWaterConsumptionController),
);
export default waterRouter;
