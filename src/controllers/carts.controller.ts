import { Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { CreateCartUseCase } from '../use-cases/create-cart.use-case'
import { CurrentUser } from '../auth/current-user.decorator'
import { UserPayload } from '../types/user-payload'
import { PaginationParams } from '../types/pagination-params'
import { FetchCartsUseCase } from '../use-cases/fetch-carts.use-case'
import { FetchCartsResponse } from '../types/responses/fetch-carts-response'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiTags('Carts Controller')
export class CartsController {
  @Inject(CreateCartUseCase)
  private readonly createCartUseCase: CreateCartUseCase

  @Inject(FetchCartsUseCase)
  private readonly fetchCartsUseCase: FetchCartsUseCase

  @Post()
  @ApiResponse({ status: 201 })
  async create(@CurrentUser() currentUser: UserPayload): Promise<void> {
    return this.createCartUseCase.execute(currentUser)
  }

  @Get('list')
  @ApiResponse({ status: 200, type: FetchCartsResponse })
  async fetchCarts(
    @Query() paginationParams: PaginationParams,
    @CurrentUser() currentUser: UserPayload,
  ): Promise<FetchCartsResponse> {
    return this.fetchCartsUseCase.execute(paginationParams, currentUser)
  }
}
