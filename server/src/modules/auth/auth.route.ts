// server/src/modules/auth/auth.route.ts
import { Router } from 'express';
import { validateBody } from '../../middlewares/validateRequest';
import { requireAuth } from '../../middlewares/requireAuth';
import { loginSchema, registerSchema } from './auth.schema';
import { authController } from './auth.controller';

const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), authController.register);
authRouter.post('/login', validateBody(loginSchema), authController.login);
authRouter.get('/me', requireAuth, authController.getMe);

export default authRouter;