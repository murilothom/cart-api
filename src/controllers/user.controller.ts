import {
  Body,
  Controller,
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

@Controller('user')
@ApiTags('User Controller')
export class UserController {
  @Inject(CreateUserUseCase)
  private readonly createUserUseCase: CreateUserUseCase

  @Inject(UpdateUserUseCase)
  private readonly updateUserUseCase: UpdateUserUseCase

  @Post()
  @ApiResponse({ status: 201, type: CreateUserResponse })
  async create(@Body() body: CreateUserDto): Promise<CreateUserResponse> {
    return this.createUserUseCase.execute(body)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200 })
  async update(
    @Body() body: UpdateUserDto,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<void> {
    return this.updateUserUseCase.execute(body, currentUser)
  }
}
