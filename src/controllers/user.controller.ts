import {
  Body,
  Controller,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { UserViewModel } from '../types/user-view-model'
import { CreateUserDto } from '../types/dto/create-user.dto'
import { UpdateUserDto } from '../types/dto/update-user.dto'
import { UpdateUserUseCase } from '../use-cases/update-user.use-case'
import { CreateUserUseCase } from '../use-cases/create-user.use-case'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { TokenPayload } from '../types/token-payload'

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
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  async update(
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: TokenPayload,
  ): Promise<void> {
    return this.updateUserUseCase.execute(body, currentUser)
  }
}
