import FakeUserRepository from '../repositories/fake/FakeUserRepository'
import CreateUserService from './CreateUserService'
import GetUsersService from './GetUsersService'

let fakeUserRepository: FakeUserRepository
let getUsers: GetUsersService
let createUser: CreateUserService

describe('GetUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUser = new CreateUserService(
      fakeUserRepository
    )
    getUsers = new GetUsersService(
      fakeUserRepository,
    )
  })

  it('should be able to return a list of users', async () => {
    const user = await createUser.execute({
      name: 'Davi Moreira',
      email: 'davi@teste.com',
      password: 'davi123',
    })

    const users = await getUsers.execute()

    expect(user).toHaveLength
  })
})