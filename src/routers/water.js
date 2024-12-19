import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';

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
  '/water/user/:userId',
  validateBody(updateWaterRecordSchema),
  ctrlWrapper(waterController.updateWaterRecord),
);

waterRouter.delete(
  '/water/record/:_id',
  ctrlWrapper(waterController.deleteWaterRecord),
);

export default waterRouter;
