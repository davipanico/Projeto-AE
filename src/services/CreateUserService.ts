import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { UsersRepository } from '../repositories/UserRepository';

import { User } from '../entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const alreadyExists = await usersRepository.findOne({
      where: { email },
    });

    if (alreadyExists) {
      throw new Error('Email address already used.');
    }

    const phash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: phash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;