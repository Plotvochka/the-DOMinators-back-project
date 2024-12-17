import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import * as waterController from '../controllers/water.js';
import {
  addWaterRecordSchema,
  updateWaterRecordSchema,
  deleteWaterRecordSchema,
  monthlyWaterStatsSchema,
} from '../validation/water.js';
import { authenticate } from '../middlewares/authenticate.js';

const waterRouter = Router();

waterRouter.use(authenticate); // !!!

waterRouter.post(
  '/water',
  validateBody(addWaterRecordSchema),
  ctrlWrapper(waterController.addWaterRecord),
);

waterRouter.patch(
  '/water/:userId',
  isValidId,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(waterController.updateWaterRecord),
);

waterRouter.delete(
  '/water/:userId',
  isValidId,
  validateBody(deleteWaterRecordSchema),
  ctrlWrapper(waterController.deleteWaterRecord),
);

waterRouter.get(
  '/water/today',
  ctrlWrapper(waterController.getWaterConsumptionController),
);
waterRouter.get(
  '/water/month',
  validateBody(monthlyWaterStatsSchema),
  ctrlWrapper(waterController.getMonthlyWaterConsumptionController),
);

export default waterRouter;
