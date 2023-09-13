import { Injectable } from '@nestjs/common'
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../../../prisma/prisma.service'
import { UsersRepository } from '../users-repository'

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(user: Prisma.UserCreateInput): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    })
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
