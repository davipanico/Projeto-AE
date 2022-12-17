import FakeUserRepository from '../repositories/fake/FakeUserRepository'
import AuthUserService from './AuthUserService'
import CreateUserService from './CreateUserService'

let fakeUsersRepository: FakeUserRepository
let authUser: AuthUserService
let createUser: CreateUserService


describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()
    createUser = new CreateUserService(
        fakeUsersRepository
      )
    authUser = new AuthUserService(
      fakeUsersRepository,
  )
    })

  it('should be able to auth', async () => {
    const user = await createUser.execute({
      name: 'Davi Moreira',
      email: 'davi@teste.com',
      password: 'davi123',
    })

    const res = await authUser.execute({
      email: 'davi@teste.com',
      password: 'davi123',
    })

    expect(res).toHaveProperty('token')
    expect(res.user).toEqual(user)
  })

  it('should not be able to auth with non existing user', async () => {
    await expect(
      authUser.execute({
        email: 'davdsi@teste.com',
        password: 'davi123',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
        name: 'Davi Moreira',
        email: 'davi@teste.com',
        password: 'davi123',
    })

    await expect(
      authUser.execute({
        email: 'davi@teste.com',
        password: 'erouuuu',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})