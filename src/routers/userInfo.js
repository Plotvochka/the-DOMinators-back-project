import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from '../middlewares/validateBody.js';

import * as userInfoController from "../controllers/userInfo.js";
import * as userValidation from "../validation/user.js";

const userInfoRouter = Router();

userInfoRouter.get('/users/:userId', isValidId, ctrlWrapper(userInfoController.getUserInfoController));

userInfoRouter.patch('/users/:userId', isValidId, validateBody(userValidation.updateUserInfoSchema), ctrlWrapper(userInfoController.patchUserInfoController));

export default userInfoRouter;