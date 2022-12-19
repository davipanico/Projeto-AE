import { Router } from 'express';

const healthRouter = Router();

interface User {
  password?: string;
}

healthRouter.get('/', async (req, res) => {
  try {
    return res.json("API is running");
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default healthRouter;