import { Injectable } from '@nestjs/common'
import { Cart } from '@prisma/client'
import { PrismaService } from '../../services/prisma.service'
import { ICartsRepository } from '../carts-repository'
import { PaginationParams } from '../../types/pagination-params'

@Injectable()
export class PrismaCartsRepository implements ICartsRepository {
  constructor(private prismaService: PrismaService) {}

  create(userId: string): Promise<Cart> {
    return this.prismaService.cart.create({
      data: {
        userId,
      },
    })
  }

  findManyByUserId(
    userId: string,
    paginationParams: PaginationParams,
  ): Promise<Cart[]> {
    return this.prismaService.cart.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (paginationParams.page - 1) * 20,
    })
  }

  // findById(id: string): Promise<User | null> {
  //   return this.prismaService.cart.findUnique({
  //     where: {
  //       id,
  //     },
  //   })
  // }

  // async deleteById(id: string): Promise<void> {
  //   await this.prismaService.cart.delete({
  //     where: {
  //       id,
  //     },
  //   })
  // }
}
