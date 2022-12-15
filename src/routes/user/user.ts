import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import authenticated from '../../middlewares/auth';
import { UsersRepository } from '../../repositories/UserRepository';
import CreateUserService from '../../services/CreateUserService';

const userRouter = Router();
const authUserRouter = Router();

authUserRouter.use(authenticated)

interface User {
  password?: string;
}

userRouter.post('/', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const createUser = new CreateUserService();

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
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find({
      select: [
       "id",
       "email",
       "name"
      ]
    });

  return res.json(users);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
});



export {userRouter, authUserRouter}