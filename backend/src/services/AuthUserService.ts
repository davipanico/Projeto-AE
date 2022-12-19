import { sign } from 'jsonwebtoken'
import auth from '../config/auth'
import { injectable, inject } from 'tsyringe'

import IUserOperators from '../operators/IUserOperators'

import { User } from '../entities/User'
import { compare } from 'bcryptjs'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserOperators,
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new Error('Incorrect email')
    }

    const passwordMatched = await compare(password, user.password);
    
    if (!passwordMatched) {
      throw new Error('Incorrect password!')
    }

    const { secret, expiresIn } = auth.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return { user, token }
  }
}

export default AuthUserService