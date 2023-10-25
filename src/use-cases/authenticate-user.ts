import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { IUsersRepository } from '../repositories/users-repository'
import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { JwtService } from '@nestjs/jwt'
import { AuthenticateUserResponse } from '../types/responses/authenticate-user-response'

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
    private jwtService: JwtService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserDto): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException('User credentials do not match.')
    }

    const accessToken = this.jwtService.sign({ sub: user.id })

    return {
      access_token: accessToken,
    }
  }
}
