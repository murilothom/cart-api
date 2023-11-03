import { Inject, Injectable, NotFoundException } from '@nestjs/common'
import { UserPayload } from '../types/user-payload'
import { ICartsRepository } from '../repositories/carts-repository'
import { IUsersRepository } from '../repositories/users-repository'
import { PaginationParams } from '../types/pagination-params'
import { FetchCartsResponse } from '../types/responses/fetch-carts-response'

@Injectable()
export class FetchCartsUseCase {
  constructor(
    @Inject('ICartsRepository')
    private cartsRepository: ICartsRepository,
    @Inject('IUsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(
    paginationParams: PaginationParams,
    currentUser: UserPayload,
  ): Promise<FetchCartsResponse> {
    const userId = currentUser.sub
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new NotFoundException('User not found.')
    }

    const carts = await this.cartsRepository.findManyByUserId(
      userId,
      paginationParams,
    )

    return {
      carts,
    }
  }
}
