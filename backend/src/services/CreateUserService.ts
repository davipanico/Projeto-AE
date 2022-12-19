import { injectable, inject } from 'tsyringe'

import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import IUserRepository from '../operators/IUserOperators';

import { User } from '../entities/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.userRepository.findByEmail(email)

    if (checkUserExists) {
      throw new Error('Email address already used.')
    }

    const phash = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: phash,
    })

    await this.userRepository.save(user)

    return user
  }
}

export default CreateUserService;