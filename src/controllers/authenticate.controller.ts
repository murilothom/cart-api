import { Body, Controller, Inject, Post } from '@nestjs/common'
import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user'

@Controller('auth')
export class AuthenticateController {
  @Inject(AuthenticateUserUseCase)
  private readonly authenticateUserUseCase: AuthenticateUserUseCase

  @Post('login')
  async login(@Body() body: AuthenticateUserDto) {
    return this.authenticateUserUseCase.execute(body)
  }
}
