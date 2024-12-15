import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import isValidId from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';

import * as userInfoController from '../controllers/userInfo.js';
import * as userValidation from '../validation/user.js';

const userInfoRouter = Router();

userInfoRouter.patch('/users/:userId', isValidId, upload.single('avatarUrl'), validateBody(userValidation.avatarUserSchema), ctrlWrapper(userInfoController.patchAvatarUser));

userInfoRouter.get(
  '/users/:userId',
  isValidId,
  ctrlWrapper(userInfoController.getUserInfoController),
);

userInfoRouter.patch(
  '/users/:userId',
  isValidId,
  validateBody(userValidation.updateUserInfoSchema),
  ctrlWrapper(userInfoController.patchUserInfoController),
);

userInfoRouter.patch(
  '/users/:userId/water-rate',
  isValidId,
  validateBody(userValidation.waterRateUserSchema),
  ctrlWrapper(userInfoController.updateUserDaylyNorm),
);

export default userInfoRouter;
