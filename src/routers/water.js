import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

import * as waterController from '../controllers/water.js';
import {
  addWaterRecordSchema,
  updateWaterRecordSchema,
} from '../validation/water.js';

const waterRouter = Router();
waterRouter.use(authenticate);

waterRouter.post(
  '/water',
  validateBody(addWaterRecordSchema),
  ctrlWrapper(waterController.addWaterRecord),
);

waterRouter.patch(
  '/water/:id',
  isValidId,
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(waterController.updateWaterRecord),
);

waterRouter.delete(
  '/water/:id',
  isValidId,
  ctrlWrapper(waterController.deleteWaterRecord),
);
waterRouter.get(
  '/water/today',
  ctrlWrapper(waterController.getWaterConsumptionController),
);
waterRouter.get(
  '/water/month',
  ctrlWrapper(waterController.getMonthlyWaterConsumptionController),
);
export default waterRouter;
