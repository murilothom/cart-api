import { Body, Controller, Inject, Post } from '@nestjs/common'
import { AuthenticateUserDto } from '../types/dto/authenticate-user.dto'
import { AuthenticateUserUseCase } from '../use-cases/authenticate-user.use-case'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AuthenticateUserResponse } from '../types/responses/authenticate-user-response'

@Controller('auth')
@ApiTags('Authenticate Controller')
export class AuthenticateController {
  @Inject(AuthenticateUserUseCase)
  private readonly authenticateUserUseCase: AuthenticateUserUseCase

  @Post('login')
  @ApiResponse({ status: 201, type: AuthenticateUserResponse })
  async login(@Body() body: AuthenticateUserDto) {
    return this.authenticateUserUseCase.execute(body)
  }
}
