import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";

import * as userInfoController from "../controllers/userInfo.js";

const userInfoRouter = Router();

userInfoRouter.get('/users/:userId', isValidId, ctrlWrapper(userInfoController.getUserInfoController));

userInfoRouter.patch('/users/:userId', isValidId, ctrlWrapper(userInfoController.patchUserInfoController));

export default userInfoRouter;