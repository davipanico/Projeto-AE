import { User } from '../entities/User'
import ICreateUserDTO from '../dtos/ICreateUserDTO'

export default interface IUserOperators {
  findAll(): Promise<User [] | null>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}