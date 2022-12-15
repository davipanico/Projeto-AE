import { Router } from 'express';

import AuthUserService from '../../services/AuthUserService';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const autheUser = new AuthUserService();

    const { user, token } = await autheUser.execute({
      email,
      password,
    });

    delete user.password;

    return res.json({ user, token });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default loginRouter;