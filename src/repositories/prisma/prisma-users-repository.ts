import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { CreateUserDto } from '../../types/dto/create-user.dto'
import { PrismaService } from '../../services/prisma.service'

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prismaService: PrismaService) {}
  create(user: CreateUserDto): Promise<User> {
    return this.prismaService.user.create({
      data: user,
    })
  }

  async update(user: User): Promise<void> {
    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: user,
    })
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
    })
  }

  findById(id: string): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: {
        id,
      },
    })
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    })
  }
}
