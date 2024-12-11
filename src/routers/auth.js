import {  Router } from "express";
import {validateBody} from '../middlewares/validateBody.js';
import { loginUserSchema, registrUserSchema, requestresetPasswordSchema, resetPasswordSchema } from '../validation/auth.js';
import { createUserController, logInUserController, logOutUserController, resetPasswordController, requestResetEmailController } from "../controllers/auth.js";
import { ctrlWrapper } from "../middlewares/ctrlWrapper.js";


const router = Router();

router.post('/signup', validateBody(registrUserSchema), ctrlWrapper(createUserController));

router.post('/singin', validateBody(loginUserSchema), ctrlWrapper(logInUserController));

router.post('/logout', ctrlWrapper(logOutUserController));

router.post('/request-reset-pwd', validateBody(requestresetPasswordSchema), ctrlWrapper(requestResetEmailController));

router.post('/reset-password', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));


export default router;