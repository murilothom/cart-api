import { Body, Controller, HttpCode, Post } from '@nestjs/common'
import { CreateUserUseCase } from '../../models/use-cases/create-user'
import { User } from '@prisma/client'
import { CreateUserDto } from '../../models/types/dto/CreateUserDto'

interface CreateUserResponse {
  user: User
}

@Controller('user')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }
}
