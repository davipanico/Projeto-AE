import { container } from 'tsyringe'

import IUserOperators from '../operators/IUserOperators'
import UserRepository from '../repositories/UserRepository'

container.registerSingleton<IUserOperators>(
  'UserRepository',
  UserRepository,
)