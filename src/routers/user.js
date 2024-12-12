import { Router } from "express";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import isValidId from "../middlewares/isValidId.js";

import * as userController from "../controllers/user.js";

const userRouter = Router();

userRouter.get('/users/:userId', isValidId, ctrlWrapper(userController.getUserInfoController));

export default userRouter;