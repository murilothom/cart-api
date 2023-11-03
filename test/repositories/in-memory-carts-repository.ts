import { Cart } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ICartsRepository } from '../../src/repositories/carts-repository'
import { PaginationParams } from '../../src/types/pagination-params'

export class InMemoryCartsRepository implements ICartsRepository {
  public items: Cart[] = []

  async create(userId: string): Promise<Cart> {
    const cart: Cart = {
      id: randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId,
    }

    this.items.push(cart)

    return cart
  }

  async findManyByUserId(
    userId: string,
    { page }: PaginationParams,
  ): Promise<Cart[]> {
    const items = this.items
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return items
  }
}
