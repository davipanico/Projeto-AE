import { Router } from 'express';
import { container } from 'tsyringe';
import authenticated from '../../middlewares/auth';
import CreateUserService from '../../services/CreateUserService';
import GetUsersService from '../../services/GetUsersService';

const userRouter = Router();
const authUserRouter = Router();

authUserRouter.use(authenticated)

interface User {
  password?: string;
}

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService)

    const user: User = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return res.json(user);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});

authUserRouter.get('/', async (req, res) => {
  try {
    const findUsers = container.resolve(GetUsersService)
    const users = await findUsers.execute();

  return res.json(users);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});



export {userRouter, authUserRouter}