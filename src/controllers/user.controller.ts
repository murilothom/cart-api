import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { CreateUserDto } from '../types/dto/create-user.dto'
import { UpdateUserDto } from '../types/dto/update-user.dto'
import { UpdateUserUseCase } from '../use-cases/update-user.use-case'
import { CreateUserUseCase } from '../use-cases/create-user.use-case'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../types/user-payload'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateUserResponse } from '../types/responses/create-user-response'
import { ChangeUserPasswordDto } from '../types/dto/change-user-password.dto'
import { ChangeUserPasswordUseCase } from '../use-cases/change-user-password.use-case'

@Controller('user')
@ApiTags('User Controller')
export class UserController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase

  @Inject(UpdateUserUseCase)
  private readonly updateUserUseCase: UpdateUserUseCase

  @Inject(ChangeUserPasswordUseCase)
  private readonly changeUserPasswordUseCase: ChangeUserPasswordUseCase

  @Post()
  @ApiResponse({ status: 201, type: CreateUserResponse })
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  async update(
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.updateUserUseCase.execute(body, currentUser)
  }

  @Patch('password')
  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiResponse({ status: 204 })
  async changePassword(
    @Body() body: ChangeUserPasswordDto,
    @CurrentUser() currentUser: UserPayload,
  ) {
    return this.changeUserPasswordUseCase.execute(body, currentUser)
  }
}
