import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../../src/models/repositories/users-repository'
import { randomUUID } from 'node:crypto'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async create(user: Prisma.UserCreateInput): Promise<User> {
    const data: User = {
      id: randomUUID(),
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: new Date(),
      updatedAt: undefined,
    }

    this.items.push(data)

    return data
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
