import { Router } from 'express';
import validateBody from '../middlewares/validateBody.js';
import {
  loginUserSchema,
  registrUserSchema,
  requestresetPasswordSchema,
} from '../validation/auth.js';
import {
  createUserController,
  logInUserController,
  logOutUserController,
  requestResetEmailController,
} from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  validateBody(registrUserSchema),
  ctrlWrapper(createUserController),
);

authRouter.post(
  '/signin',
  validateBody(loginUserSchema),
  ctrlWrapper(logInUserController),
);

authRouter.post('/logout', ctrlWrapper(logOutUserController));

authRouter.post(
  '/request-reset-pwd',
  validateBody(requestresetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

export default authRouter;
