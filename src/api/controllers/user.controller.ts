import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { CreateUserUseCase } from '../../models/use-cases/create-user.use-case'
import { UserViewModel } from '../../models/types/user-view-model'
import { CreateUserDto } from '../../models/types/dto/create-user.dto'
import { UpdateUserDto } from '../../models/types/dto/update-user.dto'
import { UpdateUserUseCase } from '../../models/use-cases/update-user.use-case'

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
