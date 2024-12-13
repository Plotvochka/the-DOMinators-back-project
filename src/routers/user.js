import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';

import * as userController from '../controllers/user.js';

const userRouter = Router();

userRouter.get(
  '/users/:userId',
  isValidId,
  ctrlWrapper(userController.getUserInfoController),
);

// my code
userRouter.get(
  '/dayly-norm',
  isValidId,
  ctrlWrapper(userController.updateUserDaylyNorm),
);

export default userRouter;
