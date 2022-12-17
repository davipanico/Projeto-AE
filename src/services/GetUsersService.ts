import { injectable, inject } from 'tsyringe'

import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import IUserRepository from '../operators/IUserOperators';

import { User } from '../entities/User';

@injectable()
class GetUsersService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User []> {
    const users = await this.userRepository.findAll()

    if (!users) {
        throw new Error('Users not found')
      }

    return users
  }
}

export default GetUsersService;