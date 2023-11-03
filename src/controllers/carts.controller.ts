import { Controller, Inject, Post } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCartUseCase } from '../use-cases/create-cart.use-case'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../types/user-payload'

@Controller('carts')
@ApiTags('Carts Controller')
export class CartsController {
  @Inject(CreateCartUseCase)
  private readonly createCartUseCase: CreateCartUseCase

  @Post()
  @ApiResponse({ status: 201 })
  async create(@CurrentUser() currentUser: UserPayload): Promise<void> {
    return this.createCartUseCase.execute(currentUser)
  }
}
