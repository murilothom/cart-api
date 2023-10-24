import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { UserViewModel } from '../types/user-view-model'
import { CreateUserDto } from '../types/dto/create-user.dto'
import { UpdateUserDto } from '../types/dto/update-user.dto'
import { UpdateUserUseCase } from '../use-cases/update-user.use-case'
import { CreateUserUseCase } from '../use-cases/create-user.use-case'

interface CreateUserResponse {
  user: UserViewModel
}

@Controller('user')
export class UserController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase

  @Inject(UpdateUserUseCase)
  private readonly updateUserUseCase: UpdateUserUseCase

  @Post()
  @HttpCode(201)
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }

  @Patch(':id')
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return this.updateUserUseCase.execute(id, body)
  }
}
