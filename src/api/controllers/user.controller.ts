import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common'
import { CreateUserUseCase } from '../../models/use-cases/create-user.use-case'
import { UserViewModel } from '../../models/types/user-view-model'
import { CreateUserDto } from '../../models/types/dto/create-user.dto'

interface CreateUserResponse {
  user: UserViewModel
}

@Controller('user')
export class UserController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }
}
