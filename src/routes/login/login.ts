import { Router } from 'express';
import { container } from 'tsyringe';

import AuthUserService from '../../services/AuthUserService';
import usersView from '../../views/usersView';

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const autheUser = container.resolve(AuthUserService)

    const { user, token } = await autheUser.execute({
      email,
      password,
    });

    return res.json({ user: usersView.render(user), token });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

export default loginRouter;