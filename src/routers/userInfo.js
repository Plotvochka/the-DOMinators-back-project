import { Router } from 'express';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import { authenticate } from '../middlewares/authenticate.js';

import * as userInfoController from '../controllers/userInfo.js';
import * as userValidation from '../validation/user.js';

const userInfoRouter = Router();

userInfoRouter.use(authenticate);

userInfoRouter.patch(
  '/users/avatarUrl',
  upload.single('avatarUrl'),
  validateBody(userValidation.avatarUserSchema),
  ctrlWrapper(userInfoController.patchAvatarUser),
);

userInfoRouter.get(
  '/users',
  ctrlWrapper(userInfoController.getUserInfoController),
);

userInfoRouter.patch(
  '/users',
  validateBody(userValidation.updateUserInfoSchema),
  ctrlWrapper(userInfoController.patchUserInfoController),
);

userInfoRouter.patch(
  '/users/water-rate',
  validateBody(userValidation.waterRateUserSchema),
  ctrlWrapper(userInfoController.updateUserDaylyNorm),
);

export default userInfoRouter;
