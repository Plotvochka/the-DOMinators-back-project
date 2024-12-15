import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import isValidId from '../middlewares/isValidId.js';

import * as waterController from '../controllers/water.js';
import {
  addWaterRecordSchema,
  updateWaterRecordSchema,
  deleteWaterRecordSchema,
} from '../validation/water.js';

const waterRouter = Router();

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

export default waterRouter;
