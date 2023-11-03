import { Cart } from '@prisma/client'
import { PaginationParams } from '../types/pagination-params'

export interface ICartsRepository {
  create(userId: string): Promise<Cart>
  findManyByUserId(
    userId: string,
    paginationParams: PaginationParams,
  ): Promise<Cart[]>
}
