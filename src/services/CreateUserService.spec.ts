import FakeUserRepository from '../repositories/fake/FakeUserRepository'
import CreateUserService from './CreateUserService'

let fakeUserRepository: FakeUserRepository
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository()
    createUser = new CreateUserService(
      fakeUserRepository,
    )
  })

  it('should be able to create a user', async () => {
    const user = await createUser.execute({
      name: 'Davi Moreira',
      email: 'davi@teste.com',
      password: 'davi123',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email form another', async () => {
    await createUser.execute({
      name: 'Davi Moreira',
      email: 'davi@teste.com',
      password: 'davi123',
    })

    await expect(
      createUser.execute({
        name: 'Davi Moreira',
        email: 'davi@teste.com',
        password: 'davi123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})