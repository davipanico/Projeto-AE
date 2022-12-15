import { Router } from 'express';
import healthRouter from './health/health';
import userRouter from './user/user';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/health', healthRouter)

export default routes;