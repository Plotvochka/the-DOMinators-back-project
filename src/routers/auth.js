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

const router = Router();

router.post(
  '/singup',
  validateBody(registrUserSchema),
  ctrlWrapper(createUserController),
);

router.post(
  '/singin',
  validateBody(loginUserSchema),
  ctrlWrapper(logInUserController),
);

router.post('/logout', ctrlWrapper(logOutUserController));

router.post(
  '/request-reset-pwd',
  validateBody(requestresetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

export default router;
