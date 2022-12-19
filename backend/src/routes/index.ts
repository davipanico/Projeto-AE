import { Router } from 'express';
import healthRouter from './health/health';
import loginRouter from './login/login';
import {userRouter, authUserRouter} from './user/user';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/user', authUserRouter)
routes.use('/login', loginRouter)
routes.use('/health', healthRouter)

export default routes;